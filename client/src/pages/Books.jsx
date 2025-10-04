import React, { useEffect, useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { axiosInstance } from '../utils/axios.js';
import CarouselSection from '../components/BookCarousel';
import BookCard from '../components/BookCard';
import { mybooks } from '../components/Data.js';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');
        setBooks(response.data.data);
      } catch (error) {
        console.error('Failed to fetch books from API, using fallback data:', error);
        setBooks(mybooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterOpen && !event.target.closest('.filter-dropdown')) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const newReleases = books.filter((book) => parseInt(book.Publication_Year) >= 2024);

  // Extract unique categories from all books
  const allCategories = useMemo(() => {
    const categories = new Set();
    books.forEach((book) => {
      if (book.Categories) {
        book.Categories.split(',').forEach((category) => {
          categories.add(category.trim());
        });
      }
    });
    return Array.from(categories).sort();
  }, [books]);

  // Filter books based on search term and selected category
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Authors.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        (book.Categories && book.Categories.toLowerCase().includes(selectedCategory.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  return (
    <>
      <Header />
      <div className="bg-[#f2e4e3] min-h-screen pt-30 pb-12">
        <div className="container mx-auto max-w-7xl px-6 space-y-16">
          {/* New Releases Carousel Section */}
          <section>
            <h2
              className="text-3xl md:text-5xl font-serif font-light mb-8 text-center"
              style={{ color: '#A56F6E' }}
            >
              Latest Publishes
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
              </div>
            ) : (
              <CarouselSection books={newReleases} />
            )}
          </section>

          {/* All Books Section */}
          <section>
            {/* Header with Search and Filter */}
            <div className="relative mb-10">
              <h2
                className="text-3xl md:text-5xl font-serif font-light text-center"
                style={{ color: '#A56F6E' }}
              >
                All Books
              </h2>

              {/* Search and Filter Controls - Positioned on the right */}
              <div className="absolute top-0 right-0 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-9 pr-8 py-2.5 text-sm border border-gray-300 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-[#A56F6E]/20 focus:border-[#A56F6E] outline-none transition-all hover:shadow-md"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Button */}
                <div className="relative filter-dropdown">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#A56F6E] text-white rounded-full shadow-sm hover:bg-[#8F5B5A] hover:shadow-md transition-all duration-200 text-sm font-medium"
                  >
                    <Filter className="w-4 h-4" />
                    {selectedCategory || 'Category'}
                    {selectedCategory && (
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">✓</span>
                    )}
                  </button>

                  {/* Filter Dropdown */}
                  {isFilterOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 min-w-52 max-h-64 overflow-y-auto">
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-1">
                          Categories
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCategory('');
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            !selectedCategory ? 'bg-[#A56F6E] text-white' : 'hover:bg-gray-50'
                          }`}
                        >
                          All Categories
                        </button>
                        {allCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedCategory === category
                                ? 'bg-[#A56F6E] text-white'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                      setIsFilterOpen(false);
                    }}
                    className="px-3 py-2 text-sm text-gray-500 hover:text-[#A56F6E] transition-colors font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Results Info */}
            {(searchTerm || selectedCategory) && (
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">{filteredBooks.length}</span> of{' '}
                    <span className="font-semibold">{books.length}</span> books found
                    {searchTerm && (
                      <span className="ml-1">
                        matching <strong>"{searchTerm}"</strong>
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="ml-1">
                        in <strong>{selectedCategory}</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
              </div>
            ) : (
              <>
                {filteredBooks.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {filteredBooks.map((book) => (
                      <BookCard key={book.Book_ID} book={book} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">No books found</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      We couldn't find any books matching your search criteria. Try adjusting your
                      filters or search terms.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                      }}
                      className="px-6 py-2 bg-[#A56F6E] text-white rounded-full hover:bg-[#8F5B5A] transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Books;
