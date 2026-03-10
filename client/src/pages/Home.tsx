import { CheckCircle, BookOpen, Target, BarChart3, Users, Zap, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { FAIRPREP_BRANDING } from "@shared/branding";

export default function Home() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: BookOpen,
      title: "Smart Study Planning",
      description: "Organize your studies by subject, topic, and difficulty level with intelligent scheduling that adapts to your pace.",
    },
    {
      icon: Target,
      title: "Goal Setting & Tracking",
      description: "Set achievable study goals and track your progress with real-time analytics and performance metrics.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Visualize your learning journey with detailed charts showing study hours, SAC scores, and improvement trends.",
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations and ATAR/Score predictions based on your study patterns and assessment results.",
    },
    {
      icon: Users,
      title: "Collaborative Features",
      description: "Share study plans with classmates, compare progress, and motivate each other to achieve your goals.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is 100% Australian-hosted and encrypted. We never sell your information - guaranteed.",
    },
  ];

  const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

  const yearLevels = ["Year 11", "Year 12"];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: FAIRPREP_BRANDING.colors.pageBackground }}
    >
      {/* Header/Navigation */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: FAIRPREP_BRANDING.colors.headerBackground,
          borderColor: FAIRPREP_BRANDING.colors.primary,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={FAIRPREP_BRANDING.logoUrl}
              alt="FairPrep Logo"
              className="h-10 w-10 rounded-full"
            />
            <span
              className="text-xl font-bold"
              style={{ color: FAIRPREP_BRANDING.colors.text }}
            >
              FairPrep
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              Features
            </a>
            <a
              href="#coverage"
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              Coverage
            </a>
            <a
              href="#privacy"
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              Privacy
            </a>
          </nav>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/deleterequest")}
              style={{
                borderColor: FAIRPREP_BRANDING.colors.primary,
                color: FAIRPREP_BRANDING.colors.primary,
              }}
            >
              Delete Request
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/privacypolicy")}
              style={{
                borderColor: FAIRPREP_BRANDING.colors.primary,
                color: FAIRPREP_BRANDING.colors.primary,
              }}
            >
              Privacy Policy
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${FAIRPREP_BRANDING.colors.headerBackground} 0%, ${FAIRPREP_BRANDING.colors.pageBackground} 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-3">
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight"
              style={{ color: FAIRPREP_BRANDING.colors.primary }}
            >
              Master Your Studies with FairPrep
            </h1>
            <p
              className="text-xl md:text-2xl"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              The ultimate study companion for Australian Year 11-12 students
            </p>
          </div>

          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
          >
            FairPrep helps you organize your study schedule, track your progress, and achieve your academic goals across all subjects and states.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fairprep', '_blank')}
              style={{
                backgroundColor: FAIRPREP_BRANDING.colors.primary,
                color: FAIRPREP_BRANDING.colors.text,
              }}
              className="hover:opacity-90"
            >
              Download app from PlayStore
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              style={{
                borderColor: FAIRPREP_BRANDING.colors.primary,
                color: FAIRPREP_BRANDING.colors.primary,
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: FAIRPREP_BRANDING.colors.primary }}
            >
              Powerful Features for Your Success
            </h2>
            <p
              className="text-lg"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              Everything you need to excel in your studies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-lg p-6 space-y-3 hover:shadow-lg transition-shadow"
                  style={{
                    backgroundColor: FAIRPREP_BRANDING.colors.cardBackground,
                    borderLeft: `4px solid ${FAIRPREP_BRANDING.colors.primary}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className="h-6 w-6"
                      style={{ color: FAIRPREP_BRANDING.colors.primary }}
                    />
                    <h3
                      className="font-bold text-lg"
                      style={{ color: FAIRPREP_BRANDING.colors.primary }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section id="coverage" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: FAIRPREP_BRANDING.colors.primary }}
            >
              Nationwide Coverage
            </h2>
            <p
              className="text-lg"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              Supporting students across all Australian states and territories
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* States */}
            <div
              className="rounded-lg p-8"
              style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
            >
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: FAIRPREP_BRANDING.colors.primary }}
              >
                All Australian States & Territories
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {states.map((state) => (
                  <div key={state} className="flex items-center gap-2">
                    <CheckCircle
                      className="h-5 w-5"
                      style={{ color: FAIRPREP_BRANDING.colors.success }}
                    />
                    <span
                      className="font-medium"
                      style={{ color: FAIRPREP_BRANDING.colors.text }}
                    >
                      {state}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Year Levels */}
            <div
              className="rounded-lg p-8"
              style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
            >
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: FAIRPREP_BRANDING.colors.primary }}
              >
                Year Levels
              </h3>
              <div className="space-y-4">
                {yearLevels.map((level) => (
                  <div key={level} className="flex items-center gap-3">
                    <CheckCircle
                      className="h-5 w-5"
                      style={{ color: FAIRPREP_BRANDING.colors.success }}
                    />
                    <span
                      className="font-medium text-lg"
                      style={{ color: FAIRPREP_BRANDING.colors.text }}
                    >
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: FAIRPREP_BRANDING.colors.primary }}
            >
              Why Choose FairPrep?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="rounded-lg p-8 space-y-4"
              style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
            >
              <div className="flex gap-4">
                <Shield
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: FAIRPREP_BRANDING.colors.primary }}
                />
                <div>
                  <h4
                    className="font-bold mb-2"
                    style={{ color: FAIRPREP_BRANDING.colors.primary }}
                  >
                    100% Australian Data
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                  >
                    All your data is stored on Australian servers with enterprise-grade encryption. Your privacy is our priority.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-8 space-y-4"
              style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
            >
              <div className="flex gap-4">
                <Zap
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: FAIRPREP_BRANDING.colors.primary }}
                />
                <div>
                  <h4
                    className="font-bold mb-2"
                    style={{ color: FAIRPREP_BRANDING.colors.primary }}
                  >
                    Instant Insights
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                  >
                    Get real-time analytics and AI-powered recommendations to optimize your study strategy.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-8 space-y-4"
              style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
            >
              <div className="flex gap-4">
                <Users
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: FAIRPREP_BRANDING.colors.primary }}
                />
                <div>
                  <h4
                    className="font-bold mb-2"
                    style={{ color: FAIRPREP_BRANDING.colors.primary }}
                  >
                    Community Driven
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                  >
                    Connect with thousands of students, share strategies, and motivate each other.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg p-8 space-y-4"
              style={{ backgroundColor: FAIRPREP_BRANDING.colors.cardBackground }}
            >
              <div className="flex gap-4">
                <Target
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: FAIRPREP_BRANDING.colors.primary }}
                />
                <div>
                  <h4
                    className="font-bold mb-2"
                    style={{ color: FAIRPREP_BRANDING.colors.primary }}
                  >
                    Goal-Oriented
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                  >
                    Set ATAR targets, track university preferences, and plan your future with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-lg p-12 text-center space-y-6"
            style={{
              backgroundColor: FAIRPREP_BRANDING.colors.cardBackground,
              borderLeft: `6px solid ${FAIRPREP_BRANDING.colors.success}`,
            }}
          >
            <h2
              className="text-3xl font-bold"
              style={{ color: FAIRPREP_BRANDING.colors.primary }}
            >
              Your Privacy is Protected
            </h2>
            <p
              className="text-lg"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              FairPrep is committed to protecting your data in accordance with Australian Privacy Principles. We never sell your information, and you can delete your account anytime.
            </p>
            <Button
              variant="outline"
              onClick={() => setLocation("/privacypolicy")}
              style={{
                borderColor: FAIRPREP_BRANDING.colors.primary,
                color: FAIRPREP_BRANDING.colors.primary,
              }}
            >
              Read Full Privacy Policy
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h2
              className="text-4xl font-bold"
              style={{ color: FAIRPREP_BRANDING.colors.primary }}
            >
              Ready to Transform Your Studies?
            </h2>
            <p
              className="text-lg"
              style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
            >
              Join thousands of Australian students already using FairPrep to achieve their academic goals.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fairprep', '_blank')}
            style={{
              backgroundColor: FAIRPREP_BRANDING.colors.primary,
              color: FAIRPREP_BRANDING.colors.text,
            }}
            className="hover:opacity-90"
          >
            Download app from PlayStore
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-8 px-4"
        style={{
          backgroundColor: FAIRPREP_BRANDING.colors.headerBackground,
          borderColor: FAIRPREP_BRANDING.colors.primary,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4
                className="font-bold mb-3"
                style={{ color: FAIRPREP_BRANDING.colors.primary }}
              >
                FairPrep
              </h4>
              <p
                className="text-sm"
                style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
              >
                Empowering Australian students to achieve their academic potential.
              </p>
            </div>
            <div>
              <h4
                className="font-bold mb-3"
                style={{ color: FAIRPREP_BRANDING.colors.primary }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="transition-opacity hover:opacity-80"
                    style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#coverage"
                    className="transition-opacity hover:opacity-80"
                    style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                  >
                    Coverage
                  </a>
                </li>
                <li>
                  <a
                    href="/privacypolicy"
                    className="transition-opacity hover:opacity-80"
                    style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="font-bold mb-3"
                style={{ color: FAIRPREP_BRANDING.colors.primary }}
              >
                Contact
              </h4>
              <p
                className="text-sm"
                style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
              >
                Email: info@neodalsi.com
              </p>
              <p
                className="text-sm"
                style={{ color: FAIRPREP_BRANDING.colors.textSecondary }}
              >
                Company: Dalsi Firm
              </p>
            </div>
          </div>

          <div
            className="border-t pt-6 text-center text-sm"
            style={{
              borderColor: FAIRPREP_BRANDING.colors.border,
              color: FAIRPREP_BRANDING.colors.textSecondary,
            }}
          >
            <p>&copy; 2026 FairPrep by Dalsi Academy. All rights reserved.</p>
            <p className="mt-2">Empowering Australian students to excel in their studies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
