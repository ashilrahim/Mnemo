'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FlashcardGeneratorFormProps {
  documentId: string;
}

export default function FlashcardGeneratorForm({ documentId }: FlashcardGeneratorFormProps) {
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, count }),
    });

    if (response.ok) {
      router.push(`/flashcards/${documentId}`);
    } else {
      const { error: apiError } = await response.json();
      setError(apiError || 'Failed to generate flashcards.');
    }
    setIsLoading(false);
  };

  const options = [5,10,15];

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold">Generate Flashcards</h2>
      <p className='text-sm text-gray-600'>Select the number of flashcards you want to generate</p>
      <div className='flex gap-2'>
        {options.map((option) => (
          <button key={option} onClick={() => setCount(option)}
          className={`px-4 py-2 rounded-full border transition ${
            count === option
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}>
            {option}
          </button>
        ))}
      </div>
      <button>
         
      </button>
      <button
        onClick={handleGenerate}
        disabled={isLoading || count < 1}
        className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
      >
        {isLoading ? 'Generating...' : 'Generate Flashcards'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}