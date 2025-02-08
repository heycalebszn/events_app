import EventDetails from "../../../../dashboard/attendee/components/event/EventDetails"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Event Details | Events Palour",
  description: "View event details and get tickets",
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function EventPage({ params }: Props) {
  return <EventDetails eventId={params.id} />
}

// Type-safe route segment config
export const dynamic = 'force-dynamic'
export const dynamicParams = true