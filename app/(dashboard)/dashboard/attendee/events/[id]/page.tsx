import EventDetails from "../../components/event/EventDetails"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Exlore Events| Events Palour",
  description: "Explore events and attend with ease",
};



export default function EventPage() {
  return <EventDetails />
}
