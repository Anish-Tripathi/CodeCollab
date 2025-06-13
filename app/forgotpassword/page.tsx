"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code,
  Eye,
  EyeOff,
  Mail,
  Shield,
  KeyRound,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 1500);
  };

  // const renderStepIndicator = () => (
  //   <div className="flex justify-center mb-6">
  //     {[1, 2, 3].map((stepNumber) => (
  //       <div key={stepNumber} className="flex items-center">
  //         <div
  //           className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
  //             step >= stepNumber
  //               ? "bg-primary text-primary-foreground"
  //               : "bg-muted text-muted-foreground"
  //           }`}
  //         >
  //           {stepNumber}
  //         </div>
  //         {stepNumber < 3 && (
  //           <div
  //             className={`w-8 h-0.5 mx-2 transition-colors ${
  //               step > stepNumber ? "bg-primary" : "bg-muted"
  //             }`}
  //           />
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );

  const renderStep1 = () => (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">CodeCollab</span>
          </Link>
        </div>
        {/* {renderStepIndicator()} */}
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Mail className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you an OTP to reset your
          password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Remember your password?{" "}
          </span>
          <Link href="/login" className="text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </>
  );

  const renderStep2 = () => (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">CodeCollab</span>
          </Link>
        </div>
        {/* {renderStepIndicator()} */}
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl">Enter OTP</CardTitle>
        <CardDescription>
          We've sent a 6-digit code to{" "}
          <span className="text-primary font-medium">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">OTP Code</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="text-center text-sm tracking-widest"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setStep(1)}
          >
            ← Back to Email
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Didn't receive the code?{" "}
          </span>
          <button className="text-primary hover:underline">Resend OTP</button>
        </div>
      </CardContent>
    </>
  );

  const renderStep3 = () => (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">CodeCollab</span>
          </Link>
        </div>
        {/* {renderStepIndicator()} */}
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <KeyRound className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl">Create New Password</CardTitle>
        <CardDescription>
          Your new password must be different from your previous password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setStep(2)}
          >
            ← Back to OTP
          </Button>
        </form>
      </CardContent>
    </>
  );

  const renderStep4 = () => (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">CodeCollab</span>
          </Link>
        </div>
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl">Password Reset Successful!</CardTitle>
        <CardDescription>
          Your password has been successfully reset. You can now sign in with
          your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/login">
          <Button className="w-full">Back to Sign In</Button>
        </Link>
      </CardContent>
    </>
  );

  return (
    <div className="full-screen-container bg-background">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </Card>
      </div>
      <Footer />
    </div>
  );
}
