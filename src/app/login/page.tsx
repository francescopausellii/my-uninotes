"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // -------- LOGIN --------
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.status === 200) {
        console.log("login response:", res.status, res.data);
        router.push("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Errore di login");
      } else {
        setError("Si è verificato un errore durante il login");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Accedi o registrati</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex gap-2">
          {/* questo bottone invoca handleLogin */}
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
