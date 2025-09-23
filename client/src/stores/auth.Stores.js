import {create} from "zustand";
import { axiosInstance } from '../utils/axios.js';
export const useAuthStore = create((set) => ({
    isLoading: false,
    User: null,
    checkUserAuth: async (data) => {
        try {
            set({isLoading: true});
            const response = await axiosInstance.post('/users', data);
            console.log(response.data.data)
            set({User: response.data.data});
        } catch (error) {
            set({User: null});
        } finally {
            set({isLoading: false});
        }
    },
}));