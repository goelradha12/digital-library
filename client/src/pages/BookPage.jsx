import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { axiosInstance } from '../utils/axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarouselSection from '../components/BookCarousel';
import { ThumbsUp, Download, Star, Heart } from 'lucide-react';
import { mybooks } from '../components/Data';

const fallbackBook = {
  Accession_No: '1997001ROWH.002',
  AuthorIDs: 'AUT000000002',
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
};

const BookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  useEffect(() => {
    const fetchBookAndAuthor = async () => {
      try {
        // Fetch main book data
        console.log(`Fetching book with ID: ${id}`);
        const bookRes = await axiosInstance.get(`/books/${id}`);
        const bookData = bookRes.data?.data?.[0];

        if (!bookData) {
          throw new Error('Book data not found in response.');
        }
        setBook(bookData);

        // Fetch other books by the same author only if AuthorIDs exists
        if (bookData.AuthorIDs) {
          console.log(`Fetching other books by author: ${bookData.AuthorIDs}`);
          const authorBooksRes = await axiosInstance.get(`/authors/${bookData.AuthorIDs}/books`);
          console.log(authorBooksRes.data?.data);
          setAuthorBooks(authorBooksRes.data?.data || []);
        }

        // Fetch likes and downloads counts of a book
        const likesCountRes = await axiosInstance.get(`/books/likesCount/${id}`);
        setLikesCount(likesCountRes.data?.data[0].total_likes);

        const downloadCountRes = await axiosInstance.get(`/books/downloadCount/${id}`);
        setDownloadCount(downloadCountRes.data?.data[0].total_downloads);
        try {
          const reviewsOfBookRes = await axiosInstance.get(`books/allReview/${id}`);
          const reviewsData = reviewsOfBookRes.data?.data || [];
          setReviews(reviewsData);
          if (reviewsData.length > 0) {
            const totalRating = reviewsData.reduce((sum, review) => sum + review.Rating, 0);
            setAverageRating((totalRating / reviewsData.length).toFixed(1));
          }
        } catch (reviewsError) {
          console.warn('Could not fetch reviews:', reviewsError.message);
        }
      } catch (error) {
        console.error('API call failed. Using fallback data. Error:', error.message);
        setBook(fallbackBook);
        setAuthorBooks(mybooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndAuthor();
  }, [id]);

  if (loading || !book) {
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
              <a
                href="#"
                className="flex items-center gap-2 text-[#A56F6E] text-sm font-semibold transition-colors duration-200 hover:text-[#8F5B5A]"
              >
                <Heart size={16} />
                Add to Wishlist
              </a>
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

        {/* Reviews Section */}
        <section className="bg-[#f2e4e3] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-center text-[#A56F6E] mb-6">
              Reviews
            </h2>
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-[#A56F6E] flex items-center gap-2">
                        {[...Array(review.Rating)].map((_, i) => (
                          <Star key={i} size={16} fill="#A56F6E" />
                        ))}({review.Rating})
                      </div>
                      <span className="ml-2 text-sm font-semibold text-gray-800">
                        {review.VisitorName}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-2">{review.Review_Text}</p>
                    <p className="text-xs text-gray-400">
                      Reviewed on {new Date(review.Review_Date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No reviews yet.</p>
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
