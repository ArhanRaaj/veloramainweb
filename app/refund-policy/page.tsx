import type { Metadata } from "next";
import { BadgeDollarSign, Lock, Shield, Check, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import legalConfig from "../config/sections/legal.json";
import type { LegalSection } from "../types/legal";

export const metadata: Metadata = {
  title: "Refund Policy | VeloraCloud",
  description:
    "Read VeloraCloud's Refund Policy: eligibility, how to request a refund, non-refundable items, and processing times.",
  alternates: { canonical: "https://veloracloud.space/refund-policy" },
};

const policy = legalConfig.refundPolicy;

const highlights = [
  { icon: Lock, title: "Secure Payments", description: "Refunds go back to your original payment method through secure channels." },
  { icon: Shield, title: "Clear Conditions", description: "The eligibility rules and exclusions are all listed on this page." },
  { icon: Check, title: "Simple Process", description: "Contact support within 24 hours of activation and we will review your request." },
];

// Split "2.1. Text 2.2. Text" into separate paragraphs so long clauses stay readable.
function splitClauses(content: string): string[] {
  return content.split(/\s(?=\d+\.\d+\.\s)/).map((c) => c.trim()).filter(Boolean);
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f]">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/vps/vps-hero-2.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/80 to-gray-50/40 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/95 dark:to-[#0a0b0f]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 card-primary px-6 py-3 rounded-full mb-6 border border-secondary">
              <BadgeDollarSign className="w-5 h-5 icon-text-primary" />
              <span className="icon-text-primary text-sm font-medium">{policy.title}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 orbitron-font">
              Fair Refunds, <span className="icon-text-primary">Clear Rules</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
              We want you to be happy with your server. Here is exactly when and how we issue refunds.
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {policy.lastUpdated}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-950/40 rounded-md p-6 border border-secondary transition-colors duration-300 hover:hover-gradient"
              >
                <div className="w-12 h-12 card-primary rounded-xl flex items-center justify-center mb-4 border border-secondary">
                  <Icon className="w-6 h-6 icon-text-primary" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{description}</p>
              </div>
            ))}
          </div>

          <article className="bg-white dark:bg-gray-950/40 border border-secondary rounded-md overflow-hidden">
            {policy.sections.map((section: LegalSection) => (
              <section
                key={section.title}
                className="p-6 sm:p-8 border-b border-secondary last:border-0 [content-visibility:auto] [contain-intrinsic-size:auto_200px]"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {splitClauses(section.content).map((clause, i) => (
                    <p key={i}>{clause}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions About Our Refund Policy?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">We&apos;re here to help! Contact our support team at:</p>
            <a
              href={`mailto:${policy.contactEmail}`}
              className="inline-flex items-center gap-2 button-primary text-button-primary px-6 py-3 rounded-lg font-medium transition-colors duration-300 border border-secondary hover:hover-gradient"
            >
              Contact Refund Team
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
