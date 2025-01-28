import { Suspense } from 'react'
import EventDetails from "../../components/event/EventDetails"
import { EventDetailsSkeleton } from "./loading"
import type { Metadata } from "next"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: "Event Details | Events Palour",
  description: "View event details and get tickets",
}

export default async function EventPage({ params }: Props) {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails eventId={params.id} />
    </Suspense>
  )
}

