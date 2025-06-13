import Link from "next/link";
import { Code, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="w-full px-10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4  max-w-7xl mx-auto">
          {/* About */}
          <div className="space-y-6 md:col-span-1 px-5">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold gradient-text">
                CodeCollab
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              CodeCollab is your AI-powered platform to solve problems, prepare
              for interviews, and collaborate with peers in real-time. Whether
              you're a beginner or a pro, we help you level up your coding
              journey together.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:support@codecollab.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4 ml-10">
            <h2 className="font-semibold text-base">Platform</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/problems"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Problems
                </Link>
              </li>
              <li>
                <Link
                  href="https://leetcode.com/contest/"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Contests
                </Link>
              </li>
              <li>
                <Link
                  href="https://interview.leetcode.com/interview/"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Interview
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Quizes
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h2 className="font-semibold text-base">Support</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-foreground transition-colors "
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Contact</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Head Office:
                </span>
                <br />
                Office No. 712, 7th Floor, Trade Center, BKC, Mumbai,
                Maharashtra – 400051
              </li>
              <li>
                <span className="font-medium text-foreground">Helpline:</span>
                <br />
                +91 98765 43210
              </li>
              <li>
                <span className="font-medium text-foreground">Email:</span>
                <br />
                <a
                  href="mailto:support@codecollab.com"
                  className="hover:text-primary"
                >
                  support@codecollab.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-10 py-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} CodeCollab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
