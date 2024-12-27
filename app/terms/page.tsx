import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TermsAndConditions() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2"> Terms and Conditions</h1>
        <p className="text-center text-sm text-gray-500 mb-4">Last updated: {currentDate}</p>
        
        <Alert className="mb-6">
          <AlertDescription>
            Please note that these terms and conditions may change at any time. It is your responsibility to check for updates regularly.
          </AlertDescription>
        </Alert>

        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <div className="space-y-4 text-sm md:text-base">
            <p>Welcome to Events Parlour. By using our event and ticketing platform, you agree to comply with and be bound by the following terms and conditions of use.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>By accessing or using Events Parlour, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">2. User Accounts</h2>
            <p>To use certain features of Events Parlour, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">3. Event Creation and Ticketing</h2>
            <p>Event organizers may create and list events on our platform. By doing so, you agree to provide accurate and complete information about your event. Events Parlour reserves the right to remove or modify event listings that violate our policies.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">4. Ticket Purchases</h2>
            <p>When purchasing tickets through Events Parlour, you agree to provide accurate and complete information. All ticket sales are final unless otherwise stated by the event organizer or required by law.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">5. Fees and Payments</h2>
            <p>Events Parlour may charge fees for the use of certain services. These fees will be clearly communicated before any transaction. All payments are processed securely through our platform.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">6. Cancellations and Refunds</h2>
            <p>Cancellation and refund policies are set by event organizers. Events Parlour is not responsible for issuing refunds unless required by law. Please check the specific event&apos;s policy before making a purchase.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">7. Intellectual Property</h2>
            <p>The content, organization, graphics, design, and other matters related to Events Parlour are protected under applicable copyrights and other proprietary laws. Copying, redistribution, use, or publication by you of any such matters or any part of the platform is strictly prohibited.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">8. Limitation of Liability</h2>
            <p>Events Parlour shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages resulting from your use of the platform or attendance at events listed on our platform.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">9. Governing Law</h2>
            <p>These Terms will be governed by and construed in accordance with the laws of the jurisdiction in which Events Parlour is based, without regard to its conflict of law provisions.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">10. Changes to Terms</h2>
            <p>Events Parlour reserves the right to modify these terms at any time. We will always post the most current version on our site. By continuing to use the platform after changes have been made, you agree to be bound by the modified terms.</p>
          </div>
        </ScrollArea>

        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
