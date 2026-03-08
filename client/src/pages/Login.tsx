import { useState } from "react";
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
  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"password" | "jwt">("password");
  const { user } = useSupabaseAuthContext();

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

  const handleJWTLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!jwtToken) {
        throw new Error("Please enter a JWT token");
      }

      await setSession(jwtToken);
      setLocation("/request");
    } catch (err) {
      setError(err instanceof Error ? err.message : "JWT verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: FAIRPREP_BRANDING.colors.background }}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={FAIRPREP_BRANDING.logoUrl}
            alt="Fairprep Logo"
            className="h-20 w-auto"
          />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle
              className="text-2xl font-bold text-center"
              style={{ color: FAIRPREP_BRANDING.colors.primary }}
            >
              Fairprep Account
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to request data deletion
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Method Tabs */}
            <div className="flex gap-2 border-b">
              <button
                onClick={() => setLoginMethod("password")}
                className={`flex-1 pb-2 font-medium transition-colors ${
                  loginMethod === "password"
                    ? "border-b-2 text-primary"
                    : "text-muted-foreground"
                }`}
                style={
                  loginMethod === "password"
                    ? { color: FAIRPREP_BRANDING.colors.primary, borderColor: FAIRPREP_BRANDING.colors.primary }
                    : {}
                }
              >
                Email & Password
              </button>
              <button
                onClick={() => setLoginMethod("jwt")}
                className={`flex-1 pb-2 font-medium transition-colors ${
                  loginMethod === "jwt"
                    ? "border-b-2 text-primary"
                    : "text-muted-foreground"
                }`}
                style={
                  loginMethod === "jwt"
                    ? { color: FAIRPREP_BRANDING.colors.primary, borderColor: FAIRPREP_BRANDING.colors.primary }
                    : {}
                }
              >
                JWT Token
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="p-3 rounded-md text-sm"
                style={{
                  backgroundColor: "#FEE2E2",
                  color: "#991B1B",
                }}
              >
                {error}
              </div>
            )}

            {/* Password Login Form */}
            {loginMethod === "password" && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="border-border"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full font-medium"
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

            {/* JWT Login Form */}
            {loginMethod === "jwt" && (
              <form onSubmit={handleJWTLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">JWT Token</label>
                  <Input
                    type="text"
                    placeholder="eyJhbGciOiJIUzI1NiIs..."
                    value={jwtToken}
                    onChange={(e) => setJwtToken(e.target.value)}
                    disabled={loading}
                    className="border-border font-mono text-xs"
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste your pre-authenticated JWT token to verify your identity
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full font-medium"
                  style={{ backgroundColor: FAIRPREP_BRANDING.colors.primary }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Token"
                  )}
                </Button>
              </form>
            )}

            <div className="text-xs text-center text-muted-foreground">
              By proceeding, you agree to delete your {FAIRPREP_BRANDING.appName} account and data
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
