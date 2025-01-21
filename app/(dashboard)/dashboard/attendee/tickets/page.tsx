import ViewTickets from "../components/tickets/TicketDetail"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "View Tickets| Events Palour",
  description: "Explore and View your tickets ",
};

export default function EventsPage() {
  return <ViewTickets />
}
