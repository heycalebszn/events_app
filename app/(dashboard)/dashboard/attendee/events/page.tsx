import EventsList from "../components/event/EventsList"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore Events | Events Parlour",
  description: "Explore events and attend with ease",
}

interface SearchParams {
  view?: string
  category?: string
}

export default function EventsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return <EventsList initialView={searchParams.view ?? "list"} initialCategory={searchParams.category ?? "All"} />
}

// Add this type declaration at the end of the file
declare module "next" {
  interface PageProps {
    searchParams?: SearchParams
  }
}

