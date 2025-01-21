import type { Metadata } from "next"
import EventsAttendedAnalysis from "../components/analytics/events-attended-analysis"

export const metadata: Metadata = {
  title: "Events Attended Analysis | Attendee Analytics",
  description: "Analyze your event attendance patterns and preferences",
}

export default function EventsAttendedPage() {
  return <EventsAttendedAnalysis />
}

