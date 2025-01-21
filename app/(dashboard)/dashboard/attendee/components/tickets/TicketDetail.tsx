import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TicketCard } from "./ticket-card"
import { Download, Share2 } from "lucide-react"

const tickets = [
  {
    serialNumber: "EP-2024-0001",
    eventName: "Nairobi Tech Week",
    date: "MAR 18",
    time: "09:00 AM",
    price: "5000 KES",
    location: "Nairobi, Kenya",
    venue: "Kenyatta International Convention Centre",
    image: "/images/logo.jpg",
  },
  {
    serialNumber: "EP-2024-0002",
    eventName: "Kenya Fintech Summit",
    date: "APR 07",
    time: "10:00 AM",
    price: "2500 KES",
    location: "Mombasa, Kenya",
    venue: "PrideInn Paradise Beach Resort",
    image: "/images/logo.jpg",
  },
  {
    serialNumber: "EP-2024-0003",
    eventName: "Agritech Innovation Forum",
    date: "MAY 22",
    time: "11:00 AM",
    price: "1800 KES",
    location: "Nakuru, Kenya",
    venue: "Nakuru Athletic Club",
    image: "/images/logo.jpg",
  },
]

export default function ViewTickets() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-12">
      <h1 className="text-4xl font-bold mb-8">My Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tickets.map((ticket) => (
          <div key={ticket.serialNumber} className="relative">
            <TicketCard
              serialNumber={ticket.serialNumber}
              eventName={ticket.eventName}
              date={ticket.date}
              time={ticket.time}
              price={ticket.price}
              location={ticket.location}
              venue={ticket.venue}
              image={ticket.image}
              validated={false}
            />
            <div className="absolute top-4 right-4 flex flex-col sm:flex-row gap-2">
              <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/dashboard/attendee/events" passHref>
          <Button variant="outline">Browse More Events</Button>
        </Link>
      </div>
    </div>
  )
}