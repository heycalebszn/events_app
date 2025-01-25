import EventsList from "../components/event/EventsList"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore Events | Events Parlour",
  description: "Explore events and attend with ease",
}
export default function EventsPage({ 
  searchParams 
}: { 
  searchParams: { view?: string; category?: string } 
}) {
  return (
    <EventsList 
      initialView={searchParams.view || "list"} 
      initialCategory={searchParams.category || "All"} 
    />
  )
}