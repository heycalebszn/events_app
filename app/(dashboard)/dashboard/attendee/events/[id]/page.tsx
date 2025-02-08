import EventDetails from "../../components/event/EventDetails"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Event Details | Events Palour",
  description: "View event details and get tickets",
}

// Define the props interface with non-Promise params
interface PageProps {
  params: {
    id: string
  }
}

// Update the page component with proper typing
export default function EventPage({ params }: PageProps) {
  return <EventDetails eventId={params.id} />
}