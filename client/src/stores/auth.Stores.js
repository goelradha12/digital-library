import { create } from 'zustand';
import { axiosInstance } from '../utils/axios.js';
export const useAuthStore = create((set) => ({
  isLoading: false,
  User: null,
  Visitor: null,
  isSubscribed: false,
  checkVisitorAuth: async (data) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post('/users', data);
      set({ Visitor: response.data?.data });
      // check if user is a User or not
    } catch (error) {
      set({ Visitor: {} });
    } finally {
      set({ isLoading: false });
    }
  },

  checkUserAuth: async (id) => {
    try {
      console.log('Fetching User...', id);
      set({ isLoading: true });
      const response = await axiosInstance.get(`/users/getUser/${id}`);
      set({ User: response.data.data, isSubscribed: true });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      set({ User: null, isSubscribed: false });
    } finally {
      set({ isLoading: false });
    }
  },
  
  likeBook: async (userId, bookId) => {
    try {
      await axiosInstance.post(`/users/likeBook/${userId}/likes/${bookId}`);
      set((state) => ({ likesCount: state.likesCount + 1 }));
      return true;
    } catch (err) {
      console.error('Error liking book:', err);
      return false;
    }
  },

  unLikeBook: async (userId, bookId) => {
    try {
      await axiosInstance.delete(`/users/likeBook/${userId}/likes/${bookId}`);
      set((state) => ({ likesCount: Math.max(0, state.likesCount - 1) }));
      return true;
    } catch (err) {
      console.error('Error unliking book:', err);
      return false;
    }
  },

  checkIfBookLiked: async (userId, bookId) => {
    try {
      await axiosInstance.get(`/users/likeBook/${userId}/likes/${bookId}`);
      return true; // depends on your backend response
    } catch (err) {
      return false;
    }
  },
}));
