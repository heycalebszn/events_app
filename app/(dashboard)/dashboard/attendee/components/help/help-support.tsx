import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SupportForm } from "./support-form"

const faqs = [
  {
    question: "How do I purchase tickets?",
    answer:
      "To purchase tickets, navigate to the event page and click on the 'Buy Tickets' button. Follow the prompts to complete your purchase.",
  },
  {
    question: "Can I get a refund for my tickets?",
    answer:
      "Refund policies vary by event. Please check the specific event's terms and conditions or contact the event organizer directly.",
  },
  {
    question: "How do I access my tickets?",
    answer:
      "Your tickets can be accessed in the 'My Tickets' section of your account. You can either print them or show the digital version on your mobile device at the event.",
  },
  {
    question: "What if I lose my ticket?",
    answer:
      "Don't worry! You can always access your tickets in the 'My Tickets' section of your account. If you're having trouble, please contact our support team.",
  },
  {
    question: "How can I transfer my ticket to someone else?",
    answer:
      "To transfer a ticket, go to 'My Tickets', select the ticket you want to transfer, and click on the 'Transfer' option. Follow the prompts to complete the transfer.",
  },
]

export default function HelpAndSupport() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Help & Support</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <strong>Email:</strong> support@eventsparlour.com
              </p>
              <p>
                <strong>Phone:</strong> +254 700 123 456
              </p>
              <p>
                <strong>Hours:</strong> Monday - Friday, 9am - 5pm EAT
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Submit a Support Request</CardTitle>
          <CardDescription>
            We&apos;re here to help. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupportForm />
        </CardContent>
      </Card>
    </div>
  )
}

