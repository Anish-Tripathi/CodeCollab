"use client";

import { useState, useEffect } from "react";
import { Scale, Shield, FileText, Clock } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const sectionsData = [
  {
    id: "acceptance",
    title: "Terms Acceptance",
    content: `By accessing and using CodeCollab ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. CodeCollab is an AI-powered collaborative coding platform that provides real-time coding environments, voice/video communication, and intelligent code assistance.

If you do not agree to these terms, please do not use this service. These terms apply to all users, including browsers, vendors, customers, merchants, and content contributors.`,
  },
  {
    id: "description",
    title: "Service Description",
    content: `CodeCollab provides:

- Collaborative Coding Environment: Real-time multi-user code editing and execution.
- AI-Powered Assistance: Intelligent code suggestions, debugging help, and explanations.
- Communication Tools: Integrated voice and video chat for seamless collaboration.
- Multi-Language Support: Support for 15+ programming languages and frameworks.
- Session Management: Persistent coding sessions with automatic saving and version history.
- Educational Features: Coding challenges, tutorials, and skill assessment tools.

The service is offered on a subscription basis with free and premium tiers. Features may vary based on your subscription level.`,
  },
  {
    id: "accounts",
    title: "User Accounts",
    content: `To access certain features, you must register for an account. By registering, you agree to:

- Provide accurate, current, and complete information.
- Maintain and update your account information promptly.
- Keep your password and account secure.
- Accept all risks of unauthorized access to your account.

You are responsible for all activities under your account. Notify us immediately of any unauthorized use or security breach. CodeCollab is not liable for losses due to your failure to comply.

Age Requirements: Users must be at least 13 years old. Users aged 13-18 require parental consent.`,
  },
  {
    id: "usage",
    title: "User Policy",
    content: `You agree to use CodeCollab lawfully and in accordance with these Terms. Prohibited activities include:

- Violating any local, state, national, or international law.
- Sending unsolicited advertising or promotional material.
- Impersonating any person or entity.
- Restricting or inhibiting others' use of the Service.

Code and Content Restrictions:
- No uploading of malicious code, viruses, or harmful scripts.
- No sharing of code that violates intellectual property rights.
- No cryptocurrency mining or resource abuse.
- No attempts to reverse engineer or compromise AI systems.

Collaborative Conduct:
- Maintain respectful communication in voice/video chats.
- Do not harass, abuse, or harm other users.
- Respect others' work and intellectual property.
- Follow community guidelines for shared coding sessions.`,
  },
  {
    id: "ai-usage",
    title: "AI Services",
    content: `CodeCollab uses AI for code assistance, suggestions, and educational support. By using AI features, you agree:

AI Service Limitations:
- AI-generated code is provided "as is" without warranties.
- You must review and validate all AI-generated content.
- AI responses may not always be accurate or optimal.
- AI learns from anonymized usage patterns to improve.

Data Processing for AI:
- Your code may be processed to provide assistance.
- Personal data is not used for AI training without consent.
- Anonymized code snippets may improve AI capabilities.
- Opt-out of AI learning features in privacy settings.

Intellectual Property in AI Output:
- AI-generated code suggestions are not owned by CodeCollab.
- You retain rights to your original code and derivatives.
- CodeCollab does not claim ownership over user content.`,
  },
  {
    id: "privacy",
    title: "Privacy",
    content: `Our Privacy Policy details how we collect, use, and protect your information.

Data Collection:
- Account information (email, username, profile details).
- Usage analytics and session data.
- Code snippets and collaboration history.
- Communication logs from voice/video sessions (if enabled).

Data Usage:
- To provide and improve services.
- To facilitate collaboration and communication.
- To offer personalized AI assistance.
- To ensure platform security and prevent abuse.

Data Security:
- Data is encrypted in transit and at rest.
- Regular security audits and penetration testing.
- SOC 2 Type II compliance for enterprise customers.
- GDPR and CCPA compliance for applicable users.

Data Retention:
- Active account data is retained while your account is active.
- Deleted accounts are purged within 30 days.
- Backup data may be retained for up to 90 days.`,
  },
  {
    id: "subscription",
    title: "Subscriptions",
    content: `CodeCollab offers free and paid subscription plans.

Free Plan:
- Limited collaboration sessions (up to 4 users).
- Basic AI assistance.
- Standard support.
- 100MB storage per user.

Pro Plan ($9.99/month):
- Unlimited collaboration sessions (up to 20 users).
- Advanced AI features and priority processing.
- Priority support.
- 5GB storage per user.
- Advanced analytics and session history.

Enterprise Plan (Custom Pricing):
- Unlimited users and sessions.
- Custom AI model training.
- Dedicated support and SLA.
- Unlimited storage.
- Advanced security and compliance features.

Billing Terms:
- Billed monthly or annually.
- Fees are non-refundable except as required by law.
- Free trials may be offered at our discretion.
- Prices may change with 30 days' notice.`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: `CodeCollab's IP:
The Service, its content, features, and functionality are owned by CodeCollab and its licensors, protected by copyright, trademark, and other laws.

User Content:
- You retain rights to your code and content.
- You grant CodeCollab a limited license to host, display, and transmit your content.
- You may not claim ownership of AI-generated suggestions.

Collaborative Content:
- Code created in collaborative sessions belongs to participants.
- Participants determine ownership and licensing among themselves.
- CodeCollab does not mediate IP disputes.

Third-Party Content:
- Ensure you have rights to third-party code or content uploaded.
- CodeCollab responds to valid DMCA notices.
- Repeated violations may lead to account termination.`,
  },
  {
    id: "termination",
    title: "Termination",
    content: `Termination by You:
You may terminate your account via customer support or account deletion settings. Access ceases immediately upon termination.

Termination by Us:
We may terminate or suspend your account without notice for:
- Breach of Terms.
- Violation of Acceptable Use Policy.
- Non-payment of fees.
- Fraudulent or abusive behavior.
- Legal or regulatory requirements.

Effect of Termination:
- Surviving provisions remain in effect.
- Your data may be deleted.
- Outstanding payments remain due.
- Data export may be requested before termination.`,
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: `Service Disclaimers:
CodeCollab is provided "AS IS" and "AS AVAILABLE" without warranties of merchantability, fitness, or non-infringement.

AI Service Disclaimers:
- AI-generated code may contain errors or vulnerabilities.
- You must review and test AI suggestions.
- CodeCollab is not liable for consequences of AI-generated code.
- AI performance is not guaranteed.

Limitation of Liability:
CodeCollab and its affiliates are not liable for indirect, incidental, or consequential damages, including loss of profits or data.

Maximum Liability:
Our liability is limited to the amount you paid in the 12 months preceding the claim.`,
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    content: `Governing Law:
These Terms are governed by the laws of Delaware, USA, without regard to conflict of law provisions.

Dispute Resolution:
Disputes are settled by binding arbitration in Delaware, conducted in English, enforceable in any court.

Class Action Waiver:
Disputes are individual, not class actions or representative proceedings.

Exceptions:
Either party may seek injunctive relief to protect IP or confidential information.`,
  },
];

