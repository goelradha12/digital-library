import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosInstance } from '../utils/axios.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarouselSection from '../components/BookCarousel';

// Fallback data for local development
const fallbackAuthor = {
  Author_ID: 'AUT000000002',
  Author_Images: null,
  Author_Name: 'Rowling, J.K.',
  Author_Introduction: 'British author, best known for the Harry Potter series.',
};

const fallbackBooks = [
  {
    Accession_No: '1997001ROWH.002',
    ids: 'AUT000000002',
    Author_Images: null,
    Author_Introductions: 'British author, best known for the Harry Potter series.',
    Authors: 'Rowling, J.K.',
    Book_ID: 'B00000000004',
    Book_Summary: 'First novel in the Harry Potter series.',
    Categories: 'Fantasy, Adventure',
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
  },
  {
    Accession_No: '2011001MANT.001',
    ids: 'AUT000000003',
    Author_Images: null,
    Author_Introductions: 'A famous author.',
    Authors: 'Martin, G.R.R.',
    Book_ID: 'B00000000005',
    Book_Summary: 'The first book in a series of fantasy novels.',
    Categories: 'Fantasy, Epic',
    Cover_Image: null,
    ISBN_No: '9780553103540',
    ISSN_No: null,
    Language: 'English',
    No_of_Pages: 694,
    Publication_Year: '2024',
    PublisherID: 'PUB000000003',
    PublisherName: 'Bantam Spectra',
    SeriesID: 'SER000000003',
    SeriesName: 'The Chronicles of Narnia',
    Series_Description: 'High fantasy novels by C.S. Lewis.',
    Title: 'A Game of Thrones',
  },
  {
    Accession_No: '1962001AAS.001',
    ids: 'AUT000000004',
    Author_Images: null,
    Author_Introductions: 'An excellent author.',
    Authors: 'Lee, Harper',
    Book_ID: 'B00000000006',
    Book_Summary: 'A story of racial injustice in the American South.',
    Categories: 'Fiction, Drama',
    Cover_Image: null,
    ISBN_No: '9780061120084',
    ISSN_No: null,
    Language: 'English',
    No_of_Pages: 281,
    Publication_Year: '2023',
    PublisherID: 'PUB000000004',
    PublisherName: 'J. B. Lippincott & Co.',
    SeriesID: 'SER000000004',
    SeriesName: null,
    Series_Description: null,
    Title: 'To Kill a Mockingbird',
  },
  {
    Accession_No: '1954001AAS.002',
    ids: 'AUT000000005',
    Author_Images: null,
    Author_Introductions: 'An amazing author.',
    Authors: 'Tolkien, J.R.R.',
    Book_ID: 'B00000000007',
    Book_Summary:
      'The Fellowship of the Ring is the first of three volumes in The Lord of the Rings.',
    Categories: 'Fantasy, Adventure',
    Cover_Image: null,
    ISBN_No: '9780618053267',
    ISSN_No: null,
    Language: 'English',
    No_of_Pages: 423,
    Publication_Year: '2022',
    PublisherID: 'PUB000000005',
    PublisherName: 'Houghton Mifflin Harcourt',
    SeriesID: 'SER000000005',
    SeriesName: null,
    Series_Description: null,
    Title: 'The Fellowship of the Ring',
  },
];

const AuthorPage = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        // Fetch author details
        console.log("Fetching author: ", id);
        const authorRes = await axiosInstance.get(`/authors/${id}`);

        console.log(authorRes.data)
        const authorData = authorRes.data?.data?.[0];

        if (!authorData) {
          throw new Error('Author data not found in response.');
        }
        setAuthor(authorData);

        // Fetch books by that author
        const booksRes = await axiosInstance.get(`/authors/${id}/books`);
        const booksData = booksRes.data?.data || [];
        setBooks(booksData);
      } catch (error) {
        console.error('API call failed. Using fallback data. Error:', error.message);
        setAuthor(fallbackAuthor);
        setBooks(fallbackBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  const getInitials = (name) => {
    if (!name) return '';
    const nameWithoutComma = name.replace(/,/g, '');
    const parts = nameWithoutComma.trim().split(' ');

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    const firstInitial = parts[0] ? parts[0][0].toUpperCase() : '';
    const lastInitial = parts[parts.length - 1] ? parts[parts.length - 1][0].toUpperCase() : '';

    return `${firstInitial}${lastInitial}`;
  };

  if (loading || !author) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-20 font-sans text-gray-800">
        {/* Author Profile Section */}
        <section className="max-w-7xl mx-auto py-12">
          <div className="flex justify-center">
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-4xl">
              {author.Author_Images ? (
                <img
                  src={author.Author_Images}
                  alt={author.Author_Name}
                  className="h-32 w-32 md:h-40 md:w-40 object-cover rounded-full shadow-lg border-2 border-[#A56F6E]"
                />
              ) : (
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-[#E0D4D3] border-2 border-[#A56F6E] flex items-center justify-center text-3xl font-bold text-[#A56F6E] shadow-lg">
                  {getInitials(author.Author_Name)}
                </div>
              )}
              <div className="text-center md:text-left grid gap-2">
                <h1 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">
                  {author.Author_Name}
                </h1>
                <p className="text-base text-gray-600 leading-relaxed">
                  {author.Author_Introduction}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Books by Author Section */}
        {books && books.length > 0 && (
          <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-6">
              <h2
                className="text-2xl md:text-3xl font-serif text-center mb-6"
                style={{ color: '#A56F6E' }}
              >
                Books by {author.Author_Name}
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <CarouselSection books={books} />
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AuthorPage;
