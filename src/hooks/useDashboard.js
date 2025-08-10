// src/hooks/useDashboard.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard`,
        {
          withCredentials: true, // ✅ Required for cookie-based auth
        }
      );

      if (res.status !== 200) {
        window.location.href = import.meta.env.VITE_PUBLIC_PAGE + "/login";
      }
      console.log(res.data);
      return res.data;
    },
    retry: false, // prevent retry on error
    staleTime: 1000 * 60 * 5, // cache 5 min
  });
};
