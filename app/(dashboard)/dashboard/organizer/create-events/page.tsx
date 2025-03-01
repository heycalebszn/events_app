import type { Metadata } from "next";
import CreateEventForm from '../components/create-event-form'


export const metadata: Metadata = {
  title: "Create Events| Events Palour",
  description: "Get Started creating events and enjoy seamless services of events creation",
};

export default function CreateEventPage() {
   return <CreateEventForm />
}
