import EventsList from "../components/event/EventsList"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Exlore Events| Events Palour",
  description: "Explore events and attend with ease",
};

export default function EventsPage() {
  return <EventsList />
}