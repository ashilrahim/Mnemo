import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = process.env.GEMINI_API_KEY!;
let model: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;

// Initialize the model with better error handling
try {
  if (geminiApiKey) {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    // Use a widely available stable model
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Gemini model initialized successfully');
  } else {
    console.error('GEMINI_API_KEY is not set');
  }
} catch (error) {
  console.error('Failed to initialize Gemini model:', error);
  model = null;
}

interface GeneratedFlashcard {
  question: string;
  options: string[];
  correct_option_index: number;
}

export async function generateFlashcards(documentText: string, count: number): Promise<GeneratedFlashcard[] | null> {
  console.log(`Starting flashcard generation for ${count} cards`);
  
  if (!model) {
    console.error('Model not initialized - check GEMINI_API_KEY');
    return null;
  }

  if (!documentText || documentText.trim().length === 0) {
    console.error('Document text is empty');
    return null;
  }

  if (count <= 0 || count > 50) {
    console.error('Invalid count:', count);
    return null;
  }

  // Truncate excessively long inputs to prevent model/context or JSON size issues
  const MAX_CHARS = 120_000;
  const safeText = documentText.slice(0, MAX_CHARS);
  
  console.log(`Document text length: ${documentText.length}, truncated to: ${safeText.length}`);

  const prompt = `You are an expert at creating educational flashcards from text. Your task is to analyze the following document and generate exactly ${count} multiple-choice flashcards.

IMPORTANT REQUIREMENTS:
1. Generate exactly ${count} flashcards, no more, no less
2. Each flashcard must have a clear, specific question based on the document content
3. Each flashcard must have exactly 4 answer options
4. Only one option should be correct
5. All options should be plausible but distinct
6. Questions should cover different aspects of the document
7. Avoid repetitive or overly similar questions

Return ONLY a valid JSON array with no additional text, formatting, or explanations. Each object must have:
- "question" (string): A clear multiple-choice question
- "options" (array of exactly 4 strings): Answer choices
- "correct_option_index" (number): Index (0-3) of the correct answer

Document Content:
---
${safeText}
---

Expected JSON format:
[
  {
    "question": "What is the main topic discussed in the document?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_option_index": 2
  }
]`;

  try {
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Received response from Gemini, length:', text.length);
    console.log('Raw response preview:', text.slice(0, 200));

    // Clean the response text
    let cleanedText = text.trim();
    
    // Remove markdown code blocks if present
    cleanedText = cleanedText.replace(/^```json\s*\n?/gm, '').replace(/\n?```$/gm, '');
    cleanedText = cleanedText.replace(/^```\s*\n?/gm, '').replace(/\n?```$/gm, '');
    
    // Remove any leading/trailing text that's not part of the JSON
    const jsonStart = cleanedText.indexOf('[');
    const jsonEnd = cleanedText.lastIndexOf(']') + 1;
    
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      cleanedText = cleanedText.slice(jsonStart, jsonEnd);
    }
    
    console.log('Cleaned response preview:', cleanedText.slice(0, 200));

    // Parse JSON
    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parse failed:', parseError);
      console.error('Failed to parse text:', cleanedText.slice(0, 500));
      
      // Try to find and extract just the array part
      const arrayMatch = cleanedText.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        try {
          parsed = JSON.parse(arrayMatch[0]);
          console.log('Successfully parsed with regex extraction');
        } catch (retryError) {
          console.error('Retry parse also failed:', retryError);
          return null;
        }
      } else {
        return null;
      }
    }

    // Validate the parsed result
    if (!Array.isArray(parsed)) {
      console.error('Parsed result is not an array:', typeof parsed);
      return null;
    }

    if (parsed.length === 0) {
      console.error('Generated flashcards array is empty');
      return null;
    }

    // Validate each flashcard
    const validFlashcards: GeneratedFlashcard[] = [];
    for (let i = 0; i < parsed.length; i++) {
      const card = parsed[i];
      
      if (!card || typeof card !== 'object') {
        console.error(`Flashcard ${i} is not an object:`, card);
        continue;
      }

      if (typeof card.question !== 'string' || card.question.trim().length === 0) {
        console.error(`Flashcard ${i} has invalid question:`, card.question);
        continue;
      }

      if (!Array.isArray(card.options) || card.options.length !== 4) {
        console.error(`Flashcard ${i} has invalid options:`, card.options);
        continue;
      }

      if (typeof card.correct_option_index !== 'number' || 
          card.correct_option_index < 0 || 
          card.correct_option_index > 3) {
        console.error(`Flashcard ${i} has invalid correct_option_index:`, card.correct_option_index);
        continue;
      }

      // Check if all options are valid strings
      const validOptions = card.options.every((opt: unknown) => 
        typeof opt === 'string' && opt.trim().length > 0
      );

      if (!validOptions) {
        console.error(`Flashcard ${i} has invalid option strings:`, card.options);
        continue;
      }

      validFlashcards.push({
        question: card.question.trim(),
        options: card.options.map((opt: string) => opt.trim()),
        correct_option_index: card.correct_option_index
      });
    }

    if (validFlashcards.length === 0) {
      console.error('No valid flashcards found after validation');
      return null;
    }

    console.log(`Successfully generated ${validFlashcards.length} valid flashcards out of ${parsed.length} total`);
    
    // If we have fewer cards than requested, log a warning but still return what we have
    if (validFlashcards.length < count) {
      console.warn(`Requested ${count} flashcards but only ${validFlashcards.length} were valid`);
    }

    return validFlashcards;

  } catch (error) {
    console.error('Error generating content from Gemini:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return null;
  }
}