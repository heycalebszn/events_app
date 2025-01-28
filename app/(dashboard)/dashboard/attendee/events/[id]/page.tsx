import { Suspense } from 'react'
import EventDetails from "../../components/event/EventDetails"
import type { Metadata } from "next"
import { EventDetailsSkeleton } from "./loading"

interface EventPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Event Details | Events Palour",
  description: "View event details and get tickets",
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails eventId={params.id} />
    </Suspense>
  )
}