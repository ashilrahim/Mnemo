import { NextResponse } from "next/server";
import { generateFlashcards } from "@/lib/ai";
import { createClient } from "@/utils/supabase/server";
// Dynamically import pdf-parse when needed to avoid Turbopack evaluating
// package test fixtures at module load (which can cause ENOENT on Windows)

interface Flashcard {
  question: string;
  options: string[];
  correct_option_index: number;
}

export async function POST(request: Request) {
  try {
    const supabase = createClient();

    // Log the start of the request
    console.log("POST request started");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("User not authenticated");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("User authenticated:", user.id);

    // Parse request body with error handling
    let documentId, count;
    try {
      const body = await request.json();
      documentId = body.documentId;
      count = body.count;
      console.log("Request body parsed:", { documentId, count });
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    if (!documentId || !count || typeof count !== "number" || count <= 0) {
      console.log("Invalid parameters:", { documentId, count });
      return NextResponse.json(
        { error: "Valid document ID and flashcard count are required" },
        { status: 400 }
      );
    }

    // 1. Check user credits first
    console.log("Checking user credits...");
    const { data: creditsData, error: creditsError } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_id", user.id)
      .single();

    if (creditsError) {
      console.error("Credits query error:", creditsError);
      return NextResponse.json(
        { error: "Failed to check credits" },
        { status: 500 }
      );
    }

    if (
      !creditsData ||
      typeof creditsData.credits !== "number" ||
      creditsData.credits < count
    ) {
      console.log(
        "Insufficient credits:",
        creditsData?.credits,
        "required:",
        count
      );
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    console.log("Credits available:", creditsData.credits);

    // 2. Fetch document from DB
    console.log("Fetching document...");
    const { data: document, error: docError } = await supabase
      .from("documents")
      .select("file_path, id")
      .eq("id", documentId)
      .single();

    if (docError) {
      console.error("Document query error:", docError);
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    if (!document) {
      console.log("Document not found:", documentId);
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    console.log("Document found:", document.file_path);

    // 3. Extract text from the file
    console.log(
      "Downloading file directly from storage bucket 'study_materials'..."
    );
    const { data: downloadedFile, error: downloadError } =
      await supabase.storage
        .from("study_materials")
        .download(document.file_path);
    console.log("Trying to download:", document.file_path);

    if (downloadError || !downloadedFile) {
      console.error("Storage download error:", downloadError);
      return NextResponse.json(
        { error: "Failed to download document" },
        { status: 500 }
      );
    }

    let documentText = "";

    try {
      if (downloadedFile.type === "application/pdf") {
        console.log("Processing PDF with pdf-parse...");

        // Convert the file to ArrayBuffer for pdf-parse
        const pdfArrayBuffer = await downloadedFile.arrayBuffer();
        console.log("PDF ArrayBuffer size:", pdfArrayBuffer.byteLength);

        const buffer = Buffer.from(pdfArrayBuffer);

        // Use pdf-parse to extract text
        // Import the library implementation directly to avoid bundling test fixtures
        const { default: pdfParse } = await import(
          "pdf-parse/lib/pdf-parse.js"
        );
        const pdfData = await pdfParse(buffer);
        documentText = pdfData.text;

        console.log("PDF parsed successfully:");
        console.log("- First 200 chars:", documentText.slice(0, 200));
      } else if (
        downloadedFile.type === "text/plain" ||
        downloadedFile.type === "text/markdown" ||
        downloadedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        console.log("Processing text file...");
        documentText = await downloadedFile.text();
        console.log("Text file processed, length:", documentText.length);
      } else {
        console.error("Unsupported file type:", downloadedFile.type);
        return NextResponse.json(
          {
            error:
              "Unsupported file type. Only PDF and text files are supported.",
          },
          { status: 400 }
        );
      }
    } catch (extractError) {
      console.error("Text extraction error:", extractError);
      console.error(
        "Error details:",
        extractError instanceof Error ? extractError.message : "Unknown error"
      );
      return NextResponse.json(
        { error: "Failed to extract text from document" },
        { status: 500 }
      );
    }

    if (!documentText || documentText.trim().length === 0) {
      console.error("Document text is empty after extraction");
      return NextResponse.json(
        { error: "Document is empty or text extraction failed" },
        { status: 400 }
      );
    }

    console.log(
      "Text extraction successful, final length:",
      documentText.length
    );

    // 4. Generate flashcards
    console.log("Generating flashcards...");
    const flashcards = await generateFlashcards(documentText, count);

    if (!flashcards) {
      console.error("Failed to generate flashcards - returned null");
      return NextResponse.json(
        { error: "Failed to generate flashcards" },
        { status: 500 }
      );
    }

    if (!Array.isArray(flashcards) || flashcards.length === 0) {
      console.error(
        "Generated flashcards are invalid:",
        typeof flashcards,
        flashcards?.length
      );
      return NextResponse.json(
        { error: "No flashcards were generated" },
        { status: 500 }
      );
    }

    console.log("Flashcards generated successfully:", flashcards.length);

    // Validate flashcard structure
    // Validate flashcard structure
    const isValidFlashcard = (card: unknown): card is Flashcard => {
      return (
        typeof card === "object" &&
        card !== null &&
        "question" in card &&
        "options" in card &&
        "correct_option_index" in card &&
        typeof (card as Flashcard).question === "string" &&
        Array.isArray((card as Flashcard).options) &&
        (card as Flashcard).options.length === 4 &&
        typeof (card as Flashcard).correct_option_index === "number" &&
        (card as Flashcard).correct_option_index >= 0 &&
        (card as Flashcard).correct_option_index < 4
      );
    };

    const invalidCards = flashcards.filter((card) => !isValidFlashcard(card));
    if (invalidCards.length > 0) {
      console.error("Invalid flashcards found:", invalidCards);
      return NextResponse.json(
        { error: "Generated flashcards have invalid format" },
        { status: 500 }
      );
    }

    // 5. Deduct credits using the RPC function
    console.log("Deducting credits...");
    const { error: creditError } = await supabase.rpc("decrement_credits", {
      p_user_id: user.id,
      p_amount: count,
    });

    if (creditError) {
      console.error("Credit deduction failed:", creditError);
      return NextResponse.json(
        { error: "Credit deduction failed" },
        { status: 500 }
      );
    }

    console.log("Credits deducted successfully");

    // 6. Save flashcards to the database
    console.log("Saving flashcards to database...");
    const flashcardInserts = flashcards.map((card) => ({
      document_id: documentId,
      question: card.question,
      options: card.options,
      correct_option_index: card.correct_option_index,
    }));

    const { error: insertError } = await supabase
      .from("flashcards")
      .insert(flashcardInserts);

    if (insertError) {
      console.error("DB Insert Error:", insertError);
      return NextResponse.json(
        { error: "Failed to save flashcards to database" },
        { status: 500 }
      );
    }

    console.log("Flashcards saved successfully");

    return NextResponse.json({
      success: true,
      count: flashcards.length,
      message: "Flashcards generated and saved successfully",
    });
  } catch (error) {
    // Catch any unexpected errors
    console.error("Unexpected error in POST handler:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
