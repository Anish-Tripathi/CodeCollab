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
import {
  CheckCircle,
  TrendingUp,
  Star,
  Users,
  Code,
  BookOpen,
  Trophy,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    {
      icon: CheckCircle,
      label: "Problems Solved",
      value: "47",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: TrendingUp,
      label: "Total Attempts",
      value: "89",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Star,
      label: "Current Streak",
      value: "12",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Users,
      label: "Rank",
      value: "2,453",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const recentProblems = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      status: "solved",
      timeAgo: "2 hours ago",
    },
    {
      title: "Add Two Numbers",
      difficulty: "Medium",
      status: "solved",
      timeAgo: "1 day ago",
    },
    {
      title: "Longest Substring",
      difficulty: "Medium",
      status: "attempted",
      timeAgo: "Not attempted",
    },
  ];

  const todayChallenges = [
    {
      title: "Valid Parentheses",
      difficulty: "Easy",
      points: "+10",
    },
    {
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      points: "+15",
    },
    {
      title: "Container With Most Water",
      difficulty: "Medium",
      points: "+25",
    },
  ];

  const quickActions = [
    {
      icon: Code,
      title: "Practice Problems",
      description: "Browse and solve coding challenges",
      href: "/problems",
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access study materials and tutorials",
      href: "/resources",
    },
    {
      icon: Trophy,
      title: "Take Quiz",
      description: "Test your skills with curated quizzes",
      href: "/quiz",
    },
  ];

  return (
    <div className="full-screen-container">
      <Navbar isAuthenticated={true} />

      <div className="w-full px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">Developer!</span>
          </h1>
          <p className="text-muted-foreground">
            Ready to tackle some coding challenges today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow bg-background"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Problems */}
          <Card className="lg:col-span-2 bg-background">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Problems</CardTitle>
                <CardDescription>Your latest coding challenges</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/problems">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProblems.map((problem, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          problem.status === "solved"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <div>
                        <h3 className="font-medium">{problem.title}</h3>
                        <div className="flex items-center space-x-2 text-sm mt-2">
                          <Badge
                            className={
                              problem.difficulty === "Easy"
                                ? "bg-green-800 text-white hover:bg-green-600"
                                : problem.difficulty === "Medium"
                                ? "bg-yellow-600 text-white hover:bg-yellow-600"
                                : "bg-red-800 text-white hover:bg-red-600"
                            }
                          >
                            {problem.difficulty}
                          </Badge>
                          <span>{problem.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        problem.status === "solved" ? "default" : "outline"
                      }
                    >
                      {problem.status === "solved" ? "Solved" : "Not Attempted"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Challenges */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Today's Challenges</CardTitle>
              <CardDescription>
                Daily challenges to keep you sharp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayChallenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-sm">{challenge.title}</h4>
                      <Badge
                        variant={
                          challenge.difficulty === "Easy"
                            ? "secondary"
                            : "default"
                        }
                        className="text-xs mt-1"
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {challenge.points}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link
                href="https://leetcode.com/problemset/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full mt-4">
                  <Trophy className="mr-2 h-4 w-4" />
                  Start Daily Challenge
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer group bg-background"
              >
                <CardContent className="p-6">
                  <Link href={action.href} className="block">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <action.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <Card className="mt-8 bg-background">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Easy Problems</span>
                  <span className="text-sm text-muted-foreground">32/150</span>
                </div>
                <Progress value={21} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Medium Problems</span>
                  <span className="text-sm text-muted-foreground">12/300</span>
                </div>
                <Progress value={4} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Hard Problems</span>
                  <span className="text-sm text-muted-foreground">3/200</span>
                </div>
                <Progress value={1.5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
