import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import mybooks from '../components/Data.js';
import BookCarousel from '../components/BookCarousel';

const Books = () => {
  const [books, setBooks] = React.useState([]);
  useEffect(() => {
    // making fetch request to backend using axios
    axios
      .get('http://localhost:5000/books')
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setBooks]);
  return (
    <>
      {books.length ? (
        <>
          <div>
            <BookCarousel books={books} />
          </div>
        </>
      ) : (
        <>
          <BookCarousel books={mybooks} />
        </>
      )}
    </>
  );
};

export default Books;
