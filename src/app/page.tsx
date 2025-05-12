"use client";
import LogoutButton from "@/components/logout-button";
import { useSession } from "@/context/session-context";

export default function Home() {
  const { user } = useSession();

  return (
    <main className="p-4 h-full">
      <p>
        Hello <strong>{user?.email}</strong>
      </p>
      <LogoutButton />
    </main>
  );
}
