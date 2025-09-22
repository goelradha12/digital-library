import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { axiosInstance } from '../utils/axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Fallback data for local development if the API is down
const fallbackPublishers = [
  { Publisher_ID: 'PUB000000001', Publisher_Name: 'Bloomsbury Publishing' },
  { Publisher_ID: 'PUB000000002', Publisher_Name: 'HarperCollins' },
  { Publisher_ID: 'PUB000000003', Publisher_Name: 'Bantam Spectra' },
  { Publisher_ID: 'PUB000000004', Publisher_Name: 'J. B. Lippincott & Co.' },
  { Publisher_ID: 'PUB000000005', Publisher_Name: 'Houghton Mifflin Harcourt' },
];

const Publishers = () => {
  const navigate = useNavigate();
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const publishersRes = await axiosInstance.get('/publishers/all');
        if (publishersRes.data?.data) {
          setPublishers(publishersRes.data.data);
        } else {
          throw new Error('No data found in response.');
        }
      } catch (error) {
        console.error('API call failed. Using fallback data. Error:', error.message);
        setPublishers(fallbackPublishers);
      } finally {
        setLoading(false);
      }
    };
    fetchPublishers();
  }, []);

  // Function to generate initials from publisher name
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-sans text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1
            className="text-3xl md:text-4xl font-serif text-center mb-12"
            style={{ color: '#A56F6E' }}
          >
            Our Publishers
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishers.map((pub) => (
              <div
                key={pub.Publisher_ID}
                className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center space-x-4
                           hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/publishers/${pub.Publisher_ID}`)}
              >
                <div className="w-20 h-20 rounded-full bg-[#E0D4D3] border-2 border-[#A56F6E] flex items-center justify-center text-center text-xl font-bold text-[#A56F6E] shadow-sm">
                  {getInitials(pub.Publisher_Name)}
                </div>
                <div>
                  <h2 className="text-xl font-serif font-medium text-gray-900 leading-tight">
                    {pub.Publisher_Name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Publishers;
