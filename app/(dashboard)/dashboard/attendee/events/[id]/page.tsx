import { Suspense } from 'react'
import EventDetails from "../../components/event/EventDetails"
import { EventDetailsSkeleton } from "./loading"
import type { Metadata } from "next"

type PageProps = {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `Event Details | Events Palour`,
      description: "View event details and get tickets",
    }
  } catch {
    return {
      title: "Event Not Found | Events Palour",
      description: "The requested event could not be found",
    }
  }
}

export default function EventPage({ params }: PageProps) {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails eventId={params.id} />
    </Suspense>
  )
}
