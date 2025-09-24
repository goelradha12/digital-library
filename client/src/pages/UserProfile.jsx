import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ThumbsUp,
  Download,
  Star,
  BookOpen,
  Heart,
  ClipboardList,
  Book,
  Award,
  UserCheck,
} from 'lucide-react';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth.Stores';
import { axiosInstance } from '../utils/axios';

const fallbackUserData = {
  Accessibility_Settings: {
    Bold: '2',
    'Font-Size': '8',
    'Color-Contrast': '7:1',
    'Text-to-Speech': 'No',
  },
  Avatar: null,
  Country: 'India',
  Email: 'rohan.khanna@example.com',
  Name: 'Rohan Khanna',
  Password: '629d6360ee443cd975fd99adb240bff437d5f325a43ee50f818fed130e164818',
  Registration_Date: '2025-04-14T18:30:00.000Z',
  Reward_Points: 10,
  Start_Date: '2025-04-18T18:30:00.000Z',
  User_ID: 'USE000000004',
  Visitor_ID: 'VIS000000009',
};

// Static lists for demonstration
const likedBooks = [
  {
    title: 'The Midnight Library',
    cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+1',
  },
  { title: 'Project Hail Mary', cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+2' },
  {
    title: 'Where the Crawdads Sing',
    cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+3',
  },
];

const downloadedBooks = [
  { title: 'A Game of Thrones', cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+4' },
  {
    title: 'To Kill a Mockingbird',
    cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+5',
  },
];

const reviewsGiven = [
  {
    bookTitle: 'The Midnight Library',
    rating: 5,
    reviewText: 'An amazing read that makes you think about life and choices.',
  },
  {
    bookTitle: 'Project Hail Mary',
    rating: 4,
    reviewText: 'A fantastic sci-fi adventure, hard to put down!',
  },
];

const aiRecommendations = [
  { title: 'The Martian', cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+6' },
  { title: 'Dune', cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+7' },
];

const booksRead = [
  { title: 'Harry Potter', cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+8' },
  { title: 'The Hobbit', cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+9' },
  { title: '1984', cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+10' },
  { title: 'Brave New World', cover: 'https://placehold.co/120x180/F0F0F0/A56F6E?text=Book+11' },
];

const UserProfile = () => {

  const { User } = useAuthStore();
  useEffect(() => {
    // Getting liked books of a user
    const fetchLikedBooks = async () => {
      try {
        const response = await axiosInstance.get(`/users/likedBooks/${User.User_ID}`);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching liked books:', error);
      }
    }
    if(User){
      fetchLikedBooks();
    }
  }, [User])
  const user = fallbackUserData;

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    const firstInitial = parts[0] ? parts[0][0] : '';
    const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const initials = getInitials(user.Name);
  const isSubscriber = user.User_ID !== null;

  const ctaMessage = {
    title: 'Unlock Your Digital Library',
    description: 'Become a subscriber to get access to exclusive content, rewards, and more!',
    buttonText: 'Subscribe Now',
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-sans text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4 bg-white rounded-xl shadow-lg p-8 h-fit">
            <div className="flex flex-col items-center text-center mb-6">
              {user.Avatar ? (
                <img
                  src={user.Avatar}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#A56F6E] shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-[#E0D4D3] border-4 border-[#A56F6E] flex items-center justify-center text-5xl font-bold text-[#A56F6E] shadow-md">
                  {initials}
                </div>
              )}
              <h1 className="text-3xl font-serif text-gray-900 mt-6">{user.Name}</h1>
              <p className="text-sm text-gray-500">{user.Email}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-medium text-[#A56F6E]">Account Details</h2>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>
                  <span className="font-semibold text-gray-800">Country:</span> {user.Country}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Member Since:</span>{' '}
                  {new Date(user.Registration_Date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Reward Points:</span>{' '}
                  {user.Reward_Points}
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-serif font-medium text-[#A56F6E]">Gamification</h2>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>
                  <span className="font-semibold text-gray-800">Reading Streak:</span> 5 days
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Badges Earned:</span> 3
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Current Rank:</span> 12
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="w-full px-8 py-3 rounded-full border-2 border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-semibold text-sm">
                Edit Profile
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-3/4 space-y-12">
            {isSubscriber ? (
              <>
                {/* Liked Books */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart size={24} /> <span>Liked Books</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {likedBooks.length} Likes
                    </span>
                  </h2>
                  <div className="flex gap-6 overflow-x-auto whitespace-nowrap py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {likedBooks.map((book) => (
                      <div key={book.title} className="w-24 flex-shrink-0 text-center">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-36 object-cover rounded-md shadow-md mb-2"
                        />
                        <p className="text-xs font-medium text-gray-700 truncate">{book.title}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Downloaded Books */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Download size={24} /> <span>Downloaded Books</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {downloadedBooks.length} Downloads
                    </span>
                  </h2>
                  <div className="flex gap-6 overflow-x-auto whitespace-nowrap py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {downloadedBooks.map((book) => (
                      <div key={book.title} className="w-24 flex-shrink-0 text-center">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-36 object-cover rounded-md shadow-md mb-2"
                        />
                        <p className="text-xs font-medium text-gray-700 truncate">{book.title}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Reviews Given */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star size={24} /> <span>Reviews Given</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {reviewsGiven.length} Reviews
                    </span>
                  </h2>
                  <div className="space-y-6">
                    {reviewsGiven.map((review, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={16} fill="#A56F6E" className="text-[#A56F6E]" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{review.reviewText}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* AI Recommended Books */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck size={24} /> <span>AI Recommended Books</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {aiRecommendations.length} Recommendations
                    </span>
                  </h2>
                  <div className="flex gap-6 overflow-x-auto whitespace-nowrap py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {aiRecommendations.map((book) => (
                      <div key={book.title} className="w-24 flex-shrink-0 text-center">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-36 object-cover rounded-md shadow-md mb-2"
                        />
                        <p className="text-xs font-medium text-gray-700 truncate">{book.title}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Books Read */}
                <section className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-serif font-medium text-[#A56F6E] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen size={24} /> <span>Books Read</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {booksRead.length} Reads
                    </span>
                  </h2>
                  <div className="flex gap-6 overflow-x-auto whitespace-nowrap py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {booksRead.map((book) => (
                      <div key={book.title} className="w-24 flex-shrink-0 text-center">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-36 object-cover rounded-md shadow-md mb-2"
                        />
                        <p className="text-xs font-medium text-gray-700 truncate">{book.title}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-10 border-2 border-dashed border-gray-300">
                <h2 className="text-2xl font-serif font-medium text-gray-700 mb-4">
                  {ctaMessage.title}
                </h2>
                <p className="text-base text-gray-600 mb-6">{ctaMessage.description}</p>
                <button className="px-8 py-3 rounded-full border-2 border-[#A56F6E] text-[#A56F6E] hover:bg-[#A56F6E] hover:text-white transition-all duration-300 font-semibold">
                  {ctaMessage.buttonText}
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
