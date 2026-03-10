import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FAIRPREP_BRANDING } from "@shared/branding";

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: FAIRPREP_BRANDING.colors.pageBackground }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: FAIRPREP_BRANDING.colors.headerBackground,
          borderColor: FAIRPREP_BRANDING.colors.primary,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold"
            style={{ color: FAIRPREP_BRANDING.colors.text }}
          >
            Privacy Policy
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            style={{ color: FAIRPREP_BRANDING.colors.text }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div
          className="rounded-lg p-8 space-y-8"
          style={{
            backgroundColor: FAIRPREP_BRANDING.colors.cardBackground,
            color: FAIRPREP_BRANDING.colors.text,
          }}
        >
          {/* Title Section */}
          <div className="border-b pb-6" style={{ borderColor: FAIRPREP_BRANDING.colors.primary }}>
            <h2 className="text-3xl font-bold mb-2" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              Privacy Policy
            </h2>
            <p className="text-sm opacity-75">FairPrep by Dalsi Academy</p>
            <p className="text-xs opacity-60 mt-2">Effective Date: February 14, 2026</p>
          </div>

          {/* Company Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
                Company
              </p>
              <p>Dalsi Firm</p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
                App
              </p>
              <p>FairPrep by Dalsi Academy</p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
                Contact
              </p>
              <p>info@neodalsi.com</p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
                ABN
              </p>
              <p>[Insert ABN]</p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              1. Introduction
            </h3>
            <p className="leading-relaxed">
              Dalsi Firm ("we", "us", "our") operates FairPrep by Dalsi Academy ("App", "Services"), a study planning platform for Australian Year 11-12 students across all states and territories (NSW, VIC, QLD, WA, SA, TAS, ACT, NT). This Privacy Policy explains how we collect, use, store, share, and protect your information when you use our Services.
            </p>
            <p className="leading-relaxed">
              We are committed to protecting your privacy in accordance with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              2. Information We Collect
            </h3>
            
            <div className="space-y-2">
              <h4 className="font-semibold">2.1 Personal Information</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: FAIRPREP_BRANDING.colors.primary + "20" }}>
                      <th className="border p-2 text-left font-semibold">Data Type</th>
                      <th className="border p-2 text-left font-semibold">Required?</th>
                      <th className="border p-2 text-left font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Email address</td>
                      <td className="border p-2">✅ Yes</td>
                      <td className="border p-2">Login, notifications</td>
                    </tr>
                    <tr style={{ backgroundColor: FAIRPREP_BRANDING.colors.primary + "10" }}>
                      <td className="border p-2">Full name</td>
                      <td className="border p-2">❌ Optional</td>
                      <td className="border p-2">Personalization</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Date of birth</td>
                      <td className="border p-2">❌ Optional</td>
                      <td className="border p-2">Analytics</td>
                    </tr>
                    <tr style={{ backgroundColor: FAIRPREP_BRANDING.colors.primary + "10" }}>
                      <td className="border p-2">School name</td>
                      <td className="border p-2">❌ Optional</td>
                      <td className="border p-2">State content</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Phone number</td>
                      <td className="border p-2">❌ Optional</td>
                      <td className="border p-2">SMS (opt-in)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2.2 Study Data (Your Educational Records)</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Study session duration (per subject)</li>
                <li>SAC/practice exam scores (user-entered)</li>
                <li>Assessment calendar events</li>
                <li>Goal targets (weekly/monthly/term)</li>
                <li>ATAR/Score predictions generated (VTAC/UAC/QTAC/TISC/SATAC/TASC)</li>
              </ul>
              <p className="text-sm italic opacity-75 mt-2">Note: Study data belongs to you. We only store it for App functionality.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2.3 Technical & Usage Data</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Device type/model (iOS/Android)</li>
                <li>Operating system version</li>
                <li>IP address (anonymized for location)</li>
                <li>App version</li>
                <li>Crash reports</li>
                <li>Feature usage patterns (aggregate only)</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              3. How We Collect Information
            </h3>
            
            <div className="space-y-2">
              <h4 className="font-semibold">3.1 Direct Collection</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Account registration (email/name)</li>
                <li>Manual data entry (study hours, SAC scores)</li>
                <li>Settings/preferences</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3.2 Automatic Collection</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Cookies/session data (App analytics)</li>
                <li>Device information</li>
                <li>Usage patterns (which features used)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3.3 Third Parties</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Stripe (payment processing - PCI compliant)</li>
                <li>Supabase (database - Australian servers)</li>
                <li>Firebase (push notifications - opt-in)</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              4. How We Use Your Information
            </h3>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>App Functionality: Login, store goals, predictions</li>
              <li>Notifications: Reminders, goal alerts (opt-in)</li>
              <li>Analytics: Usage patterns, crash reporting</li>
              <li>Marketing: Email communications (opt-in only)</li>
              <li>Support: Issue diagnosis and resolution</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              5. Information Sharing (Strictly Limited)
            </h3>
            
            <div className="space-y-2">
              <h4 className="font-semibold">5.1 We NEVER Sell Your Data</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>❌ NO data sold to marketers</li>
                <li>❌ NO data sold to third parties</li>
                <li>❌ NO data used for advertising</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">5.2 Service Providers Only (Data Processors)</h4>
              <p className="opacity-90">We share data only with trusted service providers under strict contracts:</p>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Supabase: Database storage (Sydney, AU)</li>
                <li>Stripe: Payments (AU servers, PCI DSS Level 1)</li>
                <li>Firebase: Notifications (Google Cloud AU, opt-in)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">5.3 Legal Requirements</h4>
              <p className="opacity-90">Data disclosed only if required by law: court order, subpoena, or law enforcement request.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              6. Data Storage & Security
            </h3>
            
            <div className="space-y-2">
              <h4 className="font-semibold">6.1 Storage Location</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>✅ 100% AUSTRALIAN SERVERS</li>
                <li>✅ Supabase Sydney region</li>
                <li>✅ No overseas data transfers</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">6.2 Security Measures</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>🔒 Data encryption (AES-256 at rest)</li>
                <li>🔒 TLS 1.3 encryption (in transit)</li>
                <li>🔒 Row-Level Security (your data isolated)</li>
                <li>🔒 Password hashing (bcrypt)</li>
                <li>🔒 Regular security audits</li>
                <li>🔒 2FA available (premium)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">6.3 Data Retention</h4>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Account active: Indefinite (until deletion)</li>
                <li>Inactive 24 months: Optional deletion notice</li>
                <li>Deleted accounts: Permanent erasure within 30 days</li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              7. Your Privacy Rights (Australian Privacy Principles)
            </h3>
            <p className="opacity-90">Under APPs, you have these rights:</p>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Access: Email info@neodalsi.com (30 days response)</li>
              <li>Correction: Edit in App settings (instant)</li>
              <li>Deletion: "Delete Account" in settings (30 days)</li>
              <li>Portability: "Export Data" button (CSV download)</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              8. Children's Privacy
            </h3>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Intended Age: 13 years and older</li>
              <li>Under 18: Parental consent recommended</li>
              <li>No COPPA compliance required (Australian jurisdiction)</li>
            </ul>
          </div>

          {/* Section 9 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              9. Cookies & Tracking
            </h3>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>✅ No third-party cookies</li>
              <li>✅ No advertising trackers</li>
              <li>✅ Minimal first-party analytics only</li>
              <li>✅ Full opt-out available</li>
            </ul>
          </div>

          {/* Section 10 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              10. Changes to Privacy Policy
            </h3>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Notice: Posted in-app + email (major changes)</li>
              <li>Continued use = acceptance</li>
              <li>Effective date updated above</li>
            </ul>
          </div>

          {/* Section 11 */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              11. Contact Information
            </h3>
            <div className="space-y-1 opacity-90">
              <p><strong>Dalsi Firm - Privacy Officer</strong></p>
              <p>FairPrep by Dalsi Academy</p>
              <p>Email: info@neodalsi.com</p>
              <p>ABN: [Insert ABN]</p>
              <p>Address: [Insert Business Address]</p>
              <p className="mt-2">Complaints: Contact us first. If unsatisfied, contact Office of the Australian Information Commissioner (OAIC).</p>
            </div>
          </div>

          {/* Section 12 */}
          <div
            className="rounded-lg p-6 space-y-3"
            style={{ backgroundColor: FAIRPREP_BRANDING.colors.primary + "15" }}
          >
            <h3 className="text-xl font-bold" style={{ color: FAIRPREP_BRANDING.colors.primary }}>
              12. Mandatory User Acknowledgment
            </h3>
            <p className="font-semibold">BY USING FAIRPREP BY DALSI ACADEMY, YOU ACKNOWLEDGE:</p>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>✅ We collect minimal personal data (email + optional info)</li>
              <li>✅ Study data belongs to YOU (we just store it)</li>
              <li>✅ Data stored 100% in Australia</li>
              <li>✅ No data selling - EVER</li>
              <li>✅ You can delete everything anytime</li>
              <li>✅ Full privacy rights under Australian law</li>
            </ul>
          </div>

          {/* Last Updated */}
          <div className="border-t pt-6 text-center text-sm opacity-75">
            <p>Last Updated: February 14, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
