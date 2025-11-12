// src/stores/books.Stores.js
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useBookAdminStore = create((set, get) => ({
  // 🧱 Core States
  books: [],
  authors: [],
  publishers: [],
  series: [],
  categories: [],
  userCount: null,
  subscriberCount : null,
  loading: false,
  error: null,

  /* ========================================================
     📘 BOOK MANAGEMENT
  ======================================================== */

  // ✅ Fetch all books
  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/admin/books");
      set({ books: res.data || [], loading: false });
    } catch (err) {
      console.error("Error fetching books:", err);
      set({ error: "Failed to load books", loading: false });
    }
  },

  // ✅ Add or Edit Book
  addOrEditBook: async (bookData, isEdit = false, id = null) => {
    try {
      if (isEdit) {
        await axiosInstance.put(`/admin/books/${id}`, bookData);
      } else {
        await axiosInstance.post(`/admin/books`, bookData);
      }
      await get().fetchBooks();
      return true;
    } catch (err) {
      console.error("Error saving book:", err);
      alert("Failed to save book.");
      return false;
    }
  },

  // ✅ Delete Book
  deleteBook: async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this book?");
      if (!confirmDelete) return false;

      await axiosInstance.delete(`/admin/books/${id}`);
      set({ books: get().books.filter((b) => b.Book_ID !== id) });
      return true;
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book.");
      return false;
    }
  },

  /* ========================================================
     🧾 SUPPORTING DATA (AUTHORS, PUBLISHERS, SERIES, CATEGORIES)
  ======================================================== */

  fetchSupportData: async () => {
    try {
      const [authorsRes, publishersRes, seriesRes, categoriesRes, UserRes, SubRes] = await Promise.all([
        axiosInstance.get("/admin/authors"),
        axiosInstance.get("/admin/publishers"),
        axiosInstance.get("/admin/series"),
        axiosInstance.get("/admin/categories"),
        axiosInstance.get("/admin/users/count"),
        axiosInstance.get("/admin/subscribers/count"),
      ]);

      set({
        authors: authorsRes.data || [],
        publishers: publishersRes.data || [],
        series: seriesRes.data || [],
        categories: categoriesRes.data || [],
        userCount: UserRes.data.count || null,
        subscriberCount: SubRes.data.count || null
      });
    } catch (err) {
      console.error("Error fetching supporting data:", err);
      alert("Failed to load dropdown data. Please refresh the page.");
    }
  },

  // ✅ Quick Add Functions (for modals later)
  addAuthor: async (Author_Name) => {
    try {
      await axiosInstance.post("/admin/authors", { Author_Name });
      await get().fetchSupportData();
      return true;
    } catch {
      alert("Failed to add author");
      return false;
    }
  },

  addPublisher: async (Publisher_Name) => {
    try {
      await axiosInstance.post("/admin/publishers", { Publisher_Name });
      await get().fetchSupportData();
      return true;
    } catch {
      alert("Failed to add publisher");
      return false;
    }
  },

  addSeries: async (Series_Name) => {
    try {
      await axiosInstance.post("/admin/series", { Series_Name });
      await get().fetchSupportData();
      return true;
    } catch {
      alert("Failed to add series");
      return false;
    }
  },

  addCategory: async (Category_Name) => {
    try {
      await axiosInstance.post("/admin/categories", { Category_Name });
      await get().fetchSupportData();
      return true;
    } catch {
      alert("Failed to add category");
      return false;
    }
  },

  // ✅ Computed counts for dashboard
  getSummary: () => {
    const { books, authors, publishers, categories, userCount, subscriberCount } = get();
    return {
      books: books.length,
      authors: authors.length,
      publishers: publishers.length,
      categories: categories.length,
      series: get().series.length,
      UserCount: userCount,
      SubscriberCount: subscriberCount
    };
  },
}));
