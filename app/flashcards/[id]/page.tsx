'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // adjust if using server client

interface Flashcard {
  id: string;
  question: string;
  options: string[];
  correct_option_index: number;
}

export default function FlashcardsPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.id;

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient(); // client-side

  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('document_id', documentId)
        .order('created_at', { ascending: true });

      if (error) {
        setError('Failed to fetch flashcards');
        console.error(error);
      } else {
        setFlashcards(data as Flashcard[]);
      }
      setLoading(false);
    };

    fetchFlashcards();
  }, [documentId]);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // prevent multiple clicks

    setSelectedOption(index);

    if (index === flashcards[currentIndex].correct_option_index) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(`Quiz complete! Your score: ${score}/${flashcards.length}`);
      router.push('/dashboard'); // redirect to dashboard or another page
    }
  };

  if (loading) return <p className="p-4">Loading flashcards...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (flashcards.length === 0) return <p className="p-4">No flashcards found.</p>;

  const card = flashcards[currentIndex];

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-md shadow-md ">
      <p className="text-sm text-white-500 mb-2">
        Flashcard {currentIndex + 1} / {flashcards.length}
      </p>
      <h2 className="text-xl font-semibold mb-4">{card.question}</h2>
      <div className="flex flex-col gap-3 dark:text-black">
        {card.options.map((option, idx) => {
          const isCorrect = idx === card.correct_option_index;
          const isSelected = idx === selectedOption;

          let bgClass = 'bg-blue-100';
          if (selectedOption !== null) {
            if (isSelected && isCorrect) bgClass = 'bg-green-400 text-white dark:text-black';
            else if (isSelected && !isCorrect) bgClass = 'bg-red-400 text-white dark:text-black';
            else if (isCorrect) bgClass = 'bg-green-200 text-black dark:text-black';
            else bgClass = 'bg-gray-100 text-black dark:text-black';
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={selectedOption !== null}
              className={`${bgClass} px-4 py-2 rounded-md text-left`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <button
          onClick={handleNext}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          {currentIndex < flashcards.length - 1 ? 'Next' : 'Finish'}
        </button>
      )}
    </div>
  );
}
