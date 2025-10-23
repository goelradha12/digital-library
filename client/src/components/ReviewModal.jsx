import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { useUserReviewsStore } from '../stores/reviews.Store';
import { useBookStore } from '../stores/book.Stores';

export default function ReviewModal({ userId, bookId, isOpen, onClose }) {
  const { review, addReview, updateReview, getTheReview, isLoadingReview, error } =
    useUserReviewsStore();
  const { fetchBookReviews } = useBookStore();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [mode, setMode] = useState('add'); // add or update

  useEffect(() => {
    if (isOpen) {
      (async () => {
        const existing = await getTheReview({ userId, bookId });
        if (existing) {
          setMode('update');
          setRating(existing.Rating);
          setText(existing.Review_Text);
        } else {
          setMode('add');
          setRating(0);
          setText('');
        }
      })();
    }
  }, [isOpen, userId, bookId]);

  const handleSubmit = async () => {
    const reviewData = { rating, review_text: text };
    if (mode === 'add') {
      await addReview({ userId, bookId, reviewData });
    } else {
      await updateReview({ userId, bookId, reviewData });
    }
    fetchBookReviews(bookId);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[#A56F6E] mb-4">
          {mode === 'add' ? 'Write a Review' : 'Update Your Review'}
        </h2>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              className={`cursor-pointer transition ${
                rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Share your thoughts about this book..."
          className="w-full h-28 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#A56F6E] mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            disabled={isLoadingReview}
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-[#A56F6E] text-white hover:bg-[#8b5a59] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingReview ? 'Saving...' : mode === 'add' ? 'Submit Review' : 'Update Review'}
          </button>
        </div>
      </div>
    </div>
  );
}
