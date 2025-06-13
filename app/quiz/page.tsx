"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Play,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Trophy,
  BookOpen,
  Code,
  Database,
  Cpu,
  Globe,
  Timer,
  Users,
  Star,
  Target,
} from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // in minutes
  totalQuestions: number;
  maxMarks: number;
  instructions: string[];
  icon: React.ReactNode;
}

interface Question {
  id: number;
  type: "mcq" | "coding" | "descriptive";
  question: string;
  options?: string[];
  correctAnswer?: number | string;
  marks: number;
  explanation?: string;
}

type QuizStep = "selection" | "introduction" | "quiz" | "results";

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<QuizStep>("selection");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const quizzes: Quiz[] = [
    {
      id: "data-structures",
      title: "Data Structures Fundamentals",
      description:
        "Test your knowledge of arrays, linked lists, stacks, queues, and trees",
      category: "Data Structures",
      difficulty: "Intermediate",
      duration: 30,
      totalQuestions: 15,
      maxMarks: 100,
      icon: <Database className="h-6 w-6" />,
      instructions: [
        "Read each question carefully before answering",
        "You can navigate between questions using the navigation buttons",
        "All questions are mandatory",
        "Time limit is strictly enforced",
        "Once submitted, answers cannot be changed",
      ],
    },
    {
      id: "algorithms",
      title: "Algorithm Analysis",
      description:
        "Comprehensive test on sorting, searching, and algorithm complexity",
      category: "Algorithms",
      difficulty: "Advanced",
      duration: 45,
      totalQuestions: 20,
      maxMarks: 150,
      icon: <Cpu className="h-6 w-6" />,
      instructions: [
        "Focus on time and space complexity analysis",
        "Code snippets may be provided for analysis",
        "Partial marking available for coding questions",
        "Calculator is not allowed",
        "Show your work for descriptive answers",
      ],
    },
    {
      id: "web-development",
      title: "Web Development Basics",
      description:
        "HTML, CSS, JavaScript fundamentals and modern web technologies",
      category: "Web Development",
      difficulty: "Beginner",
      duration: 25,
      totalQuestions: 12,
      maxMarks: 80,
      icon: <Globe className="h-6 w-6" />,
      instructions: [
        "Covers HTML5, CSS3, and ES6+ JavaScript",
        "Some questions include code snippets",
        "Focus on best practices and modern standards",
        "No external resources allowed",
        "Submit before time runs out",
      ],
    },
    {
      id: "system-design",
      title: "System Design Principles",
      description:
        "Scalability, databases, caching, and distributed systems concepts",
      category: "System Design",
      difficulty: "Advanced",
      duration: 60,
      totalQuestions: 18,
      maxMarks: 120,
      icon: <BookOpen className="h-6 w-6" />,
      instructions: [
        "Think about real-world scalable systems",
        "Consider trade-offs in your answers",
        "Diagrams may be helpful for descriptive questions",
        "Focus on practical implementation",
        "Time management is crucial",
      ],
    },
  ];

  const sampleQuestions: Question[] = [
    {
      id: 1,
      type: "mcq",
      question:
        "What is the time complexity of inserting an element at the beginning of an array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      marks: 5,
      explanation:
        "Inserting at the beginning requires shifting all existing elements one position to the right, making it O(n).",
    },
    {
      id: 2,
      type: "mcq",
      question:
        "Which data structure uses LIFO (Last In, First Out) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      marks: 5,
      explanation:
        "Stack follows LIFO principle where the last element inserted is the first one to be removed.",
    },
    {
      id: 3,
      type: "descriptive",
      question:
        "Explain the difference between BFS and DFS traversal algorithms. When would you use each?",
      marks: 10,
      explanation:
        "BFS explores level by level and is good for shortest path problems. DFS goes deep first and is good for topological sorting and detecting cycles.",
    },
    {
      id: 4,
      type: "coding",
      question: `Write a function to reverse a linked list iteratively.

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    # Your code here
    pass`,
      marks: 15,
      explanation:
        "Use three pointers: prev, current, and next to reverse the links between nodes.",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      case "Advanced":
        return "bg-red-500/10 text-red-600 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeRemaining > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, timeRemaining, quizCompleted]);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentStep("introduction");
  };

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      setTimeRemaining(selectedQuiz.duration * 60);
      setQuizStarted(true);
      setCurrentStep("quiz");
    }
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = useCallback(() => {
    setQuizCompleted(true);
    setQuizStarted(false);

    // Calculate score
    let totalScore = 0;
    sampleQuestions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (question.type === "mcq" && question.correctAnswer !== undefined) {
        if (parseInt(userAnswer) === question.correctAnswer) {
          totalScore += question.marks;
        }
      } else if (userAnswer && userAnswer.trim().length > 10) {
        totalScore += Math.floor(question.marks * 0.7); // 70% credit for attempt
      }
    });

    setScore(totalScore);
    setCurrentStep("results");
  }, [answers]);

  const getScoreGrade = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { grade: "A+", color: "text-green-600" };
    if (percentage >= 80) return { grade: "A", color: "text-green-500" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-500" };
    if (percentage >= 60) return { grade: "C", color: "text-yellow-500" };
    return { grade: "F", color: "text-red-500" };
  };

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / sampleQuestions.length) * 100;
  const { grade, color } = selectedQuiz
    ? getScoreGrade(score, selectedQuiz.maxMarks)
    : { grade: "F", color: "text-red-500" };

  return (
    <div className="full-screen-container">
      <Navbar isAuthenticated={true} />

      <div className="w-full px-6 py-8 min-h-screen">
        {currentStep === "selection" && (
          <>
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Button>
              <h1 className="text-3xl font-bold mb-2">
                Interactive <span className="gradient-text">Quizzes</span>
              </h1>
              <p className="text-muted-foreground">
                Test your knowledge with comprehensive quizzes across different
                topics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className="hover:shadow-lg transition-all cursor-pointer group bg-background border-2 hover:border-primary/20"
                  onClick={() => handleQuizSelect(quiz)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {quiz.icon}
                        </div>
                        <Badge
                          variant="outline"
                          className={getDifficultyColor(quiz.difficulty)}
                        >
                          {quiz.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {quiz.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Timer className="h-4 w-4" />
                            <span>{quiz.duration} min</span>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Target className="h-4 w-4" />
                            <span>{quiz.totalQuestions} questions</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Star className="h-4 w-4" />
                          <span>{quiz.maxMarks} marks</span>
                        </div>
                      </div>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground font-semibold">
                        <Play className="mr-2 h-4 w-4 " />
                        Start Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {currentStep === "introduction" && selectedQuiz && (
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep("selection")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quiz Selection
            </Button>

            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full text-primary">
                    {selectedQuiz.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl">{selectedQuiz.title}</CardTitle>
                <CardDescription className="text-lg">
                  {selectedQuiz.description}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>Quiz Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duration:</span>
                    <Badge variant="outline">
                      {selectedQuiz.duration} minutes
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Questions:</span>
                    <Badge variant="outline">
                      {selectedQuiz.totalQuestions}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Marks:</span>
                    <Badge variant="outline">{selectedQuiz.maxMarks}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <Badge
                      variant="outline"
                      className={getDifficultyColor(selectedQuiz.difficulty)}
                    >
                      {selectedQuiz.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Instructions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedQuiz.instructions.map((instruction, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center font-semibold">
              <Button size="lg" onClick={handleStartQuiz}>
                <Play className="mr-2 h-5 w-5" />
                Start Quiz Now
              </Button>
            </div>
          </div>
        )}

        {currentStep === "quiz" && selectedQuiz && currentQuestion && (
          <div className="max-w-4xl mx-auto">
            {/* Quiz Header */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold">
                      {selectedQuiz.title}
                    </h2>
                    <Badge variant="outline">
                      Question {currentQuestionIndex + 1} of{" "}
                      {sampleQuestions.length}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span
                        className={
                          timeRemaining < 300 ? "text-red-500 font-medium" : ""
                        }
                      >
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {currentQuestion.question}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary"
                  >
                    {currentQuestion.marks} marks
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {currentQuestion.type === "mcq" && currentQuestion.options && (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={(value) =>
                      handleAnswerChange(currentQuestion.id, value)
                    }
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50"
                      >
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {(currentQuestion.type === "descriptive" ||
                  currentQuestion.type === "coding") && (
                  <div className="space-y-4">
                    {currentQuestion.type === "coding" && (
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                        {currentQuestion.question
                          .split("\n")
                          .slice(1)
                          .join("\n")}
                      </div>
                    )}
                    <Textarea
                      placeholder={
                        currentQuestion.type === "coding"
                          ? "Write your code here..."
                          : "Write your answer here..."
                      }
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(currentQuestion.id, e.target.value)
                      }
                      className="min-h-[200px]"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {sampleQuestions.map((_, index) => (
                  <Button
                    key={index}
                    variant={
                      index === currentQuestionIndex ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-10 h-10 ${
                      answers[sampleQuestions[index].id]
                        ? "bg-green-600 border-green-300"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>

              {currentQuestionIndex === sampleQuestions.length - 1 ? (
                <Button
                  onClick={handleSubmitQuiz}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}

        {currentStep === "results" && selectedQuiz && (
          <div className="max-w-4xl mx-auto text-center">
            <Card className="mb-8">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div className="p-6 bg-primary/10 rounded-full">
                    <Trophy className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-3xl mb-2">Quiz Completed!</CardTitle>
                <CardDescription className="text-lg">
                  {selectedQuiz.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2 gradient-text">
                    {score}
                  </div>
                  <div className="text-xl text-muted-foreground mb-4">
                    out of {selectedQuiz.maxMarks} marks
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-2xl px-4 py-2 ${color.replace(
                      "text-",
                      "border-"
                    )}`}
                  >
                    Grade: <span className={color}>{grade}</span>
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round((score / selectedQuiz.maxMarks) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Score Percentage
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {Object.keys(answers).length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Questions Attempted
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {formatTime(selectedQuiz.duration * 60 - timeRemaining)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Time Taken
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep("selection");
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                  setSelectedQuiz(null);
                  setQuizCompleted(false);
                  setScore(0);
                }}
              >
                Take Another Quiz
              </Button>
              <Button onClick={() => router.back()}>Back to Resources</Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
