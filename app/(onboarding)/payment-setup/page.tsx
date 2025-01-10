import { Metadata } from "next"
import VendorPaymentSetupForm from "./components/VendorPaymentSetupForm"

export const metadata: Metadata = {
  title: "Payment Setup | Events Palour",
  description: "Set up your payment method to start receiving funds for your food business on Events Palour."
}

export default function VendorPaymentSetupPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-3">One Last Step</h1>
      <p className="text-muted-foreground text-sm md:text-base mb-8">
        Let&apos;s set up your payment method to start receiving funds
      </p>
      <VendorPaymentSetupForm />
    </div>
  )
}

