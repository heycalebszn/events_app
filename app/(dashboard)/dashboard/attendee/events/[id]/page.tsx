import EventDetails from "../../components/event/EventDetails"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details | Events Palour",
  description: "View event details and get tickets",
}

export default function EventPage({ params }: { params: { id: string } }) {
  return <EventDetails eventId={params.id} />
}