"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Star,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    {
      id: 1,
      title: "Arrays and Strings Fundamentals",
      description:
        "Complete guide to understanding arrays and string manipulation techniques",
      type: "article",
      category: "Data Structures",
      difficulty: "Beginner",
      duration: "15 min",
      rating: 4.8,
      students: 1200,
    },
    {
      id: 2,
      title: "Dynamic Programming Masterclass",
      description:
        "Learn dynamic programming from basic concepts to advanced optimization techniques",
      type: "video",
      category: "Algorithms",
      difficulty: "Advanced",
      duration: "2h 30min",
      rating: 4.9,
      students: 850,
    },
    {
      id: 3,
      title: "Binary Trees and BST Guide",
      description:
        "Interactive tutorial covering binary trees, BST operations, and tree traversals",
      type: "interactive",
      category: "Data Structures",
      difficulty: "Intermediate",
      duration: "45 min",
      rating: 4.7,
      students: 950,
    },
    {
      id: 4,
      title: "System Design Interview Prep",
      description:
        "Comprehensive system design concepts for technical interviews",
      type: "article",
      category: "Interview Prep",
      difficulty: "Advanced",
      duration: "1h 15min",
      rating: 4.8,
      students: 2100,
    },
    {
      id: 5,
      title: "Graph Algorithms Cheat Sheet",
      description:
        "Quick reference for BFS, DFS, Dijkstra, and other essential graph algorithms",
      type: "cheatsheet",
      category: "Algorithms",
      difficulty: "Intermediate",
      duration: "8 min",
      rating: 4.6,
      students: 1800,
    },
    {
      id: 6,
      title: "Big O Notation Explained",
      description:
        "Understanding time and space complexity with real examples and visualizations",
      type: "video",
      category: "Computer Science",
      difficulty: "Beginner",
      duration: "25 min",
      rating: 4.9,
      students: 3200,
    },
  ];

  const collections = [
    {
      title: "Interview Preparation Track",
      description:
        "Complete roadmap for technical interviews including data structures, algorithms, and system design",
      resources: 24,
      duration: "40 hours",
      level: "All Levels",
    },
    {
      title: "Algorithm Mastery",
      description:
        "Deep dive into advanced algorithms including dynamic programming, graph theory, and optimization",
      resources: 18,
      duration: "28 hours",
      level: "Advanced",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      case "interactive":
        return <Sparkles className="h-4 w-4" />;
      case "cheatsheet":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

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

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="full-screen-container">
      <Navbar isAuthenticated={true} />

      <div className="w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Learn And <span className="gradient-text">Explore</span>
          </h1>
          <p className="text-muted-foreground">
            Dive into the world of Computer Science And Technology
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 bg-background">
          <div className="relative max-w-2xl flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Powered by AI – Get curated resources for anything you search."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Take Quiz Button */}
            <Link href="/quiz" passHref>
              <Button className="font-semibold">Take Quiz</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-8 ">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="data-structures">Data Structure</TabsTrigger>
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
            <TabsTrigger value="interview-prep">Interview Prep</TabsTrigger>
            <TabsTrigger value="computer-science">Computer Science</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer group bg-background"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(resource.type)}
                        <Badge
                          variant="outline"
                          className={getDifficultyColor(resource.difficulty)}
                        >
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{resource.students}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Collections */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collections.map((collection, index) => (
                  <Card
                    key={index}
                    className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span>{collection.title}</span>
                      </CardTitle>
                      <CardDescription>
                        {collection.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{collection.resources} resources</span>
                        <span>{collection.duration}</span>
                        <Badge variant="outline">{collection.level}</Badge>
                      </div>
                      <Button className="w-full font-semibold">
                        <Sparkles className="mr-2 h-4 w-4 " />
                        Explore Collection
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data-structures">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((r) => r.category === "Data Structures")
                .map((resource) => (
                  <Card
                    key={resource.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(resource.type)}
                          <Badge
                            variant="outline"
                            className={getDifficultyColor(resource.difficulty)}
                          >
                            {resource.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{resource.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{resource.students}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Access Resource
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
