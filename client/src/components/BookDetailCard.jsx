import React from 'react';
import { X, BookOpen, User, Calendar, Hash, Globe, ScrollText } from 'lucide-react';

/**
 * Displays detailed information about a book in a floating, dismissible sidebar format.
 * @param {Object} props
 * @param {Object} props.book - The book data object.
 * @param {Function} props.onClose - Function to call when the close button is clicked.
 */
export default function BookDetailCard({ book, onClose }) {
  if (!book) return null;

  const categories = book.Categories ? book.Categories.split(',').map((c) => c.trim()) : [];

  // Helper function for detail rows
  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 py-2 border-b border-gray-100">
      <Icon size={18} className="text-[#A56F6E] flex-shrink-0" />
      <span className="text-sm font-semibold text-gray-700 w-24 flex-shrink-0">{label}:</span>
      <span className="text-sm text-gray-600 font-medium">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 lg:left-auto w-full lg:w-96 bg-white shadow-2xl z-50 transform translate-x-0 transition-transform duration-300">
      {/* Header and Close Button */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-[#E0D4D3]/50">
        <h2 className="text-xl font-serif font-semibold text-gray-900">Book Details</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition"
          aria-label="Close details"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Content Scrollable Area */}
      <div className="p-5 overflow-y-auto h-[calc(100vh-65px)]">
        {/* Title and Author */}
        <h1 className="text-2xl font-serif font-bold text-[#A56F6E] leading-tight mb-2">
          {book.Title}
        </h1>
        <p className="text-lg font-medium text-gray-700 mb-4">By {book.Authors}</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium text-white bg-[#A56F6E] shadow-sm"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Summary */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Summary</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{book.Book_Summary}</p>
        </div>

        {/* Technical Details Grid */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-1 border-gray-200">
          Technical Data
        </h3>
        <div className="space-y-1">
          <DetailRow icon={BookOpen} label="Pages" value={book.No_of_Pages} />
          <DetailRow icon={Calendar} label="Pub. Year" value={book.Publication_Year} />
          <DetailRow icon={User} label="Publisher" value={book.PublisherName} />
          <DetailRow icon={Globe} label="Language" value={book.Language} />
          <DetailRow icon={Hash} label="ISBN" value={book.ISBN_No} />
          <DetailRow icon={Hash} label="Accession No." value={book.Accession_No} />

          {book.SeriesName && (
            <DetailRow icon={ScrollText} label="Series" value={book.SeriesName} />
          )}
        </div>

        {/* Author Introduction (Optional) */}
        {book.Author_Introductions && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About the Author</h3>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              {book.Author_Introductions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
