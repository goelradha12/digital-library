import React, { useEffect, useState } from 'react';
import axios from 'axios';
import mybooks from '../components/Data.js';
import BookCarousel from '../components/BookCarousel';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/books')
      .then((res) => setBooks(res.data))
      .catch((err) => {
        console.log(err);
        setBooks(mybooks); // fallback to local
      });
  }, []);

  // ✅ Group books by category
  const groupByCategory = (booksArray) => {
    return booksArray.reduce((acc, book) => {
      // handle multiple categories if comma separated
      const categories = book.Categories
        ? book.Categories.split(',').map((c) => c.trim())
        : ['Uncategorized'];

      categories.forEach((cat) => {
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(book);
      });

      return acc;
    }, {});
  };

  const categorizedBooks = groupByCategory(books.length ? books : mybooks);

  return (
    <div className="bg-gradient-to-b from-black via-gray-950 to-black min-h-screen py-10">
      <div className="container mx-auto max-w-7xl px-6 space-y-12">
        {Object.entries(categorizedBooks).map(([category, booksInCategory]) => (
          <div key={category}>
            {/* Netflix-style row heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {category}
            </h2>
            <BookCarousel books={booksInCategory} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
