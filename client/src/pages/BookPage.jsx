import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarouselSection from '../components/BookCarousel';
import { ThumbsUp, Download, Star, Heart } from 'lucide-react';
import { useBookStore } from '../stores/book.Stores';
import { useAuthStore } from '../stores/auth.Stores';
import ReviewModal from '../components/ReviewModal';

const BookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { User, likeBook, unLikeBook, checkIfBookLiked } = useAuthStore();
  const [isReviewModalOpen, setisReviewModalOpen] = useState(false);
  var userId;
  if (!User) {
    // show the modal
  } else {
    userId = User.User_ID;
  }
  const {
    book,
    isLoadingBook,
    fetchABook,
    likesCount,
    reviews,
    averageRating,
    downloadCount,
    authorBooks,
  } = useBookStore();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    fetchABook(id);

    // a call to fetch if book is liked or not
  }, [id]);

  useEffect(() => {
    if (id && userId) {
      (async () => {
        const liked = await checkIfBookLiked(userId, id);
        setIsLiked(liked);
      })();
    }
  }, [id, userId]);

  if (isLoadingBook || !book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  const handleLikeButton = async () => {
    if (!userId) return alert('Please login to like books');

    if (isLiked) {
      const success = await unLikeBook(userId, id);
      if (success) setIsLiked(false);
    } else {
      const success = await likeBook(userId, id);
      if (success) setIsLiked(true);
    }
  };
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-sans text-gray-800">
        {/* Book Overview Section */}
        <section
          id="book-overview"
          className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center lg:items-start gap-12"
        >
          <div className="flex-shrink-0">
            <div className="flex flex-wrap gap-2 mb-4">
              {book.Categories &&
                book.Categories.split(',').map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white bg-[#A56F6E] whitespace-nowrap shadow-sm"
                  >
                    {category.trim()}
                  </span>
                ))}
            </div>
            <img
              src={book.Cover_Image || `/unzipped_books/${book.Book_ID}.jpg`}
              alt={book.Title}
              className="w-full max-w-xs md:max-w-sm lg:max-w-xs rounded-lg shadow-lg border-2 border-gray-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x600/F0F0F0/A56F6E?text=Cover+Unavailable';
              }}
            />
          </div>

          <div className="w-full lg:pb-6">
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight mb-2">
              {book.Title}
            </h1>
            <p className="text-xl font-medium text-gray-600 mb-6">By {book.Authors}</p>

            {/* Ratings, Likes & Downloads */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-[#A56F6E]">
                  <Star size={20} fill="#A56F6E" />
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {averageRating}/5 ({reviews.length} Reviews)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A56F6E]">
                  <ThumbsUp size={20} />
                </span>
                <span className="text-sm font-medium text-gray-600">{likesCount} Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A56F6E]">
                  <Download size={20} />
                </span>
                <span className="text-sm font-medium text-gray-600">{downloadCount} Downloads</span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="py-2">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-gray-600 leading-relaxed">{book.Book_Summary}</p>
              </div>
              <div className="py-2">
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <div className="grid gap-1">
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">Publisher:</span>{' '}
                    {book.PublisherName}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">Publication Year:</span>{' '}
                    {book.Publication_Year}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">Page Count:</span>{' '}
                    {book.No_of_Pages}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">Language:</span> {book.Language}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">ISBN:</span>{' '}
                    {book.ISBN_No || 'N/A'}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">Accession No.:</span>{' '}
                    {book.Accession_No}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-8">
              <button className="px-6 py-2 rounded-full border-2 border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-semibold">
                Add to Downloads
              </button>
              <button
                onClick={handleLikeButton}
                className={`flex items-center gap-2 text-sm font-semibold transition-all duration-200 ${
                  isLiked ? 'text-red-500' : 'text-[#A56F6E] hover:text-[#8F5B5A]'
                }`}
              >
                <Heart
                  size={16}
                  fill={isLiked ? 'red' : 'none'}
                  className={`transition-transform ${isLiked ? 'scale-110' : ''}`}
                />
                {isLiked ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section id="book-authors" className="max-w-7xl mx-auto px-6 py-12 mb-10  bg-white">
          <h2
            className="text-2xl md:text-3xl font-serif text-center mb-6"
            style={{ color: '#A56F6E' }}
          >
            About the Author
          </h2>
          <div className="flex justify-center">
            <div
              onClick={() => {
                navigate(`/authors/${book.AuthorIDs}`);
              }}
              className="flex flex-col md:flex-row items-center gap-6 max-w-4xl p-8 hover:rounded-lg hover:shadow-lg cursor-pointer bg-white"
            >
              <img
                src={
                  book.Author_Images ||
                  'https://placehold.co/160x160/F0F0F0/A56F6E?text=Author+Image'
                }
                alt={book.Authors}
                className="h-32 w-32 md:h-40 md:w-40 object-cover rounded-full"
              />
              <div className="text-center md:text-left grid gap-2">
                <span className="text-xl md:text-2xl font-serif font-medium">{book.Authors}</span>
                <p className="text-gray-600 leading-relaxed">{book.Author_Introductions}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading and CTA Button (Aligned Left/Right) */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
              <h2 className="text-2xl md:text-3xl font-serif text-[#A56F6E]">
                User Reviews ({reviews.length})
              </h2>
              <button
                onClick={() => {
                  if (!User) {
                    alert('You must be logged in to write a review.');
                    navigate('/login');
                  } else {
                    setisReviewModalOpen(true);
                  }
                }}
                className="px-4 py-2 rounded-full border-2 border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-semibold text-sm"
              >
                Write a Review
              </button>
              {User && (
                <ReviewModal
                  isOpen={isReviewModalOpen}
                  onClose={() => setisReviewModalOpen(false)}
                  userId={User.User_ID}
                  bookId={book.Book_ID}
                />
              )}
            </div>

            {/* Review Grid */}
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-[#A56F6E] flex items-center gap-1">
                        {[...Array(review.Rating)].map((_, i) => (
                          <Star key={i} size={16} fill="#A56F6E" />
                        ))}
                      </div>
                      <span className="ml-3 text-sm font-semibold text-gray-800">
                        {review.VisitorName}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                      {review.Review_Text}
                    </p>
                    <p className="text-xs text-gray-400">
                      Reviewed on {new Date(review.Review_Date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 w-full py-10">
                No reviews yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </section>

        {/* You Might Also Like Section */}
        {authorBooks && authorBooks.length > 0 && (
          <section className=" py-12">
            <div className="max-w-7xl mx-auto px-6">
              <h2
                className="text-2xl md:text-3xl font-serif text-center"
                style={{ color: '#A56F6E' }}
              >
                More by this Author
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <CarouselSection books={authorBooks} />
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookPage;
