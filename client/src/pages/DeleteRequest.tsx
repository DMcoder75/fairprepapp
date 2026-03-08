import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import { useSupabaseAuthContext } from "@/contexts/SupabaseAuthContext";
import { FAIRPREP_BRANDING, DELETE_REQUEST_REASONS } from "@shared/branding";
import { signOut } from "@/lib/supabase";

export default function DeleteRequest() {
  const [, setLocation] = useLocation();
  const { user, loading: authLoading } = useSupabaseAuthContext();
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReasonDetail, setOtherReasonDetail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated
  if (!authLoading && !user) {
    setLocation("/");
    return null;
  }

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: FAIRPREP_BRANDING.colors.background }}
      >
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: FAIRPREP_BRANDING.colors.primary }} />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut();
      setLocation("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleContinueToStep2 = () => {
    if (!confirmDelete) {
      setError("Please confirm that you want to delete your data");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!selectedReason) {
      setError("Please select a reason");
      return;
    }

    if (selectedReason === "Other reason" && !otherReasonDetail.trim()) {
      setError("Please provide details for your reason");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Submit the deletion request via tRPC
      const response = await fetch("/api/trpc/deleteRequest.submitRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: {
            userId: user!.id,
            email: user!.email,
            reason: selectedReason,
            otherReasonDetail: selectedReason === "Other reason" ? otherReasonDetail : undefined,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit deletion request");
      }

      // Save state to sessionStorage before redirecting
      sessionStorage.setItem(
        "deleteRequestState",
        JSON.stringify({
          reason: selectedReason,
          otherReasonDetail: selectedReason === "Other reason" ? otherReasonDetail : undefined,
        })
      );

      // Redirect to confirmation page
      setLocation("/confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 py-8"
      style={{ backgroundColor: FAIRPREP_BRANDING.colors.background }}
    >
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src={FAIRPREP_BRANDING.logoUrl}
              alt="Fairprep Logo"
              className="h-16 w-auto"
            />
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: FAIRPREP_BRANDING.colors.primary }}
              >
                Data Deletion Request
              </h1>
              <p className="text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            Sign Out
          </Button>
        </div>

        {/* Step 1: Confirmation */}
        {step === 1 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Step 1: Confirm Deletion Request</CardTitle>
              <CardDescription>
                Please confirm that you want to delete your {FAIRPREP_BRANDING.appName} account and all associated data
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
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

              <div
                className="p-4 rounded-lg border-2"
                style={{
                  backgroundColor: "#F3F4F6",
                  borderColor: FAIRPREP_BRANDING.colors.secondary,
                }}
              >
                <p className="text-sm font-medium mb-4" style={{ color: FAIRPREP_BRANDING.colors.textDark }}>
                  I, <span className="font-bold">{user?.email}</span>, request that {FAIRPREP_BRANDING.appName} app and {FAIRPREP_BRANDING.orgName} org delete my data as I will not be using the app going ahead.
                </p>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="confirm-delete"
                    checked={confirmDelete}
                    onCheckedChange={(checked) => {
                      setConfirmDelete(checked as boolean);
                      setError(null);
                    }}
                  />
                  <Label
                    htmlFor="confirm-delete"
                    className="cursor-pointer text-sm font-medium"
                  >
                    I confirm that I want to delete my account and data
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleContinueToStep2}
                disabled={!confirmDelete}
                className="w-full font-medium"
                style={{
                  backgroundColor: confirmDelete ? FAIRPREP_BRANDING.colors.primary : "#D1D5DB",
                }}
              >
                Continue to Step 2
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Reason Selection */}
        {step === 2 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Step 2: Tell Us Why</CardTitle>
              <CardDescription>
                Please select the reason for moving away from {FAIRPREP_BRANDING.appName}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
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

              <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                <div className="space-y-3">
                  {DELETE_REQUEST_REASONS.map((reason) => (
                    <div key={reason} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={reason} id={reason} />
                      <Label htmlFor={reason} className="cursor-pointer flex-1 font-normal">
                        {reason}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Other Reason Text Input */}
              {selectedReason === "Other reason" && (
                <div className="space-y-2 p-3 rounded-lg bg-gray-50">
                  <Label htmlFor="other-reason" className="text-sm font-medium">
                    Please provide details
                  </Label>
                  <Textarea
                    id="other-reason"
                    placeholder="Tell us more about your reason..."
                    value={otherReasonDetail}
                    onChange={(e) => setOtherReasonDetail(e.target.value)}
                    className="border-border resize-none"
                    rows={4}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setError(null);
                  }}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !selectedReason}
                  className="flex-1 font-medium"
                  style={{
                    backgroundColor: selectedReason ? FAIRPREP_BRANDING.colors.primary : "#D1D5DB",
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
