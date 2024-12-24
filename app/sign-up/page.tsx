import { SignUpForm}  from "@/components/auth/signup-form"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-Up | Events Palour",
  description: " Create your account",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        < SignUpForm />
      </div>
    </div>
  )
}
