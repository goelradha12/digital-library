import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { axiosInstance } from '../utils/axios';
import { useNavigate } from 'react-router';

// Fallback data for local development if the API is down
const fallbackAuthors = [
  {
    Author_ID: 'AUT000000002',
    Author_Images: null,
    Author_Name: 'Rowling, J.K.',
    Author_Introduction: 'British author, best known for the Harry Potter series.',
  },
  {
    Author_ID: 'AUT000000003',
    Author_Images: null,
    Author_Name: 'Martin, G.R.R.',
    Author_Introduction: 'A famous author.',
  },
  {
    Author_ID: 'AUT000000004',
    Author_Images: null,
    Author_Name: 'Lee, Harper',
    Author_Introduction: 'An excellent author.',
  },
  {
    Author_ID: 'AUT000000005',
    Author_Images: null,
    Author_Name: 'Tolkien, J.R.R.',
    Author_Introduction: 'An amazing author.',
  },
  {
    Author_ID: 'AUT000000006',
    Author_Images: null,
    Author_Name: 'Lark, Anya',
    Author_Introduction: 'A mysterious author.',
  },
  {
    Author_ID: 'AUT000000007',
    Author_Images: null,
    Author_Name: 'Chen, Li',
    Author_Introduction: 'An insightful author.',
  },
];

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axiosInstance.get('/authors/all');
        if (response.data?.data) {
          setAuthors(response.data.data);
        } else {
          throw new Error('No data found in response.');
        }
      } catch (error) {
        console.error('Failed to fetch authors from API. Using fallback data. Error:', error);
        setAuthors(fallbackAuthors);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

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

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-sans text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1
            className="text-3xl md:text-4xl font-serif text-center mb-12"
            style={{ color: '#A56F6E' }}
          >
            Our Authors
          </h1>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {authors.map((author) => (
                <div
                  key={author.Author_ID}
                  className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center space-x-4
                             hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/authors/${author.Author_ID}`)}
                >
                  {author.Author_Images ? (
                    <img
                      src={author.Author_Images}
                      alt={author.Author_Name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#A56F6E] transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="aspect-square w-16 h-16 rounded-full bg-[#E0D4D3] border-2 border-[#A56F6E] flex items-center justify-center text-2xl font-semibold text-[#A56F6E] leading-none transition-transform duration-300 group-hover:scale-105">
                      {getInitials(author.Author_Name)}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-serif font-medium text-gray-900 leading-tight">
                      {author.Author_Name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {author.Author_Introduction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Authors;
