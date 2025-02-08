import EventDetails from "../../components/event/EventDetails"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Event Details | Events Palour",
  description: "View event details and get tickets",
}

// Define the props interface with Promise params
interface PageProps {
  params: Promise<{ id: string }>
}

// Update the page component to handle async params
export default async function EventPage(props: PageProps) {
  const params = await props.params
  return <EventDetails eventId={params.id} />
}