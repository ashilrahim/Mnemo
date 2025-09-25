"use client";

import FlashcardGeneratorForm from "@/components/flashcardGeneratorForm";
import UploadForm from "@/components/uploadForm";


import { useState } from "react";



export default function DashboardPage() {
  const [uploadedDocumentId, setUploadedDocumentId] = useState<string>("");

  return (
    <div className="p-6 space-y-6 max-w-full">
      

      {/* Upload Section */}
      <UploadForm onUpload={setUploadedDocumentId} />

      {/* Generate Section */}
      <div className="flex justify-center mt-6 max-w-full">
      {/* {uploadedDocumentId && ( */}
        <FlashcardGeneratorForm documentId={uploadedDocumentId} />
     
        </div>
      
    </div>
  );
}
