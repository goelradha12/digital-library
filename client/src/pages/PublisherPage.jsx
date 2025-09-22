import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosInstance } from '../utils/axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarouselSection from '../components/BookCarousel';

// Fallback data for local development if the API is down
const fallbackPublisher = { Publisher_ID: 'PUB000000002', Publisher_Name: 'HarperCollins' };
const fallbackBooks = [
  { Accession_No: '1997001ROWH.002', AuthorIDs: 'AUT000000002', Authors: 'Rowling, J.K.', Book_ID: 'B00000000004', Book_Summary: 'First novel in the Harry Potter series.', Categories: 'Fantasy, Adventure', Cover_Image: null, ISBN_No: '9780747532743', ISSN_No: null, Language: 'English', No_of_Pages: 223, Publication_Year: '1997', PublisherID: 'PUB000000002', PublisherName: 'HarperCollins', Title: "Harry Potter and the Philosopher's Stone" },
  { Accession_No: '2011001MANT.001', AuthorIDs: 'AUT000000003', Authors: 'Martin, G.R.R.', Book_ID: 'B00000000005', Book_Summary: 'The first book in a series of fantasy novels.', Categories: 'Fantasy, Epic', Cover_Image: null, ISBN_No: '9780553103540', ISSN_No: null, Language: 'English', No_of_Pages: 694, Publication_Year: '2024', PublisherID: 'PUB000000003', PublisherName: 'Bantam Spectra', Title: 'A Game of Thrones' },
];

const PublisherPage = () => {
  const publisherID = useParams().id;
  const [publisher, setPublisher] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublisherData = async () => {
      try {
        const publisherRes = await axiosInstance.get(`/publishers/${publisherID}`);
        console.log(publisherRes.data.data)
        const publisherData = publisherRes.data?.data?.[0];
        
        if (!publisherData) {
          throw new Error("Publisher data not found in response.");
        }
        setPublisher(publisherData);
        
        const booksRes = await axiosInstance.get(`/publishers/${publisherID}/books`);
        console.log(booksRes.data?.data)
        setBooks(booksRes.data?.data || []);
      } catch (error) {
        console.error("API call failed. Using fallback data. Error:", error.message);
        setPublisher(fallbackPublisher);
        setBooks(fallbackBooks);
      } finally {
        setLoading(false);
      }
    };
    fetchPublisherData();
  }, [publisherID]);
  
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    let initials = '';
    if (parts.length > 0) {
        initials += parts[0][0];
    }
    if (parts.length > 1) {
        initials += parts[1][0];
    }
    return initials.toUpperCase();
  };

  if (loading || !publisher) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-12 font-sans text-gray-800">
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-center">
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-4xl p-8">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-[#E0D4D3] border-2 border-[#A56F6E] flex items-center justify-center text-center text-xl font-bold text-[#A56F6E] shadow-lg">
                {getInitials(publisher?.Publisher_Name)}
              </div>
              <div className="text-center md:text-left grid gap-2">
                <h1 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">
                  {publisher?.Publisher_Name}
                </h1>
                <p className="text-base text-gray-600 leading-relaxed">
                  {/* Publisher description from schema not available, using a placeholder */}
                  This publisher is dedicated to bringing quality literature to readers around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {books && books.length > 0 && (
          <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-serif text-center mb-6" style={{ color: '#A56F6E' }}>
                Books by {publisher?.Publisher_Name}
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

export default PublisherPage;
