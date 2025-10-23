import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Download, Star, Heart, Trash2, BookOpen } from 'lucide-react';
import { useAuthStore } from '../stores/auth.Stores';
import { axiosInstance } from '../utils/axios';

const UserProfile = () => {
  const { User, Visitor } = useAuthStore();
  const navigate = useNavigate();
  const [likedBooks, setLikedBooks] = useState([]);
  const [downloadedBooks, setDownloadedBooks] = useState([]);
  const [reviewsGiven, setReviewsGiven] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Existing correct API calls retained
  useEffect(() => {
    const fetchUserData = async () => {
      if (!User) {
        setLoading(false);
        return;
      }
      const userId = User.User_ID;
      setLoading(true);
      try {
        const likedBookRes = await axiosInstance.get(`/users/likedBooks/${userId}`);
        setLikedBooks(likedBookRes.data.data);

        const downloadedBookRes = await axiosInstance.get(`/users/downloadedBooks/${userId}`);
        setDownloadedBooks(downloadedBookRes.data.data);

        const reviewdBookRes = await axiosInstance.get(`/users/reviewdBooks/${userId}`);
        setReviewsGiven(reviewdBookRes.data.data);
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [User]);

  // ✅ Helpers
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  };

  // ✅ Remove liked book
  const handleUnlike = async (bookId) => {
    if (!window.confirm('Remove this book from liked list?')) return;
    try {
      await axiosInstance.delete(`/users/likeBook/${User.User_ID}/likes/${bookId}`);
      setLikedBooks((prev) => prev.filter((book) => book.Book_ID !== bookId));
    } catch (error) {
      console.error('Error unliking book:', error);
    }
  };

  // ✅ Remove downloaded book
  const handleUnDownload = async (bookId) => {
    if (!window.confirm('Remove this book from downloads?')) return;
    try {
      await axiosInstance.delete(`/users/downloadBook/${User.User_ID}/downloads/${bookId}`);
      setDownloadedBooks((prev) => prev.filter((book) => book.Book_ID !== bookId));
    } catch (error) {
      console.error('Error removing downloaded book:', error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A56F6E]" />
      </div>
    );

  const initials = getInitials(User?.Name);
  const isSubscriber = User?.User_ID !== null;

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-sans text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4 bg-white rounded-xl shadow-lg p-8 h-fit">
            <div className="flex flex-col items-center text-center mb-6">
              {User?.Avatar ? (
                <img
                  src={User.Avatar}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#A56F6E] shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-[#E0D4D3] border-4 border-[#A56F6E] flex items-center justify-center text-5xl font-bold text-[#A56F6E] shadow-md">
                  {User?.Name
                    ? User.Name.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                    : ''}
                </div>
              )}
              <h1 className="text-3xl font-serif text-gray-900 mt-6">{Visitor?.Name}</h1>
              <p className="text-sm text-gray-500">{Visitor?.Email}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-medium text-[#A56F6E]">Account Details</h2>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>
                  <span className="font-semibold text-gray-800">Member Since:</span>{' '}
                  {User?.Start_Date ? new Date(User.Start_Date).toLocaleDateString() : 'N/A'}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Subscription Till:</span>{' '}
                  {User?.subscription_end_date
                    ? new Date(User.subscription_end_date).toLocaleDateString()
                    : 'N/A'}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Reward Points:</span>{' '}
                  {User?.Reward_Points ?? 0}
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="w-full px-8 py-3 rounded-full border-2 border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-semibold text-sm">
                Edit Profile
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 space-y-12">
            {isSubscriber ? (
              <>
                {/* ❤️ Liked Books */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart size={24} /> <span>Liked Books</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {likedBooks.length} items
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {likedBooks.length > 0 ? (
                      likedBooks.map((book) => (
                        <div
                          key={book.Book_ID}
                          className="relative group cursor-pointer"
                          onClick={() => navigate(`/books/${book.Book_ID}`)}
                        >
                          <img
                            src={book.Cover_Image || `/unzipped_books/${book.Book_ID}.jpg`}
                            alt={book.Title}
                            className="w-full h-48 object-cover rounded-md shadow-md"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://placehold.co/120x180/F0F0F0/A56F6E?text=No+Cover';
                            }}
                          />
                          <p className="mt-2 text-sm font-medium text-gray-700 truncate text-center">
                            {book.Title}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnlike(book.Book_ID);
                            }}
                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                            title="Remove from liked"
                          >
                            <Trash2 size={16} className="text-gray-600" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 col-span-full">No liked books yet.</p>
                    )}
                  </div>
                </section>

                {/* ⬇️ Downloaded Books */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Download size={24} /> <span>Downloaded Books</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {downloadedBooks.length} items
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {downloadedBooks.length > 0 ? (
                      downloadedBooks.map((book) => (
                        <div key={book.Book_ID} className="relative group">
                          <img
                            src={book.Cover_Image || `/unzipped_books/${book.Book_ID}.jpg`}
                            alt={book.Title}
                            className="w-full h-48 object-cover rounded-md shadow-md cursor-pointer"
                            onClick={() => navigate(`/books/${book.Book_ID}`)}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://placehold.co/120x180/F0F0F0/A56F6E?text=No+Cover';
                            }}
                          />
                          <p className="mt-2 text-sm font-medium text-gray-700 truncate text-center">
                            {book.Title}
                          </p>

                          <button
                            onClick={() => navigate(`/readBook/${book.Book_ID}`)}
                            className="mt-2 w-full text-sm bg-[#A56F6E] text-white rounded-full py-1.5 hover:bg-[#8F5B5A] transition"
                          >
                            <BookOpen size={14} className="inline mr-1" /> Read Now
                          </button>

                          <button
                            onClick={() => handleUnDownload(book.Book_ID)}
                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                            title="Remove from downloads"
                          >
                            <Trash2 size={16} className="text-gray-600" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 col-span-full">
                        No downloaded books yet.
                      </p>
                    )}
                  </div>
                </section>

                {/* ⭐ Reviews Given */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-6 flex items-center gap-2">
                    <Star size={24} /> Reviews Given
                  </h2>
                  {reviewsGiven.length > 0 ? (
                    <div className="space-y-6">
                      {reviewsGiven.map((review) => (
                        <div key={review.Review_ID} className="bg-gray-50 p-5 rounded-lg border">
                          <div className="flex items-center mb-2">
                            {[...Array(review.Rating)].map((_, i) => (
                              <Star key={i} size={16} fill="#A56F6E" className="text-[#A56F6E]" />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">{review.Review_Text}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            Reviewed on {new Date(review.Review_Date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No reviews given yet.</p>
                  )}
                </section>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-10 border-2 border-dashed border-gray-300 text-center">
                <h2 className="text-2xl font-serif font-medium text-gray-700 mb-4">
                  Unlock Your Digital Library
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Become a subscriber to get access to exclusive content, rewards, and more!
                </p>
                <button className="px-8 py-3 rounded-full border-2 border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-semibold">
                  Subscribe Now
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
