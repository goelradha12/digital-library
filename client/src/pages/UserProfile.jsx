import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Download,
  Star,
  Heart,
  MoreVertical,
  Trash2,
  BookOpen,
  Edit3,
  MessageSquare,
  Info,
} from 'lucide-react';
import { useAuthStore } from '../stores/auth.Stores';
import { axiosInstance } from '../utils/axios';
import ReviewModal from '../components/ReviewModal'; // ✅ Modal for add/edit reviews

const UserProfile = () => {
  const { User, Visitor } = useAuthStore();
  const navigate = useNavigate();
  const [likedBooks, setLikedBooks] = useState([]);
  const [downloadedBooks, setDownloadedBooks] = useState([]);
  const [reviewsGiven, setReviewsGiven] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookForReview, setSelectedBookForReview] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Effect to handle closing the menu when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if we clicked outside of any element with the class 'book-card-menu-container'
      // used for the menu container, and if a menu is currently open.
      // Using event.target.closest is safer than comparing IDs
      if (openMenuId !== null && !event.target.closest('.book-card-menu-container')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openMenuId]);
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

  const handleUnlike = async (bookId) => {
    if (!window.confirm('Remove this book from liked list?')) return;
    try {
      await axiosInstance.delete(`/users/likeBook/${User.User_ID}/likes/${bookId}`);
      setLikedBooks((prev) => prev.filter((book) => book.Book_ID !== bookId));
    } catch (error) {
      console.error('Error unliking book:', error);
    }
  };

  const handleUnDownload = async (bookId) => {
    if (!window.confirm('Remove this book from downloads?')) return;
    try {
      await axiosInstance.delete(`/users/downloadBook/${User.User_ID}/downloads/${bookId}`);
      setDownloadedBooks((prev) => prev.filter((book) => book.Book_ID !== bookId));
    } catch (error) {
      console.error('Error removing downloaded book:', error);
    }
  };

  const handleWriteOrEditReview = async (bookId) => {
    setSelectedBookForReview(bookId);
    setIsReviewModalOpen(true);
  };

  const initials = User?.Name
    ? User.Name.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '';

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A56F6E]" />
      </div>
    );

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-sans text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4 bg-white rounded-xl shadow-lg p-8 h-fit">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 rounded-full bg-[#E0D4D3] border-4 border-[#A56F6E] flex items-center justify-center text-5xl font-bold text-[#A56F6E] shadow-md">
                {initials}
              </div>
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
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 space-y-12">
            {/* Download books section */}
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
                    <div
                      key={book.Book_ID}
                      className="group relative bg-white rounded-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
                    >
                      <div
                        className="relative h-56 cursor-pointer"
                        onClick={() => navigate(`/books/${book.Book_ID}`)}
                      >
                        <img
                          src={book.Cover_Image || `/unzipped_books/${book.Book_ID}.jpg`}
                          alt={book.Title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              'https://placehold.co/120x180/F0F0F0/A56F6E?text=No+Cover';
                          }}
                        />

                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200">
                          <div
                            className="h-full bg-[#A56F6E] transition-all duration-300"
                            style={{ width: `${book.Percentage_Read ?? 0}%` }}
                          />
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/readBook/${book.Book_ID}`);
                          }}
                          className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 opacity-100 group-hover:opacity-100 transition-all duration-300 text-white text-lg font-semibold rounded-lg"
                          aria-label={`Continue reading ${book.Title}`}
                        >
                          Continue Read...
                        </button>
                      </div>

                      <div className="p-4 flex items-start justify-between">
                        <div className="flex-grow min-w-0 pr-2">
                          <h3
                            className="text-sm font-semibold text-gray-800 truncate cursor-pointer hover:text-[#A56F6E]"
                            onClick={() => navigate(`/books/${book.Book_ID}`)}
                            title={book.Title}
                          >
                            {book.Title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {book.Authors || 'Unknown Author'}
                          </p>
                          <p className="text-xs text-gray-600 mt-1.5">
                            <span className="font-semibold text-[#A56F6E]">
                              {Math.round(book.Percentage_Read ?? 0)}%
                            </span>{' '}
                            read
                          </p>
                        </div>

                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === book.Book_ID ? null : book.Book_ID);
                            }}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-[#A56F6E]"
                            aria-label="More actions"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {openMenuId === book.Book_ID && (
                            <div
                              className="book-card-menu-container absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 py-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => navigate(`/books/${book.Book_ID}`)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#A56F6E]/10 hover:text-[#A56F6E] transition"
                              >
                                <Info size={16} className="mr-2" /> Book Details
                              </button>

                              <button
                                onClick={() => navigate(`/readBook/${book.Book_ID}`)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#A56F6E]/10 hover:text-[#A56F6E] rounded transition mb-1"
                              >
                                <BookOpen size={16} className="mr-2" /> Read Now
                              </button>

                              {book.Percentage_Read >= 10 && (
                                <button
                                  onClick={() => handleWriteOrEditReview(book.Book_ID)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#A56F6E]/10 hover:text-[#A56F6E] transition"
                                >
                                  <Star size={16} className="mr-2" />
                                  {book.hasExistingReview ? 'Edit Review' : 'Write Review'}
                                </button>
                              )}

                              <div className="border-t border-gray-100 my-1" />

                              <button
                                onClick={() => handleUnDownload(book.Book_ID)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-50 hover:text-red-500 transition"
                              >
                                <Trash2 size={16} className="mr-2" /> Remove Download
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full py-8 italic">
                    No downloaded books yet. Go explore and download your first read! 📚
                  </p>
                )}
              </div>
            </section>

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
                          e.target.src = 'https://placehold.co/120x180/F0F0F0/A56F6E?text=No+Cover';
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

            {/* ⭐ Reviews Given */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-8 flex items-center gap-3 border-b pb-3 border-gray-200">
                <Star size={24} className="text-[#A56F6E]" /> Reviews Given
              </h2>

              {reviewsGiven.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {reviewsGiven.map((review) => (
                    <div
                      key={review.Book_ID}
                      className="group flex flex-col sm:flex-row bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative"
                    >
                      <button
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
                        title="Edit review"
                        onClick={() => handleWriteOrEditReview(review.Book_ID, review)}
                      >
                        <Edit3 size={16} className="text-gray-600" />
                      </button>

                      {/* Book Cover */}
                      <div className="flex-shrink-0 w-full sm:w-28 h-40 sm:h-32 mb-4 sm:mb-0 sm:mr-4">
                        <img
                          src={`/unzipped_books/${review.Book_ID}.jpg`}
                          alt={review.Title}
                          className="w-full h-full object-cover rounded-md shadow"
                        />
                      </div>

                      {/* Review Info */}
                      <div className="flex flex-col justify-between w-full">
                        <div>
                          <h3
                            className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-[#A56F6E] transition-colors duration-200 cursor-pointer"
                            onClick={() => navigate(`/books/${review.Book_ID}`)}
                          >
                            {review.Title}
                          </h3>

                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill={i < review.Rating ? '#A56F6E' : 'none'}
                                className={i < review.Rating ? 'text-[#A56F6E]' : 'text-gray-300'}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-2">{review.Rating} / 5</span>
                          </div>

                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                            “{review.Review_Text}”
                          </p>
                        </div>

                        <p className="text-xs text-gray-400 mt-3 self-end italic">
                          Reviewed on{' '}
                          {new Date(review.Review_Date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <Star size={40} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No reviews given yet.</p>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      {/* 📝 Review Modal */}
      {isReviewModalOpen && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          bookId={selectedBookForReview}
          userId={User?.User_ID}
        />
      )}

      <Footer />
    </>
  );
};

export default UserProfile;
