import EventDetails from "../../components/event/EventDetails"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Event Details | Events Palour",
  description: "View event details and get tickets",
}

interface PageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: PageProps) {
  return <EventDetails eventId={params.id} />
}
