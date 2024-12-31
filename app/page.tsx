import { LoginForm } from "@/components/auth/login-form"
import { getCurrentSession } from "@/lib/server/session"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign-In | Events Palour",
  description: "Login to your account",
}

export default async function LoginPage() {
  const { user } = await getCurrentSession()
  
  if (user) {
    redirect("/dashboard/attendee")
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}