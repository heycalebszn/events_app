import Link from 'next/link'
import { Metadata } from "next"
import { ArrowRight, Calendar, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"


export const metadata: Metadata = {
  title: "Get Started | Events Palour",
  description: "Lets get you started with Events Palour. "
}

export default function GetStartedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
     
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-in">
           Let&apos;s get you Started 
        </h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-200">
          Select your path to unlock a world of exciting events and opportunities.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in animation-delay-400">
          <RoleCard 
            title="Event Organizer" 
            description="Create and manage your own events on our platform. Reach a wider audience and make your events a success."
            icon={<Calendar className="w-12 h-12 mb-4" />}
            href="/onboarding"
            buttonText="Start as Organizer"
          />
          <RoleCard 
            title="Event Attendee" 
            description="Discover and attend exciting events that match your interests. Connect with like-minded people and create lasting memories."
            icon={<Users className="w-12 h-12 mb-4" />}
            href="/dashboard/attendee"
            buttonText="Start Attending"
          />
        </div>
      </main>
      
    </div>
  )
}

function RoleCard({ title, description, icon, href, buttonText }: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  buttonText: string
}) {
  return (
    <div className="border rounded-lg p-6 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center group">
      {icon}
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="mb-6 flex-grow">{description}</p>
      <Link href={href} passHref>
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {buttonText}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </div>
  )
}

