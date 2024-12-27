import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Privacy Policy</h1>
        <p className="text-center text-sm text-gray-500 mb-4">Last updated: {currentDate}</p>
        
        <Alert className="mb-6">
          <AlertDescription>
            Please note that this privacy policy may change at any time. It is your responsibility to check for updates regularly.
          </AlertDescription>
        </Alert>

        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <div className="space-y-4 text-sm md:text-base">
            <p>At Events Parlour, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our event and ticketing platform.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you create an account, list an event, purchase tickets, or contact us for support. This may include:</p>
            <ul className="list-disc pl-5">
              <li>Name and contact information</li>
              <li>Payment information</li>
              <li>Event details (for organizers)</li>
              <li>Preferences and interests</li>
            </ul>
            
            <h2 className="text-lg md:text-xl font-semibold">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience on our platform</li>
            </ul>
            
            <h2 className="text-lg md:text-xl font-semibold">3. Sharing of Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-5">
              <li>Event organizers (for ticket purchases)</li>
              <li>Service providers who perform services on our behalf</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
            
            <h2 className="text-lg md:text-xl font-semibold">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">5. Your Choices</h2>
            <p>You may update, correct, or delete your account information at any time by logging into your account or contacting us. You may also opt-out of receiving promotional communications from us by following the instructions in those messages.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">6. Cookies and Similar Technologies</h2>
            <p>We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">7. Third-Party Links</h2>
            <p>Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">8. Children&apos;s Privacy</h2>
            <p>Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">9. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this policy.</p>
            
            <h2 className="text-lg md:text-xl font-semibold">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at [Your Contact Information].</p>
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

