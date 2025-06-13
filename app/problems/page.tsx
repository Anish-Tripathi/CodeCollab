"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, CheckCircle, Circle, Clock } from "lucide-react";
import Link from "next/link";

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      topics: ["Array", "Hash Table"],
      acceptance: "55.7%",
      status: "solved",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      topics: ["Linked List", "Math"],
      acceptance: "38.2%",
      status: "solved",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      topics: ["String", "Sliding Window"],
      acceptance: "33.8%",
      status: "attempted",
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      topics: ["Array", "Binary Search"],
      acceptance: "36.2%",
      status: "not-attempted",
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      topics: ["String", "Dynamic Programming"],
      acceptance: "32.1%",
      status: "solved",
    },
    {
      id: 6,
      title: "Zigzag Conversion",
      difficulty: "Medium",
      topics: ["String"],
      acceptance: "42.3%",
      status: "not-attempted",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "solved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "attempted":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      problem.difficulty.toLowerCase() === difficultyFilter;
    const matchesTopic =
      topicFilter === "all" ||
      problem.topics.some((topic) =>
        topic.toLowerCase().includes(topicFilter.toLowerCase())
      );

    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setTopicFilter("all");
  };

  return (
    <div className="full-screen-container">
      <Navbar isAuthenticated={true} />

      <div className="w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Problem <span className="gradient-text">Deck</span>
          </h1>
          <p className="text-muted-foreground">
            Practice coding problems and improve your algorithmic thinking
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-background">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="linked">Linked List</SelectItem>
                  <SelectItem value="tree">Tree</SelectItem>
                  <SelectItem value="graph">Graph</SelectItem>
                  <SelectItem value="dynamic">Dynamic Programming</SelectItem>
                </SelectContent>
              </Select>

              {(searchQuery ||
                difficultyFilter !== "all" ||
                topicFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Problems Table Header */}
        <Card>
          <CardContent className="p-0">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-muted/20 font-medium text-sm">
              <div className="col-span-1">Status</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-2">Difficulty</div>
              <div className="col-span-3">Topics</div>
              <div className="col-span-1">Acceptance</div>
            </div>

            {/* Problems List */}
            <div className="divide-y bg-background">
              {filteredProblems.map((problem) => (
                <Link key={problem.id} href={`/editor/${problem.id}`}>
                  <div className="p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-1 flex items-center">
                        {getStatusIcon(problem.status)}
                      </div>

                      <div className="md:col-span-5">
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {problem.title}
                        </h3>
                      </div>

                      <div className="sm:col-span-2">
                        <Badge
                          className={
                            problem.difficulty === "Easy"
                              ? "bg-green-700 text-white hover:bg-green-600"
                              : problem.difficulty === "Medium"
                              ? "bg-yellow-500 text-white hover:bg-yellow-600"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>

                      <div className="md:col-span-3">
                        <div className="flex flex-wrap gap-1">
                          {problem.topics.map((topic, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-1 text-sm text-muted-foreground">
                        {problem.acceptance}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No problems found matching your criteria.
            </p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
