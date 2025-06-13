import { useState, useEffect } from "react";
import {
  Shield,
  Search,
  Play,
  Bot,
  Users,
  Video,
  MessageCircle,
  Sparkles,
} from "lucide-react";

interface ProcessStepProps {
  step: { title: string; description: string };
  index: number;
  isVisible: boolean;

  showLine: boolean;
}

const ProcessStep = ({
  step,
  index,
  isVisible,
  showLine,
}: ProcessStepProps) => {
  const stepIcons: Record<number, any> = {
    0: Shield,
    1: Search,
    2: Play,
    3: Bot,
    4: Users,
    5: Video,
    6: MessageCircle,
    7: Sparkles,
  };

  const Icon = stepIcons[index];

  return (
    <div className="flex flex-col items-center relative">
      {/* Step Box */}
      <div
        className={`w-20 h-20 rounded-lg flex items-center justify-center mb-3 transition-all duration-600 ease-out transform ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100 bg-primary text-primary-foreground shadow-lg"
            : "translate-y-4 opacity-0 scale-95 bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Connecting Line Container */}
      {index < 7 && (
        <div className="absolute top-8 left-16 w-full h-px">
          {/* Background line */}
          <div className="w-full h-px bg-muted-foreground/20" />
          {/* Animated line */}
          <div
            className={`absolute left-0 top-0 h-px bg-primary transition-all duration-700 ease-out ${
              showLine ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>
      )}

      {/* Step Description */}
      <div
        className={`text-center max-w-20 transition-all duration-400 ${
          isVisible
            ? "text-foreground opacity-100"
            : "text-muted-foreground opacity-50"
        }`}
      >
        <h4 className="font-medium text-xs mb-1 leading-tight">{step.title}</h4>
        <p className="text-xs text-muted-foreground/70 leading-tight">
          {step.description}
        </p>
      </div>
    </div>
  );
};

const ProcessAnimation = () => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());

  const [completedLines, setCompletedLines] = useState<Set<number>>(new Set());
  const [animationStarted, setAnimationStarted] = useState(false);

  const steps: { title: string; description: string }[] = [
    { title: "Secure Login", description: "Join via Google/GitHub" },
    { title: "Explore Problems", description: "Browse challenges" },
    { title: "Select & Code", description: "Multi-language support" },
    { title: "AI Assistant", description: "Get smart suggestions" },
    { title: "Create Room", description: "Invite friends" },
    { title: "Voice/Video", description: "Real-time communication" },
    { title: "Live Chat", description: "Instant messaging" },
    { title: "Learn Together", description: "Collaborative coding" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            setAnimationStarted(true);

            const animateSteps = async () => {
              for (let i = 0; i < steps.length; i++) {
                // Slower box appearance
                setTimeout(() => {
                  setVisibleSteps((prev) => new Set([...prev, i]));
                }, i * 1800); // increased delay

                // Slower connecting line draw
                if (i < steps.length - 1) {
                  setTimeout(() => {
                    setCompletedLines((prev) => new Set([...prev, i]));
                  }, i * 1800 + 800); // slower line animation
                }
              }
            };

            animateSteps();
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("process-animation");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [animationStarted]);

  return (
    <section id="process-animation" className="py-16 overflow-hidden">
      <div className="w-full px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Your Coding <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From solo coding to collaborative mastery — here's how CodeCollab
            transforms your experience
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto relative">
          <div className="flex justify-between items-start relative px-12 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex justify-center">
                <ProcessStep
                  step={step}
                  index={index}
                  isVisible={visibleSteps.has(index)}
                  showLine={completedLines.has(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-primary/10 rounded-full">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium text-base">
              Start Your Journey Today
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessAnimation;
