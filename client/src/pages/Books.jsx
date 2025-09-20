import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { axiosInstance } from '../utils/axios.js';
import CarouselSection from '../components/BookCarousel';
import BookCard from '../components/BookCard';
import { mybooks } from '../components/Data.js';

const Books = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get('/books');
                setBooks(response.data.data);
            } catch (error) {
                console.error("Failed to fetch books from API, using fallback data:", error);
                setBooks(mybooks);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const newReleases = books.filter(book => parseInt(book.Publication_Year) >= 2024);

    return (
        <>
            <Header />
            <div className="bg-[#f2e4e3] min-h-screen pt-30 pb-12">
                <div className="container mx-auto max-w-7xl px-6 space-y-16">
                    {/* New Releases Carousel Section */}
                    <section>
                        <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center" style={{ color: '#A56F6E' }}>
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
                        <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center" style={{ color: '#A56F6E' }}>
                            All Books
                        </h2>
                        {loading ? (
                            <div className="flex justify-center items-center h-48">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                                {books.map((book) => (
                                    <BookCard key={book.Book_ID} book={book} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Books;
