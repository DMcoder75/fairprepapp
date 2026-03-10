import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft, LogOut } from "lucide-react";
import { useSupabaseAuthContext } from "@/contexts/SupabaseAuthContext";
import { FAIRPREP_BRANDING, DELETE_REQUEST_REASONS } from "@shared/branding";
import { signOut, signInWithPassword } from "@/lib/supabase";
import { submitDeletionRequest } from "@shared/cloudFunctionConfig";

type PageState = "login" | "deletion-request";

export default function DeleteRequestPage() {
  const [, setLocation] = useLocation();
  const { user, loading: authLoading } = useSupabaseAuthContext();
  const [pageState, setPageState] = useState<PageState>("login");

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Deletion request form state
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReasonDetail, setOtherReasonDetail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update page state based on auth
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        setPageState("deletion-request");
      } else {
        setPageState("login");
      }
    }
  }, [authLoading, user]);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      await signInWithPassword(email, password);
      // Auth state will update automatically and trigger page state change
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      setEmail("");
      setPassword("");
      setPageState("login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Handle deletion request submission
  const handleSubmitDeletionRequest = async () => {
    if (!user) return;

    setSubmitting(true);
    setError(null);

    try {
      const reasonToSubmit =
        selectedReason === "Other reason" ? otherReasonDetail : selectedReason;

      const result = await submitDeletionRequest({
        userId: user.id,
        email: user.email || "",
        reason: reasonToSubmit,
      });

      if (result.success) {
        // Save state and redirect
        sessionStorage.setItem(
          "deletionRequestData",
          JSON.stringify({
            email: user.email,
            reason: reasonToSubmit,
            timestamp: new Date().toISOString(),
          })
        );
        setLocation("/confirmation");
      } else {
        setError(result.error || "Failed to submit deletion request");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: FAIRPREP_BRANDING.colors.pageBackground }}
      >
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: FAIRPREP_BRANDING.colors.primary }}
        />
      </div>
    );
  }

  // LOGIN PAGE
  if (pageState === "login") {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-8"
        style={{ backgroundColor: FAIRPREP_BRANDING.colors.pageBackground }}
      >
        <Card
          className="w-full max-w-md"
          style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
        >
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img
                src={FAIRPREP_BRANDING.logoUrl}
                alt="FairPrep Logo"
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div>
              <CardTitle
                className="text-2xl"
                style={{ color: FAIRPREP_BRANDING.colors.primary }}
              >
                FairPrep
              </CardTitle>
              <CardDescription
                style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
              >
                Data Deletion Request
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2 text-center">
              <p
                className="text-sm"
                style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
              >
                Sign in to request data deletion
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  style={{ color: FAIRPREP_BRANDING.colors.text }}
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    backgroundColor: FAIRPREP_BRANDING.colors.inputBackground,
                    borderColor: FAIRPREP_BRANDING.colors.border,
                    color: FAIRPREP_BRANDING.colors.text,
                  }}
                  className="border"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  style={{ color: FAIRPREP_BRANDING.colors.text }}
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    backgroundColor: FAIRPREP_BRANDING.colors.inputBackground,
                    borderColor: FAIRPREP_BRANDING.colors.border,
                    color: FAIRPREP_BRANDING.colors.text,
                  }}
                  className="border"
                />
              </div>

              {loginError && (
                <div
                  className="p-3 rounded text-sm"
                  style={{
                    backgroundColor: FAIRPREP_BRANDING.colors.error + "20",
                    color: FAIRPREP_BRANDING.colors.error,
                  }}
                >
                  {loginError}
                </div>
              )}

              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full"
                style={{
                  backgroundColor: FAIRPREP_BRANDING.colors.primary,
                  color: FAIRPREP_BRANDING.colors.text,
                }}
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center text-xs" style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}>
              <p>Use your FairPrep account credentials to proceed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // DELETION REQUEST PAGE
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: FAIRPREP_BRANDING.colors.pageBackground }}
    >
      <Card
        className="w-full max-w-2xl"
        style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
      >
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={FAIRPREP_BRANDING.logoUrl}
                alt="FairPrep Logo"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <CardTitle
                  className="text-2xl"
                  style={{ color: FAIRPREP_BRANDING.colors.primary }}
                >
                  FairPrep
                </CardTitle>
                <CardDescription
                  style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                >
                  Data Deletion Request
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              style={{ color: FAIRPREP_BRANDING.colors.primary }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Confirmation */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: FAIRPREP_BRANDING.colors.primary }}
                >
                  Step 1 of 2: Confirm Deletion Request
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                >
                  I, <strong>{user?.email}</strong>, request FairPrep and Dalsi
                  Org to delete all my personal data. I understand that this
                  action cannot be undone and all my study records will be
                  permanently removed.
                </p>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg" style={{ backgroundColor: FAIRPREP_BRANDING.colors.inputBackground }}>
                <Checkbox
                  id="confirm"
                  checked={confirmDelete}
                  onCheckedChange={(checked) =>
                    setConfirmDelete(checked as boolean)
                  }
                />
                <Label
                  htmlFor="confirm"
                  className="cursor-pointer flex-1"
                  style={{ color: FAIRPREP_BRANDING.colors.text }}
                >
                  I confirm that I want to delete my account and all associated data
                </Label>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!confirmDelete}
                className="w-full"
                style={{
                  backgroundColor: confirmDelete
                    ? FAIRPREP_BRANDING.colors.primary
                    : FAIRPREP_BRANDING.colors.border,
                  color: FAIRPREP_BRANDING.colors.text,
                }}
              >
                Continue to Next Step
              </Button>
            </div>
          )}

          {/* Step 2: Reason Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: FAIRPREP_BRANDING.colors.primary }}
                >
                  Step 2 of 2: Tell Us Why
                </h3>
                <p
                  className="text-sm"
                  style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                >
                  Please select the reason for leaving FairPrep (optional but
                  helpful)
                </p>
              </div>

              <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                <div className="space-y-3">
                  {DELETE_REQUEST_REASONS.map((reason) => (
                    <div
                      key={reason}
                      className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        backgroundColor:
                          selectedReason === reason
                            ? FAIRPREP_BRANDING.colors.primary + "20"
                            : FAIRPREP_BRANDING.colors.inputBackground,
                        borderLeft:
                          selectedReason === reason
                            ? `4px solid ${FAIRPREP_BRANDING.colors.primary}`
                            : "4px solid transparent",
                      }}
                      onClick={() => setSelectedReason(reason)}
                    >
                      <RadioGroupItem value={reason} id={reason} />
                      <Label
                        htmlFor={reason}
                        className="cursor-pointer flex-1"
                        style={{ color: FAIRPREP_BRANDING.colors.text }}
                      >
                        {reason}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Other Reason Text Input */}
              {selectedReason === "Other reason" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="other-reason"
                    style={{ color: FAIRPREP_BRANDING.colors.text }}
                  >
                    Please specify your reason
                  </Label>
                  <Textarea
                    id="other-reason"
                    placeholder="Tell us more about why you're leaving..."
                    value={otherReasonDetail}
                    onChange={(e) => setOtherReasonDetail(e.target.value)}
                    style={{
                      backgroundColor: FAIRPREP_BRANDING.colors.inputBackground,
                      borderColor: FAIRPREP_BRANDING.colors.border,
                      color: FAIRPREP_BRANDING.colors.text,
                    }}
                    className="border min-h-24"
                  />
                </div>
              )}

              {error && (
                <div
                  className="p-3 rounded text-sm"
                  style={{
                    backgroundColor: FAIRPREP_BRANDING.colors.error + "20",
                    color: FAIRPREP_BRANDING.colors.error,
                  }}
                >
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  style={{
                    borderColor: FAIRPREP_BRANDING.colors.primary,
                    color: FAIRPREP_BRANDING.colors.primary,
                  }}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmitDeletionRequest}
                  disabled={submitting || !selectedReason}
                  className="flex-1"
                  style={{
                    backgroundColor:
                      selectedReason && !submitting
                        ? FAIRPREP_BRANDING.colors.primary
                        : FAIRPREP_BRANDING.colors.border,
                    color: FAIRPREP_BRANDING.colors.text,
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Deletion Request"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
