import EventSearch from "../../components/event/event-search"

export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Find Events Near You</h1>
      <EventSearch />
    </main>
  )
}

