"use client";

import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");

      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error: string }>;
        console.error("Logout fallito:", axiosErr.response?.data.error);
      } else {
        console.error("Logout fallito:", err);
      }
    }
  };

  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
}
