import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useUserBookStore = create((set, get) => ({
  likedBooks: null,
  downloadedBooks: null,
  reviewsGiven: null,
  isLoadingUserBooks: false,
  error: null,

  // 🔹 Fetch liked books
  fetchLikedBooks: async (userId) => {
    if (!userId) return;
    set({ isLoadingUserBooks: true });
    try {
      const res = await axiosInstance.get(`/users/likedBooks/${userId}`);
      set({ likedBooks: res.data?.data || [] });
    } catch (error) {
      if (error.response?.status === 404) set({ likedBooks: null });
      else console.error('Error fetching liked books:', error);
    } finally {
      set({ isLoadingUserBooks: false });
    }
  },

  // 🔹 Fetch downloaded books
  fetchDownloadedBooks: async (userId) => {
    if (!userId) return;
    set({ isLoadingUserBooks: true });
    try {
      const res = await axiosInstance.get(`/users/downloadedBooks/${userId}`);
      set({ downloadedBooks: res.data?.data || [] });
    } catch (error) {
      if (error.response?.status === 404) set({ downloadedBooks: null });
      else console.error('Error fetching downloaded books:', error);
    } finally {
      set({ isLoadingUserBooks: false });
    }
  },

  // 🔹 Fetch reviewed books
  fetchReviewedBooks: async (userId) => {
    if (!userId) return;
    set({ isLoadingUserBooks: true });
    try {
      const res = await axiosInstance.get(`/users/reviewdBooks/${userId}`);
      set({ reviewsGiven: res.data?.data || [] });
    } catch (error) {
      if (error.response?.status === 404) set({ reviewsGiven: null });
      else console.error('Error fetching reviewed books:', error);
    } finally {
      set({ isLoadingUserBooks: false });
    }
  },

  // 🔹 Unlike a book
  unlikeBook: async (userId, bookId) => {
    try {
      await axiosInstance.delete(`/users/likeBook/${userId}/likes/${bookId}`);
      const updated = (get().likedBooks || []).filter((book) => book.Book_ID !== bookId);
      set({ likedBooks: updated });
    } catch (error) {
      console.error('Error unliking book:', error);
    }
  },

  // 🔹 Remove downloaded book
  removeDownloadedBook: async (userId, bookId) => {
    try {
      await axiosInstance.delete(`/users/downloadBook/${userId}/downloads/${bookId}`);
      const updated = (get().downloadedBooks || []).filter((book) => book.Book_ID !== bookId);
      set({ downloadedBooks: updated });
    } catch (error) {
      console.error('Error removing downloaded book:', error);
    }
  },
}));
