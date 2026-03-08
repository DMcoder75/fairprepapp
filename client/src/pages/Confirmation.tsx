import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useSupabaseAuthContext } from "@/contexts/SupabaseAuthContext";
import { FAIRPREP_BRANDING } from "@shared/branding";
import { signOut } from "@/lib/supabase";

interface ConfirmationState {
  reason: string;
  otherReasonDetail?: string;
}

export default function Confirmation() {
  const [, setLocation] = useLocation();
  const { user, loading: authLoading } = useSupabaseAuthContext();
  const [confirmationData, setConfirmationData] = useState<ConfirmationState | null>(null);

  // Get state from navigation
  useEffect(() => {
    // Try to get state from sessionStorage (fallback if location.state doesn't work)
    const savedState = sessionStorage.getItem("deleteRequestState");
    if (savedState) {
      setConfirmationData(JSON.parse(savedState));
      sessionStorage.removeItem("deleteRequestState");
    }
  }, []);

  // Redirect if not authenticated
  if (!authLoading && !user) {
    setLocation("/");
    return null;
  }

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: FAIRPREP_BRANDING.colors.pageBackground }}
      >
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300"
          style={{ borderTopColor: FAIRPREP_BRANDING.colors.primary }}
        />
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

  const handleNewRequest = async () => {
    await handleLogout();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: FAIRPREP_BRANDING.colors.pageBackground }}
    >
      {/* Header */}
      <div
        className="p-6"
        style={{ backgroundColor: FAIRPREP_BRANDING.colors.headerBackground }}
      >
        <div className="max-w-2xl mx-auto flex items-center">
          <div className="flex items-center gap-4">
            <img
              src={FAIRPREP_BRANDING.logoUrl}
              alt="Fairprep Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1
                className="text-xl font-bold"
                style={{ color: FAIRPREP_BRANDING.colors.text }}
              >
                Request Confirmed
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Success Card */}
          <Card
            className="border-0 shadow-lg"
            style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2
                  className="h-16 w-16"
                  style={{ color: FAIRPREP_BRANDING.colors.success }}
                />
              </div>
              <CardTitle
                className="text-2xl"
                style={{ color: FAIRPREP_BRANDING.colors.text }}
              >
                Your Delete Request is Captured
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Success Message */}
              <div
                className="p-4 rounded-lg text-center"
                style={{
                  backgroundColor: FAIRPREP_BRANDING.colors.success + "20",
                  borderLeft: `4px solid ${FAIRPREP_BRANDING.colors.success}`,
                }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: FAIRPREP_BRANDING.colors.success }}
                >
                  Your data will be deleted shortly. We will process your request within 30 days as per data protection regulations.
                </p>
              </div>

              {/* Summary Section */}
              <div className="space-y-4">
                <h3
                  className="font-semibold text-lg"
                  style={{ color: FAIRPREP_BRANDING.colors.text }}
                >
                  Request Summary
                </h3>

                <div
                  className="space-y-3 p-4 rounded-lg"
                  style={{ backgroundColor: FAIRPREP_BRANDING.colors.inputBackground }}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className="text-sm font-medium"
                      style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                    >
                      Email:
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: FAIRPREP_BRANDING.colors.text }}
                    >
                      {user?.email}
                    </span>
                  </div>

                  <div
                    style={{ borderTopColor: FAIRPREP_BRANDING.colors.border }}
                    className="border-t"
                  />

                  <div className="flex justify-between items-start">
                    <span
                      className="text-sm font-medium"
                      style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                    >
                      Reason:
                    </span>
                    <span
                      className="text-sm font-semibold text-right max-w-xs"
                      style={{ color: FAIRPREP_BRANDING.colors.text }}
                    >
                      {confirmationData?.reason || "Not specified"}
                    </span>
                  </div>

                  {confirmationData?.otherReasonDetail && (
                    <>
                      <div
                        style={{ borderTopColor: FAIRPREP_BRANDING.colors.border }}
                        className="border-t"
                      />
                      <div className="flex justify-between items-start">
                        <span
                          className="text-sm font-medium"
                          style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                        >
                          Details:
                        </span>
                        <span
                          className="text-sm text-right max-w-xs"
                          style={{ color: FAIRPREP_BRANDING.colors.text }}
                        >
                          {confirmationData.otherReasonDetail}
                        </span>
                      </div>
                    </>
                  )}

                  <div
                    style={{ borderTopColor: FAIRPREP_BRANDING.colors.border }}
                    className="border-t"
                  />

                  <div className="flex justify-between items-start">
                    <span
                      className="text-sm font-medium"
                      style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                    >
                      Submitted:
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: FAIRPREP_BRANDING.colors.text }}
                    >
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div
                className="space-y-2 p-4 rounded-lg"
                style={{
                  backgroundColor: FAIRPREP_BRANDING.colors.warning + "20",
                }}
              >
                <h4
                  className="font-semibold text-sm"
                  style={{ color: FAIRPREP_BRANDING.colors.warning }}
                >
                  Important Notes:
                </h4>
                <ul
                  className="text-xs space-y-1 list-disc list-inside"
                  style={{ color: FAIRPREP_BRANDING.colors.warning }}
                >
                  <li>Your account will be deactivated immediately</li>
                  <li>All personal data will be deleted within 30 days</li>
                  <li>This action cannot be undone</li>
                  <li>You will receive a confirmation email shortly</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex-1"
                  style={{
                    borderColor: FAIRPREP_BRANDING.colors.border,
                    color: FAIRPREP_BRANDING.colors.text,
                  }}
                >
                  Sign Out
                </Button>

                <Button
                  onClick={handleNewRequest}
                  className="flex-1 font-medium text-white"
                  style={{ backgroundColor: FAIRPREP_BRANDING.colors.primary }}
                >
                  Return to Login
                </Button>
              </div>

              {/* Footer Note */}
              <p
                className="text-xs text-center"
                style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
              >
                If you have any questions, please contact support@fairprep.io
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
