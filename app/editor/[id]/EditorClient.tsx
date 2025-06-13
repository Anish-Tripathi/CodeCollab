"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Settings,
  Maximize2,
  Users,
  Video,
  MessageCircle,
  Sparkles,
  Send,
  Copy,
  UserPlus,
  Camera,
  CameraOff,
  Mic,
  MicOff,
  PhoneOff,
  X,
  Plus,
  Monitor,
  Code2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  constraints: string[];
};

type TestCase = {
  input: string;
  expected: string;
};

type Message = {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
};

type EditorClientProps = {
  params: { id: string };
  problem: Problem;
  testCases: TestCase[];
};

export default function EditorClient({
  params,
  problem,
  testCases,
}: EditorClientProps) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    
}`);

  // Collaboration states
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [inVideoCall, setInVideoCall] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [newTestCase, setNewTestCase] = useState({ input: "", expected: "" });
  const [expandedTestCase, setExpandedTestCase] = useState<number | null>(null);

  // Video call states
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Chat states
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "System",
      content: "Welcome to the collaboration room!",
      timestamp: new Date(),
    },
  ]);

  // Active section state
  const [activeSection, setActiveSection] = useState<
    "problem" | "collaboration" | "editor"
  >("problem");

  const handleRunCode = () => {
    console.log("Running code...");
  };

  const handleSubmit = () => {
    console.log("Submitting solution...");
  };

  const handleAskAI = () => {
    console.log("Asking AI for help...");
  };

  const generateRoomId = () => {
    const id = Math.random().toString(36).substr(2, 9).toUpperCase();
    setRoomId(id);
    setIsHost(true);
    return id;
  };

  const handleCreateRoom = () => {
    const id = generateRoomId();
    setInVideoCall(true);
    setShowVideoDialog(false);
    setActiveSection("collaboration");
  };

  const handleJoinRoom = () => {
    if (joinRoomId.trim()) {
      setRoomId(joinRoomId);
      setInVideoCall(true);
      setShowVideoDialog(false);
      setIsHost(false);
      setActiveSection("collaboration");
    }
  };

  const handleLeaveRoom = () => {
    setInVideoCall(false);
    setRoomId("");
    setJoinRoomId("");
    setIsHost(false);
    setIsCameraOn(true);
    setIsMicOn(true);
    setIsScreenSharing(false);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        user: "You",
        content: chatMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setChatMessage("");
    }
  };

  const startCollaboration = () => {
    setIsCollaborating(true);
    setActiveSection("collaboration");
  };

  const stopCollaboration = () => {
    setIsCollaborating(false);
    setShowChat(false);
    setInVideoCall(false);
    setActiveSection("problem");
  };

  return (
    <div className="full-screen-container bg-background">
      <Navbar isAuthenticated={true} />

      {/* Editor Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Title + Difficulty */}
            <div className="flex items-center space-x-4 min-w-fit">
              <h1 className="text-xl font-bold">{problem.title}</h1>
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

            {/* Center: Section Navigation */}
            <div className="flex items-center space-x-2">
              <Button
                variant={activeSection === "problem" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("problem")}
              >
                <Code2 className="h-4 w-4 mr-2" />
                Problem
              </Button>
              <Button
                variant={
                  activeSection === "collaboration" ? "default" : "ghost"
                }
                size="sm"
                onClick={() => setActiveSection("collaboration")}
                disabled={!isCollaborating}
              >
                <Users className="h-4 w-4 mr-2" />
                Collaborate
              </Button>
              <Button
                variant={activeSection === "editor" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("editor")}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Editor
              </Button>
            </div>

            {/* Right: Language Selector + Icons */}
            <div className="flex items-center space-x-2 min-w-fit">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Panel - Dynamic Content */}
        <div className="w-1/2 border-r overflow-y-auto">
          {/* Problem Section */}
          {activeSection === "problem" && (
            <div className="p-6">
              <div className="space-y-6">
                {/* Collaboration Controls */}
                <div className="flex items-center space-x-2 pb-4 border-b">
                  {!isCollaborating ? (
                    <Button
                      onClick={startCollaboration}
                      variant="default"
                      size="sm"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Start Collaboration
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={stopCollaboration}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Stop Collaboration
                      </Button>
                      <Badge variant="secondary">Collaboration Active</Badge>
                    </div>
                  )}
                </div>

                {/* Problem Description */}
                <div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {problem.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Examples</h3>
                  <div className="space-y-4">
                    {problem.examples.map((example, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">
                                Example {index + 1}:
                              </span>
                            </div>
                            <div>
                              <span className="font-medium">Input: </span>
                              <code className="bg-muted px-2 py-1 rounded text-sm">
                                {example.input}
                              </code>
                            </div>
                            <div>
                              <span className="font-medium">Output: </span>
                              <code className="bg-muted px-2 py-1 rounded text-sm">
                                {example.output}
                              </code>
                            </div>
                            <div>
                              <span className="font-medium">Explanation: </span>
                              <span className="text-muted-foreground">
                                {example.explanation}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Constraints</h3>
                  <ul className="space-y-1">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="text-muted-foreground">
                        • {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Collaboration Section */}
          {activeSection === "collaboration" && (
            <div className="p-6">
              <div className="space-y-6">
                {/* Collaboration Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <h2 className="text-xl font-semibold">Collaboration Room</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setShowVideoDialog(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Video Chat
                    </Button>
                    <Button
                      onClick={() => setShowChat(!showChat)}
                      variant={showChat ? "default" : "outline"}
                      size="sm"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>

                {/* Video Call Area */}
                {inVideoCall && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Video Call - Room: {roomId}</span>
                        <Button onClick={copyRoomId} variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Video Containers */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                          <div className="text-white text-center">
                            <Camera className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">You</p>
                          </div>
                        </div>
                        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="text-white text-center">
                            <Users className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">
                              Waiting for participant...
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Video Controls */}
                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          onClick={() => setIsCameraOn(!isCameraOn)}
                          variant={isCameraOn ? "default" : "destructive"}
                          size="sm"
                        >
                          {isCameraOn ? (
                            <Camera className="h-4 w-4" />
                          ) : (
                            <CameraOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          onClick={() => setIsMicOn(!isMicOn)}
                          variant={isMicOn ? "default" : "destructive"}
                          size="sm"
                        >
                          {isMicOn ? (
                            <Mic className="h-4 w-4" />
                          ) : (
                            <MicOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          onClick={() => setIsScreenSharing(!isScreenSharing)}
                          variant={isScreenSharing ? "default" : "outline"}
                          size="sm"
                        >
                          <Monitor className="h-4 w-4 mr-2" />
                          {isScreenSharing ? "Stop Share" : "Share Screen"}
                        </Button>
                        <Button
                          onClick={handleLeaveRoom}
                          variant="destructive"
                          size="sm"
                        >
                          <PhoneOff className="h-4 w-4 mr-2" />
                          Leave Room
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Chat Area */}
                {showChat && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Team Chat</CardTitle>
                        <Button
                          onClick={() => setShowChat(false)}
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Messages */}
                        <div className="h-64 overflow-y-auto border rounded p-4 space-y-2">
                          {messages.map((message) => (
                            <div key={message.id} className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">
                                  {message.user}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {message.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          ))}
                        </div>

                        {/* Message Input */}
                        <div className="flex space-x-2">
                          <Input
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSendMessage()
                            }
                          />
                          <Button onClick={handleSendMessage} size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Editor View (when section is selected) */}
          {activeSection === "editor" && (
            <div className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Switch to the right panel to edit your code, or use the
                    split view.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col max-h-[calc(100vh-8rem)] overflow-y-auto">
          {/* Code Editor */}
          <div className="p-4 min-h-[50vh]">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-[50vh] resize-none code-editor font-mono text-sm"
              placeholder="Write your solution here..."
            />
          </div>

          {/* Action Buttons */}
          <div className="border-t p-4 bg-background">
            <div className="flex items-center justify-between ml-5">
              <Button onClick={handleRunCode} variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 mr-5"
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="border-t bg-background">
            <Tabs defaultValue="testcases" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                <TabsTrigger value="result">Test Result</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
                <TabsTrigger value="ai-assistant">LogicBot</TabsTrigger>
              </TabsList>

              {/* Test Cases Panel */}
              <TabsContent
                value="testcases"
                className="p-4 overflow-y-auto h-[15rem]"
              >
                <Tabs defaultValue={`case0`} className="w-full">
                  {/* Horizontal Test Case Selector */}
                  <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-muted px-2 py-1 rounded-md">
                    {testCases.map((_, index) => (
                      <TabsTrigger
                        key={index}
                        value={`case${index}`}
                        className="whitespace-nowrap"
                      >
                        Case {index + 1}
                      </TabsTrigger>
                    ))}
                    <TabsTrigger value="custom" className="whitespace-nowrap">
                      Custom
                    </TabsTrigger>
                  </TabsList>

                  {/* Test Case Panels */}
                  {testCases.map((testCase, index) => (
                    <TabsContent
                      key={index}
                      value={`case${index}`}
                      className="mt-4 border rounded-md p-4"
                    >
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="font-medium">Input:</span>{" "}
                          <code className="text-muted-foreground">
                            {testCase.input}
                          </code>
                        </div>
                        <div>
                          <span className="font-medium">Expected Output:</span>{" "}
                          <code className="text-muted-foreground">
                            {testCase.expected}
                          </code>
                        </div>
                      </div>
                    </TabsContent>
                  ))}

                  {/* Custom Test Case Panel */}
                  <TabsContent
                    value="custom"
                    className="mt-4 border rounded-md p-4 space-y-4"
                  >
                    <div className="space-y-2 text-sm">
                      <Input
                        placeholder="Enter input (e.g., nums = [1,2,3], k = 3)"
                        value={newTestCase.input}
                        onChange={(e) =>
                          setNewTestCase({
                            ...newTestCase,
                            input: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Enter expected output (e.g., [0,1])"
                        value={newTestCase.expected}
                        onChange={(e) =>
                          setNewTestCase({
                            ...newTestCase,
                            expected: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (newTestCase.input && newTestCase.expected) {
                            console.log("Adding test case:", newTestCase);
                            setNewTestCase({ input: "", expected: "" });
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Other Tabs */}
              <TabsContent
                value="result"
                className="p-4 h-[15rem] overflow-y-auto"
              >
                <div className="text-sm text-muted-foreground">
                  Run your code to see the results here
                </div>
              </TabsContent>

              <TabsContent
                value="console"
                className="p-4 h-[15rem] overflow-y-auto"
              >
                <div className="text-sm text-muted-foreground">
                  Console output will appear here
                </div>
              </TabsContent>

              <TabsContent
                value="ai-assistant"
                className="p-4 h-[15rem] overflow-y-auto"
              >
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <div className="text-sm text-muted-foreground text-center">
                    Ask LogicBot for help with your code
                  </div>
                  <Button onClick={handleAskAI} variant="outline" size="sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Ask LogicBot
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Video Chat Setup Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Video Chat Setup</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Create Room */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create a new video chat room and share the ID with others
                </p>
                <Button onClick={handleCreateRoom} className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Create New Room
                </Button>
              </CardContent>
            </Card>

            {/* Join Room */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Join Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Enter a room ID to join an existing video chat
                </p>
                <Input
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
                  placeholder="Enter Room ID"
                  className="uppercase"
                />
                <Button
                  onClick={handleJoinRoom}
                  disabled={!joinRoomId.trim()}
                  className="w-full"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Join Room
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
