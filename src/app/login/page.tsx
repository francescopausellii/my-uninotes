"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("Email e password sono obbligatorie");
      return;
    }
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-sm max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Inserisci le tue credenziali per accedere al tuo account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value.trim())}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value.trim())}
                required
              />
            </div>
            <div>
              <p className="text-sm text-red-500">{error}</p>
            </div>
            <Button
              type="submit"
              onClick={() => handleLogin()}
              className="w-full"
              disabled={loading}
            >
              Login
            </Button>
            <div>
              <Link
                href={"/register"}
                className="text-sm text-muted-foreground hover:underline"
              >
                Non hai un account? Registrati
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
