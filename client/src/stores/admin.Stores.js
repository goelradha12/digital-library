// src/stores/adminStore.js
import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js"

export const useAdminStore = create((set) => ({
  isAuthenticated: false,
  loading: false,
  adminEmail: "",

  // ✅ Admin Login
  loginAdmin: async (email, password) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/admin/login", { email, password });
      set({ isAuthenticated: true, adminEmail: email, loading: false });
      return { success: true };
    } catch (err) {
      console.log(err);
      set({ loading: false });
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  },

  // ✅ Admin Logout
  logoutAdmin: async () => {
    try {
      await axiosInstance.post("/admin/logout");
    } catch (err) {
      console.error(err);
    }
    set({ isAuthenticated: false, adminEmail: "" });
  },
}));
