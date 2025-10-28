import { create } from 'zustand';
import { axiosInstance } from '../utils/axios.js';
export const useLeaderboardStore = create((set) => ({
  isLoadingLeaderboard: false,
  leaderboard: [],
  error: null,
  getLeaderboard: async () => {
    set({ isLoadingLeaderboard: true, error: null });
    try {
      const res = await axiosInstance.get('/leaderboard');
      set({ leaderboard: res.data.data || [] });
      return res.data.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      set({ error: error.response?.data?.message || 'Failed to fetch leaderboard' });
    } finally {
      set({ isLoadingLeaderboard: false });
    }
  },
}));
