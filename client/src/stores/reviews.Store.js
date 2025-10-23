import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useUserReviewsStore = create((set) => ({
  isLoadingReview: false,
  review: null,
  error: null,

  checkReviewEligibility: async (userId, bookId) => {
    set({ isLoadingReview: true });
    try {
      await axiosInstance.get(`/users/reviewBookEligibility/${userId}/reviews/${bookId}`);
      return true;
    } catch (error) {
      console.error('Error checking review eligibility:', error);
      return false;
    } finally {
      set({ isLoadingReview: false });
    }
  },
  // 🟢 Fetch a user's review for a specific book
  getTheReview: async ({ userId, bookId }) => {
    set({ isLoadingReview: true, error: null });
    try {
      const res = await axiosInstance.get(`/users/reviewBook/${userId}/reviews/${bookId}`);
      set({ review: res.data.data || null });
      return res.data.data;
    } catch (error) {
      console.error('Error fetching review:', error);
      set({ error: error.response?.data?.message || 'Failed to fetch review' });
    } finally {
      set({ isLoadingReview: false });
    }
  },

  // 🟡 Add a new review
  addReview: async ({ userId, bookId, reviewData }) => {
    // reviewData = { review_text, rating }
    set({ error: null });
    try {
      await axiosInstance.post(`/users/reviewBook/${userId}/reviews/${bookId}`, reviewData);
    } catch (error) {
      console.error('Error adding review:', error);
      set({ error: error.response?.data?.message || 'Failed to add review' });
    }
  },

  // 🟠 Update existing review
  updateReview: async ({ userId, bookId, reviewData }) => {
    set({ error: null });
    try {
      await axiosInstance.put(`/users/reviewBook/${userId}/reviews/${bookId}`, reviewData);
    } catch (error) {
      console.error('Error updating review:', error);
      set({ error: error.response?.data?.message || 'Failed to update review' });
    }
  },

  // 🔴 Delete review
  deleteReview: async ({ userId, bookId }) => {
    set({ isLoadingReview: true, error: null });
    try {
      await axiosInstance.delete(`/users/reviewBook/${userId}/reviews/${bookId}`);
      set({ review: null });
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      set({ error: error.response?.data?.message || 'Failed to delete review' });
    } finally {
      set({ isLoadingReview: false });
    }
  },
}));
