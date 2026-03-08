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
        style={{ backgroundColor: FAIRPREP_BRANDING.colors.background }}
      >
        <div className="text-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary mx-auto"
            style={{ borderTopColor: FAIRPREP_BRANDING.colors.primary }}
          />
        </div>
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
                Request Confirmed
              </h1>
            </div>
          </div>
        </div>

        {/* Success Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2
                className="h-16 w-16"
                style={{ color: FAIRPREP_BRANDING.colors.primary }}
              />
            </div>
            <CardTitle className="text-2xl">Your Delete Request is Captured</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Success Message */}
            <div
              className="p-4 rounded-lg text-center"
              style={{
                backgroundColor: "#ECFDF5",
                borderLeft: `4px solid ${FAIRPREP_BRANDING.colors.primary}`,
              }}
            >
              <p className="text-sm font-medium text-green-800">
                Your data will be deleted shortly. We will process your request within 30 days as per data protection regulations.
              </p>
            </div>

            {/* Summary Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Request Summary</h3>

              <div className="space-y-3 p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <span className="text-sm font-semibold">{user?.email}</span>
                </div>

                <div className="border-t border-gray-200" />

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Reason:</span>
                  <span className="text-sm font-semibold text-right max-w-xs">
                    {confirmationData?.reason || "Not specified"}
                  </span>
                </div>

                {confirmationData?.otherReasonDetail && (
                  <>
                    <div className="border-t border-gray-200" />
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-600">Details:</span>
                      <span className="text-sm text-right max-w-xs">
                        {confirmationData.otherReasonDetail}
                      </span>
                    </div>
                  </>
                )}

                <div className="border-t border-gray-200" />

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Submitted:</span>
                  <span className="text-sm font-semibold">
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
            <div className="space-y-2 p-4 rounded-lg bg-blue-50">
              <h4 className="font-semibold text-sm text-blue-900">Important Notes:</h4>
              <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
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
              >
                Sign Out
              </Button>

              <Button
                onClick={handleNewRequest}
                className="flex-1 font-medium"
                style={{ backgroundColor: FAIRPREP_BRANDING.colors.primary }}
              >
                Return to Login
              </Button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-center text-muted-foreground">
              If you have any questions, please contact support@fairprep.io
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
