"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import Loading from "@/app/loading";

const supabase = createClient();

type SessionContextType = {
  session: Session | null | undefined;
  user: User | null;
  supabase: ReturnType<typeof createClient>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recupera la sessione attuale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
      setUser(session?.user ?? null);
    });

    // Ascolta i cambiamenti nella sessione (es. login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null);
        setUser(session?.user ?? null);
      },
    );

    setIsLoading(false);
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SessionContext.Provider value={{ session, user, supabase }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
