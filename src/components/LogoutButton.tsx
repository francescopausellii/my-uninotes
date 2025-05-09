"use client";

import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      // client-side redirect
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error: string }>;
        console.error("Logout fallito:", axiosErr.response?.data.error);
      } else {
        // Errore generico (non Axios)
        console.error("Logout fallito:", err);
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
    >
      Logout
    </button>
  );
}
