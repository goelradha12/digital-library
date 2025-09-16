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
  return <>
  {books.length?<><div className='grid grid-cols-4'>
    
  {books.map((book)=>{
    return (
      <div className='border grid p-10 m-10'>
        <div>{book.Title}</div>
        <div>{book.ISBN_No}</div>
        <div>{book.ISSN_No}</div>
        <div>{book.Publication_Year}</div>
        <div>{book.Cover_Image}</div>
        <div>{book.No_of_Pages}</div>
        <div>{book.Book_Summary}</div>
        <div>{book.Language}</div>
        <div>{book.Accession_No}</div>
        <div>{book.Series_ID}</div>
        <div>{book.Series_Name}</div>
        <div>{book.Series_Description}</div>
        <div>{book.Publisher_ID}</div>
        <div>{book.Publisher_Name}</div>
      </div>
    );
  })}
  
  </div>
  </>
  :
  <>
  <BookCarousel books={mybooks}/>
  </>}
  </>;
};

export default Books;