export default function TermsAndConditions() {
  const [selectedSection, setSelectedSection] = useState("acceptance");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const filteredSections = sectionsData.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar isAuthenticated={true} />
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Terms & <span className="gradient-text">Conditions</span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-4">
            Legal terms governing your use of CodeCollab's AI-powered
            collaborative coding platform
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last updated: June 12, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Version 2.1</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        <div
          className={`md:w-1/4 ${
            isMobileSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="sticky top-20">
            <div className="mb-4"></div>
            <div className=" rounded-lg border border-gray-800 p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    selectedSection === section.id
                      ? "bg-yellow-500 text-black"
                      : "text-gray-400 hover:bg-gray-800 hover:text-yellow-500"
                  }`}
                  onClick={() => {
                    setSelectedSection(section.id);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <button
            className="md:hidden mb-4 px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            {isMobileSidebarOpen ? "Hide Sections" : "Show Sections"}
          </button>

          {filteredSections.find(
            (section) => section.id === selectedSection
          ) ? (
            <div className=" p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-500">
                {
                  filteredSections.find(
                    (section) => section.id === selectedSection
                  )?.title
                }
              </h2>
              <div className="prose prose-invert text-gray-300 space-y-4">
                {filteredSections
                  .find((section) => section.id === selectedSection)
                  ?.content.split("\n")
                  .map((line, i) => {
                    if (line.startsWith("- ")) {
                      return (
                        <li key={i} className="ml-4 mb-2">
                          {line.substring(2)}
                        </li>
                      );
                    } else if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <h4
                          key={i}
                          className="font-semibold text-gray-100 mt-4 mb-2"
                        >
                          {line.replace(/\*\*/g, "")}
                        </h4>
                      );
                    } else if (line.trim()) {
                      return (
                        <p key={i} className="mb-4">
                          {line}
                        </p>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No content found for this section.</p>
          )}

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className=" p-6 rounded-lg border border-gray-800">
              <Shield className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className="font-semibold mb-2">Your Rights</h3>
              <p className="text-gray-400 text-sm">
                Understand your rights and protections as a user of our platform
              </p>
            </div>
            <div className=" p-6 rounded-lg border border-gray-800">
              <FileText className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className="font-semibold mb-2">Privacy Policy</h3>
              <p className="text-gray-400 text-sm">
                Learn how we collect, use, and protect your data
              </p>
            </div>
            <div className=" p-6 rounded-lg border border-gray-800">
              <Scale className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className="font-semibold mb-2">Score</h3>
              <p className="text-gray-400 text-sm">
                Review our full legal terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
