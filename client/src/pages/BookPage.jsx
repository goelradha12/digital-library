import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import BookCarousel from '../components/BookCarousel';
import { useParams } from 'react-router';

const BookPage = () => {
  const { id } = useParams(); // grabs book ID from the URL
  const [book, setBook] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);

  const fallbackBook = {
    Accession_No: '1997001ROWH.002',
    AuthorIDs: 'AUT000000002',
    Author_Images: null,
    Author_Introductions: 'British author, best known for the Harry Potter series.',
    Authors: 'Rowling, J.K.',
    Book_ID: 'B00000000004',
    Book_Summary: 'First novel in the Harry Potter series.',
    Categories: 'Fantasy',
    Cover_Image: null,
    ISBN_No: '9780747532743',
    ISSN_No: null,
    Language: 'English',
    No_of_Pages: 223,
    Publication_Year: '1997',
    PublisherID: 'PUB000000002',
    PublisherName: 'HarperCollins',
    SeriesID: 'SER000000002',
    SeriesName: 'A Song of Ice and Fire',
    Series_Description: 'Epic fantasy novels by George R. R. Martin.',
    Title: "Harry Potter and the Philosopher's Stone",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => setBook(res.data[0]))
      .catch((err) => {
        setBook(fallbackBook); // fallback for demo
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (!book) return;
    console.log(book.AuthorIDs);
    axios
      .get(`http://localhost:5000/authors/${book.AuthorIDs}`)
      .then((res) => {
        setAuthorBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAuthorBooks([fallbackBook]);
      });
  }, [book]);

  if (!book) return <p>Loading...</p>;

  return (
    <>
      {/* --- Book Overview --- */}
      <div id="book-overview" className="flex flex-col lg:grid lg:grid-flow-col lg:items-center">
        <div className="grid p-6 md:p-10">
          {/* Categories */}
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="bg-gray-400 text-white rounded-full px-3 py-1 text-sm">
              {book.Categories}
            </span>
          </div>

          {/* Cover */}
          <img
            src={book.Cover_Image || '/default-cover.jpg'}
            alt={book.Title}
            className="w-full max-w-xs md:max-w-sm lg:h-[40vw] mx-auto py-4"
          />

          {/* Placeholder stats */}
          <div className="grid grid-cols-2 gap-4 text-center mt-2">
            <span>0 Likes</span>
            <span>0 Downloads</span>
          </div>
        </div>

        {/* Right side */}
        <div className="py-6 md:py-10">
          <div className="px-6 md:p-10 border-t lg:border-t-0 lg:border-l border-gray-300 grid gap-4">
            <h1 className="text-2xl md:text-3xl">{book.Title}</h1>
            <p className="text-gray-700">{book.Authors}</p>

            {/* Overview */}
            <div className="py-3">
              <h2 className="text-lg md:text-xl pb-1">Overview</h2>
              <p className="text-gray-700">{book.Book_Summary}</p>
            </div>

            {/* Details */}
            <div className="py-3 grid gap-1">
              <h2 className="text-lg md:text-xl pb-1">Details</h2>
              <span>
                <span className="font-semibold">Accession No.:</span> {book.Accession_No}
              </span>
              <span>
                <span className="font-semibold">Publisher:</span> {book.PublisherName}
              </span>
              <span>
                <span className="font-semibold">Publication Year:</span> {book.Publication_Year}
              </span>
              <span>
                <span className="font-semibold">ISBN:</span> {book.ISBN_No || 'N/A'}
              </span>
              <span>
                <span className="font-semibold">ISSN:</span> {book.ISSN_No || 'N/A'}
              </span>
              <span>
                <span className="font-semibold">Page Count:</span> {book.No_of_Pages}
              </span>
              <span>
                <span className="font-semibold">Language:</span> {book.Language}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center py-5">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                Add to Downloads
              </button>
              <div className="text-lg">
                <span className="underline text-blue-500">Add to Wishlist</span> ❤️
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Author --- */}
      <div id="book-authors" className="bg-gray-200">
        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl text-center pb-5">Author</h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto p-10 rounded-lg shadow">
              <img
                src={book.Author_Images || '/default-author.jpg'}
                alt={book.Authors}
                className="h-32 w-32 md:h-40 md:w-40 object-cover rounded-full shadow-lg"
              />
              <div className="text-center md:text-left grid gap-2">
                <span className="text-xl md:text-2xl font-semibold">{book.Authors}</span>
                <p className="text-gray-700 text-sm md:text-base">{book.Author_Introductions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Reviews Placeholder --- */}
      <div>
        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl text-center pb-5">Reviews</h2>
          <p className="text-center text-gray-600">Reviews feature coming soon...</p>
        </div>
      </div>

      {/* You might also like section */}
      <div>
        <div className="p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl text-center pb-5">You Might Also Like</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <BookCarousel books={authorBooks} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookPage;
