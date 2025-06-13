"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import ProcessAnimation from "./ProcessAnimation";
import Link from "next/link";
import { Star, ArrowRight, Users, Zap, Sparkles } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

type Problem = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  acceptance: string;
  solved: string;
};

const TypingAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const words = [
    "smart hints",
    "AI code review",
    "real-time collaboration",
    "fellow coders",
    "instant feedback",
    "interactive editors",
    "voice chat support",
    "auto-debugging tools",
  ];

  useEffect(() => {
    const word = words[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(word.slice(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, words]);

  return (
    <span className="text-primary font-mono">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function CodeCollabLanding() {
  const problems: Problem[] = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      acceptance: "55.7%",
      solved: "2.1M",
    },
    {
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      category: "Dynamic Programming",
      acceptance: "33.8%",
      solved: "800K",
    },
    {
      title: "Merge & Sorted Lists",
      difficulty: "Hard",
      category: "Linked List",
      acceptance: "36.2%",
      solved: "450K",
    },
    {
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stack",
      acceptance: "42.3%",
      solved: "1.8M",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Rachoddas Chanchad",
      role: "Software Engineer at Google",
      content:
        "CodeCollab transformed my interview preparation. The collaborative features helped me learn from other developers.",
      rating: 5,
    },
    {
      name: "Farhan Qureshi",
      role: "CS Student at MIT",
      content:
        "Amazing platform for learning algorithms. The AI hints are incredibly helpful when I get stuck.",
      rating: 4,
    },
    {
      name: "Raju Rastogi",
      role: "Full Stack Developer",
      content:
        "Love the real-time collaboration feature. It feels like pair programming with developers worldwide.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-5 md:py-32">
        <div className="absolute inset-0 " />
        <div className=" mx-auto px-6 relative">
          <div className="mx-auto max-w-5xl text-center mb-5">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Master Coding with{" "}
              <span className="gradient-text">CodeCollab</span>
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mt-4 mb-10 h-8">
              Practice coding problems with <TypingAnimation />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center font-semibold">
              <Link href="/login">
                <Button size="lg" className="text-sm px-6 py-4 font-semibold">
                  Explore Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm px-6 py-4"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>50K+ Developers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Real-time Sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Animation */}
      <ProcessAnimation />

      {/* Problems Preview Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Explore <span className="gradient-text">Problems</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Practice with a curated collection of coding challenges designed
              to improve your algorithmic thinking and problem-solving skills.
            </p>
          </div>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-primary/20 hover:border-l-primary"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-sm">
                          {problem.title}
                        </h3>
                        <Badge
                          className={
                            problem.difficulty === "Easy"
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : problem.difficulty === "Medium"
                              ? "bg-yellow-500 text-white hover:bg-yellow-600"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }
                        >
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline" className="border-primary/30">
                          {problem.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {problem.solved}
                      </span>
                      <span className="font-mono">{problem.acceptance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/login">
              <Button
                size="lg"
                className="px-6 py-4 text-sm font-semibold text-black"
              >
                View All Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Coders <span className="gradient-text">Voice</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of developers who have improved their coding skills
              with CodeCollab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 text-md leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start{" "}
            <span className="gradient-text"> Your Coding Journey</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg">
            Join our community of developers and start improving your coding
            skills today with collaborative learning and AI assistance.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="text-sm px-8 py-6 font-semibold text-black"
            >
              Get Started Free
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
