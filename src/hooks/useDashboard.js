// src/hooks/useDashboard.js
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useDashboard = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
        withCredentials: true, // ✅ Required for cookie-based auth
      });
      console.log(res.data)
      return res.data;
    },
    retry: false, // prevent retry on error
    staleTime: 1000 * 60 * 5, // cache 5 min
  });
};
