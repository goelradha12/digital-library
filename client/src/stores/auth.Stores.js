import { create } from 'zustand';
import { axiosInstance } from '../utils/axios.js';
export const useAuthStore = create((set) => ({
  isLoading: false,
  User: null,
  Visitor: null,
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
      console.log('Fetching User...',id);
      set({ isLoading: true });
      const response = await axiosInstance.get(`/users/getUser/${id}`);
      set({ User: response.data.data });
      console.log(response.data)
    } catch (error) {
      console.log(error);
      set({ User: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
