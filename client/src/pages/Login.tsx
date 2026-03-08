import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { signInWithPassword, setSession } from "@/lib/supabase";
import { useSupabaseAuthContext } from "@/contexts/SupabaseAuthContext";
import { FAIRPREP_BRANDING } from "@shared/branding";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(true);
  const { user } = useSupabaseAuthContext();

  // Handle JWT token from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      handleJWTLogin(token);
    }
  }, []);

  // Redirect if already logged in
  if (user) {
    setLocation("/request");
    return null;
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      await signInWithPassword(email, password);
      setLocation("/request");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleJWTLogin = async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("Invalid token");
      }

      await setSession(token);
      setLocation("/request");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: FAIRPREP_BRANDING.colors.pageBackground }}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Header with Logo */}
        <div
          className="rounded-t-lg p-6 flex flex-col items-center space-y-4"
          style={{ backgroundColor: FAIRPREP_BRANDING.colors.headerBackground }}
        >
          <img
            src={FAIRPREP_BRANDING.logoUrl}
            alt="Fairprep Logo"
            className="h-24 w-auto"
          />
          <div className="text-center">
            <h1
              className="text-2xl font-bold"
              style={{ color: FAIRPREP_BRANDING.colors.text }}
            >
              {FAIRPREP_BRANDING.appName}
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              Data Deletion Request
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card
          className="border-0 shadow-2xl"
          style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
        >
          <CardHeader className="space-y-2">
            <CardTitle
              className="text-xl font-bold text-center"
              style={{ color: FAIRPREP_BRANDING.colors.text }}
            >
              Sign In
            </CardTitle>
            <CardDescription
              className="text-center"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              Enter your credentials to request data deletion
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Message */}
            {error && (
              <div
                className="p-3 rounded-md text-sm"
                style={{
                  backgroundColor: FAIRPREP_BRANDING.colors.error + "20",
                  color: FAIRPREP_BRANDING.colors.error,
                  border: `1px solid ${FAIRPREP_BRANDING.colors.error}40`,
                }}
              >
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <Loader2
                  className="h-8 w-8 animate-spin"
                  style={{ color: FAIRPREP_BRANDING.colors.primary }}
                />
                <p
                  className="text-sm"
                  style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                >
                  Authenticating...
                </p>
              </div>
            )}

            {/* Password Login Form */}
            {!loading && showPasswordForm && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: FAIRPREP_BRANDING.colors.text }}
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="border-0"
                    style={{
                      backgroundColor: FAIRPREP_BRANDING.colors.inputBackground,
                      color: FAIRPREP_BRANDING.colors.text,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: FAIRPREP_BRANDING.colors.text }}
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="border-0"
                    style={{
                      backgroundColor: FAIRPREP_BRANDING.colors.inputBackground,
                      color: FAIRPREP_BRANDING.colors.text,
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full font-medium text-white"
                  style={{ backgroundColor: FAIRPREP_BRANDING.colors.primary }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            )}

            {!loading && (
              <div
                className="text-xs text-center"
                style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
              >
                By proceeding, you agree to delete your {FAIRPREP_BRANDING.appName} account and data
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
