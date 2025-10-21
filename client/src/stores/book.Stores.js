import { create } from 'zustand';
import { axiosInstance } from '../utils/axios.js';
import { fallbackBook, mybooks } from '../components/Data.js';

export const useBookStore = create((set) => ({
  isLoadingBooks: false,
  books: [],
  isLoadingBook: false,
  book: {},
  likesCount: 0,
  downloadCount: 0,
  reviews: [],
  averageRating: 0,
  authorBooks: [],

  fetchBooks: async () => {
    try {
      set({ isLoadingBooks: true });
      const response = await axiosInstance.get('/books');
      set({ books: response.data?.data });
    } catch (error) {
      console.error('Failed to fetch books from API, using fallback data:', error);
      set({ books: mybooks });
    } finally {
      set({ isLoadingBooks: false });
    }
  },

  fetchBookReviews: async (id) => {
    try {
      const response = await axiosInstance.get(`/books/allReview/${id}`);
      const reviewsData = response.data?.data || [];
      set({ reviews: reviewsData });
    } catch (error) {
      console.error('Failed to fetch book reviews from API, using fallback data:', error);
      set({ reviews: [] });
    }
  },
  // fetch a single book and related info
  fetchABook: async (id) => {
    try {
      set({ isLoadingBook: true });

      // Fetch book
      const response = await axiosInstance.get(`/books/${id}`);
      const bookData = response.data?.data?.[0];
      set({ book: bookData || fallbackBook });

      if (bookData) {
        // Fetch likes count
        try {
          const likesRes = await axiosInstance.get(`/books/likesCount/${id}`);
          set({ likesCount: likesRes.data?.data?.[0]?.total_likes || 0 });
        } catch (err) {
          console.warn(err);
        }

        // Fetch download count
        try {
          const downloadRes = await axiosInstance.get(`/books/downloadCount/${id}`);
          set({ downloadCount: downloadRes.data?.data?.[0]?.total_downloads || 0 });
        } catch (err) {
          console.warn(err);
        }

        // Fetch reviews and calculate average rating
        try {
          const reviewsRes = await axiosInstance.get(`/books/allReview/${id}`);
          const reviewsData = reviewsRes.data?.data || [];
          set({ reviews: reviewsData });

          if (reviewsData.length > 0) {
            const totalRating = reviewsData.reduce((sum, r) => sum + r.Rating, 0);
            set({ averageRating: (totalRating / reviewsData.length).toFixed(1) });
          }
        } catch (err) {
          console.warn(err);
        }

        // Fetch other books by same authors
        if (bookData.AuthorIDs?.length > 0) {
          try {
            const authorBooksRes = await axiosInstance.get(`/authors/${bookData.AuthorIDs}/books`);
            set({ authorBooks: authorBooksRes.data?.data || [] });
          } catch (err) {
            console.warn(err);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch book:', error);
      set({ book: fallbackBook });
    } finally {
      set({ isLoadingBook: false });
    }
  },
}));
