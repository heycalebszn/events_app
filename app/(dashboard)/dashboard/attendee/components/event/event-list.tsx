import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "Aug 15-17, 2023",
    location: "Nairobi Uni, Nairobi - Kenya",
    price: 7500,
    type: "Music",
  },
  {
    id: 2,
    title: "Food & Wine Expo",
    date: "Sep 5, 2023",
    location: "Convention Center, mombasa - Kenya",
    price: 4500,
    type: "Food & Drink",
  },
  {
    id: 3,
    title: "Tech Conference 2023",
    date: "Oct 10-12, 2023",
    location: "Moscone Center, San Francisco - USA",
    price: 29900,
    type: "Technology",
  },
]

export default function EventList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
            <Badge>{event.type}</Badge>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-lg font-semibold">Kes {event.price}</p>
            <Button>View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

