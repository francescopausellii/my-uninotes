// app/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    // se non autenticato, redirect server-side
    redirect("/login");
  }

  // sei autenticato: mostro il client component per il logout
  return (
    <main className="p-4">
      <p>
        Hello <strong>{data.user.email}</strong>
      </p>
      <LogoutButton />
    </main>
  );
}
