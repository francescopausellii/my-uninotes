import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "@/components/logout-button";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="p-4">
      <p>
        Hello <strong>{data.user.email}</strong>
      </p>
      <LogoutButton />
    </main>
  );
}
