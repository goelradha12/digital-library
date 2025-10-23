import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useDownloadsStore = create((set) => ({
  isLoadingDownload: false,
  downloadedBook: null,
  error: null,

  // 🟢 Check if user has already downloaded the book
  checkIfDownloaded: async ({ userId, bookId }) => {
    set({ isLoadingDownload: true, error: null });
    try {
      const res = await axiosInstance.get(`/users/downloadBook/${userId}/downloads/${bookId}`);
      set({ downloadedBook: res.data.data || null });
      return res.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // No record found
        set({ downloadedBook: null });
      } else {
        console.error('Error checking download:', error);
        set({ error: error.response?.data?.message || 'Failed to check download' });
      }
    } finally {
      set({ isLoadingDownload: false });
    }
  },

  // 🟡 Mark book as downloaded
  downloadBook: async ({ userId, bookId }) => {
    set({ isLoadingDownload: true, error: null });
    try {
      const res = await axiosInstance.post(`/users/downloadBook/${userId}/downloads/${bookId}`);
      set({ downloadedBook: res.data.data });
      return res.data.data;
    } catch (error) {
      console.error('Error downloading book:', error);
      set({ error: error.response?.data?.message || 'Failed to download book' });
    } finally {
      set({ isLoadingDownload: false });
    }
  },

  // 🔴 Remove download record
  unDownloadBook: async ({ userId, bookId }) => {
    set({ isLoadingDownload: true, error: null });
    try {
      await axiosInstance.delete(`/users/downloadBook/${userId}/downloads/${bookId}`);
      set({ downloadedBook: null });
      return true;
    } catch (error) {
      console.error('Error removing download:', error);
      set({ error: error.response?.data?.message || 'Failed to remove download' });
    } finally {
      set({ isLoadingDownload: false });
    }
  },

  // 🧹 Utility: clear local state
  clearDownloadState: () => set({ downloadedBook: null, error: null }),
}));
