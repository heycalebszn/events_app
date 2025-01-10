import { Metadata } from "next"
import VendorOnboardingForm from "./component/VendorOnboardingForm"

export const metadata: Metadata = {
  title: "Food Vendor Onboarding | Events Palour",
  description: "Join Events Palour as a food vendor and showcase your culinary creations at exciting events."
}

export default function VendorOnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-3">Food Vendor Onboarding</h1>
      <p className="text-muted-foreground text-sm md:text-base mb-8">
                        Let&apos;s set up your food business store and get you started
                    </p>
      <VendorOnboardingForm />
    </div>
  )
}
