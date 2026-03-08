import { useEffect, useState } from "react";
import { supabase, onAuthStateChange } from "@/lib/supabase";
import type { User, Session, Subscription } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

export function useSupabaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setAuthState((prev) => ({ ...prev, error, loading: false }));
      } else {
        setAuthState((prev) => ({
          ...prev,
          session,
          user: session?.user || null,
          loading: false,
        }));
      }
    });

    // Subscribe to auth state changes
    const subscription = onAuthStateChange((event, session) => {
      setAuthState((prev) => ({
        ...prev,
        session,
        user: session?.user || null,
        loading: false,
      }));
    });

    return () => {
      subscription.data.subscription?.unsubscribe();
    };
  }, []);

  return authState;
}
