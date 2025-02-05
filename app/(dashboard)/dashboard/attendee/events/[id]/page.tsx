import EventDetails from "../../components/event/EventDetails"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Event Details | Events Palour",
    description: "View event details and get tickets"
  }
}

export default function EventPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return <EventDetails eventId={params.id} />
}