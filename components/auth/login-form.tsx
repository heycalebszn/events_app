"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GithubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google-icon";
import Image from "next/image";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingEmail) return;
    
    setIsLoadingEmail(true);

    try {
      const response = await fetch("https://ep-backend-fzs9.onrender.com/api/v1/auth/magic-link", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // sending the entered email
      });

      if (!response.ok) {
        throw new Error("Failed to send magic link");
      }

      toast.success("Magic link sent to your email!", {
        position: "bottom-right",
      });
      
      setMagicLinkSent(true);
    } catch (error) {
      console.error("Error sending magic link:", error);
      toast.error("Failed to send magic link. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleGithubSignIn = async () => {
    if (isLoadingGithub) return;
    
    setIsLoadingGithub(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Signing in with GitHub...", {
        position: "bottom-right",
      });
    } catch {
      toast.error("Failed to sign in with GitHub. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setIsLoadingGithub(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLoadingGoogle) return;
    
    setIsLoadingGoogle(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Signing in with Google...", {
        position: "bottom-right",
      });
    } catch {
      toast.error("Failed to sign in with Google. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const resendMagicLink = async () => {
    if (!email || isLoadingEmail) return;
    
    setIsLoadingEmail(true);
    try {
      const response = await fetch("https://ep-backend-fzs9.onrender.com/api/v1/auth/magic-link", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend magic link");
      }

      toast.success("New magic link sent!", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error resending magic link:", error);
      toast.error("Failed to resend magic link. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setMagicLinkSent(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleEmailSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email to continue to Event Parlour
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoadingEmail}
                  required
                />
              </div>
              
              {magicLinkSent ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <p className="mb-2 font-medium">Check your email</p>
                    <p className="text-muted-foreground">
                      We&apos;ve sent a magic link to <span className="font-medium">{email}</span>. 
                      Click the link in the email to sign in.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      If you don&apos;t see the email, check your spam folder.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={resetForm}
                      disabled={isLoadingEmail}
                    >
                      Change Email
                    </Button>
                    <Button 
                      type="button" 
                      className="flex-1"
                      onClick={resendMagicLink}
                      disabled={isLoadingEmail}
                    >
                      {isLoadingEmail ? "Sending..." : "Resend Link"}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button type="submit" className="w-full" disabled={isLoadingEmail}>
                  {isLoadingEmail ? "Sending..." : "Continue with Email"}
                </Button>
              )}
              
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full p-0"
                        onClick={handleGithubSignIn}
                        disabled={isLoadingGithub}
                      >
                        <GithubIcon />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="hidden lg:block">
                      GitHub
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full p-0"
                        onClick={handleGoogleSignIn}
                        disabled={isLoadingGoogle}
                      >
                        <GoogleIcon />
                        <span className="sr-only">Google</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="hidden lg:block">
                      Google
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/login.svg"
              alt="auth illustration"
              fill
              priority
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="/terms">Terms of Service</a> and{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default LoginForm;