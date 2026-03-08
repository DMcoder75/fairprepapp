import React, { createContext, useContext } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const authState = useSupabaseAuth();

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export function useSupabaseAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSupabaseAuthContext must be used within SupabaseAuthProvider");
  }
  return context;
}
