// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST() {
  const supabase = await createClient();

  // chiude sessione, rimuove cookie HTTP-only
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // opzionale: puoi anche fare un redirect direttamente qui
  // return NextResponse.redirect("/login");

  return NextResponse.json({ success: true }, { status: 200 });
}
