import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sign up a new user with email and password
 */
export async function signUpWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Sign in with email and password
 */
export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Verify a JWT token and get the user session
 */
export async function verifyJWT(token: string) {
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Set the session with an access token
 */
export async function setSession(accessToken: string, refreshToken?: string) {
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken || "",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get the current user session
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}

/**
 * Insert a deletion request into the vk_delete_requests table
 */
export async function insertDeleteRequest(
  userId: string,
  email: string,
  reason: string,
  otherReasonDetail?: string
) {
  const { data, error } = await supabase.from("vk_delete_requests").insert([
    {
      user_id: userId,
      user_email: email,
      reason,
      other_reason_detail: otherReasonDetail || null,
      created_at: new Date().toISOString(),
      processed: false,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
