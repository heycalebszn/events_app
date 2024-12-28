import OnboardingFlow from "@/components/onboarding/onboarding-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Onboarding | Events Palour",
    description: "Let us know more about you",
};

export default function OnboardingPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm space-y-6 md:max-w-3xl">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                        Welcome to Events Palour
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Let&apos;s set up your organization and get you started
                    </p>
                </div>
                <OnboardingFlow />
            </div>
        </div>
    )
}