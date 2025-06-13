import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Zap,
  Target,
  Heart,
  Globe,
  Star,
  CheckCircle,
  HelpCircle,
  CodeIcon,
  BotIcon,
  LanguagesIcon,
  AlertTriangleIcon,
  VideoIcon,
  ShieldCheckIcon,
  MessageCircleIcon,
  HelpCircleIcon,
  MoonIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  const features = [
    {
      title: "Real-time Collaboration",
      description:
        "Multiple users can collaboratively code on the same problem in real-time coding rooms.",
      icon: CodeIcon,
    },
    {
      title: "AI Code Assistance",
      description:
        "Leverage AI to understand, refactor, or generate code suggestions instantly.",
      icon: BotIcon,
    },
    {
      title: "Multi-language Support",
      description:
        "Work in your favorite language — from Python to JavaScript, all in one place.",
      icon: LanguagesIcon,
    },
    {
      title: "Smart Error Explanations",
      description:
        "Get instant feedback and human-like explanations for errors in your code using AI.",
      icon: AlertTriangleIcon,
    },
    {
      title: "Voice & Video Chat",
      description:
        "Talk with your peers while coding using integrated voice and video chat.",
      icon: VideoIcon,
    },
    {
      title: "Secure Authentication",
      description:
        "Sign in via Google or GitHub using Firebase Auth with robust session handling.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Real-time Text Messaging",
      description:
        "Chat live with collaborators using an integrated real-time messaging system.",
      icon: MessageCircleIcon,
    },
    {
      title: "Skill Quizzes",
      description:
        "Take interactive quizzes to reinforce algorithm concepts and track progress.",
      icon: HelpCircleIcon,
    },
    {
      title: "Light & Dark Theme",
      description:
        "Switch seamlessly between light and dark mode for a comfortable coding experience.",
      icon: MoonIcon,
    },
  ];

  const testimonials = [
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

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Problems Solved" },
    { number: "500+", label: "Coding Challenges" },
    { number: "98%", label: "User Satisfaction" },
  ];

  const faqs = [
    {
      question: "What makes CodeCollab different from other coding platforms?",
      answer:
        "CodeCollab combines AI-powered learning with real-time collaboration features. You can practice coding problems while getting intelligent hints and work together with other developers in live sessions.",
    },
    {
      question: "Is CodeCollab suitable for beginners?",
      answer:
        "Absolutely! We have problems ranging from beginner to advanced levels. Our AI-powered hints system helps beginners learn step by step, while our community provides support and guidance.",
    },
    {
      question: "Can I use CodeCollab for interview preparation?",
      answer:
        "Yes! CodeCollab is specifically designed to help with technical interview preparation. We have a comprehensive collection of interview-style problems with detailed explanations and multiple solution approaches.",
    },
    {
      question: "What programming languages are supported?",
      answer:
        "We support all major programming languages including Python, JavaScript, Java, C++, C#, Go, Rust, and many more. You can switch between languages for any problem.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, CodeCollab is optimized for web browsers on desktop and tablet devices. We're working on a dedicated mobile app that will be available soon.",
    },
    {
      question: "How does the AI-powered hint system work?",
      answer:
        "Our AI analyzes your code in real-time and provides contextual hints based on your current approach. It can suggest optimizations, point out potential issues, and guide you toward better solutions without giving away the answer.",
    },
  ];

  const values = [
    {
      icon: CheckCircle,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from our platform features to user experience.",
      bg: "bg-green-500/10",
      color: "text-green-500",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a supportive community where developers help each other grow and succeed.",
      bg: "bg-blue-500/10",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Continuously innovating with AI-powered features to enhance the learning experience.",
      bg: "bg-purple-500/10",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="full-screen-container">
      <Navbar isAuthenticated={true} />

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              To empower developers worldwide by providing an interactive,
              collaborative platform where learning code becomes an engaging
              social experience. We believe that the best learning happens when
              developers work together.
            </p>
            <div className="flex items-center justify-center space-x-8 text-center">
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <span className="font-semibold">Learn Together</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="font-semibold">Grow Together</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-blue-500" />
                <span className="font-semibold">Code Together</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20 bg-background">
        <div className="w-full px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16">
        <div className="w-full px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Platform <span className="gradient-text">Features</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful features that make CodeCollab the ultimate
              platform for collaborative coding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Coder's <span className="gradient-text">Voice</span>
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="w-full px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about CodeCollab and how it can
              help you improve your coding skills
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg mb-4 px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pl-8 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="w-full px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at CodeCollab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <CardHeader>
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-lg ${value.bg} mb-4`}
                  >
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
