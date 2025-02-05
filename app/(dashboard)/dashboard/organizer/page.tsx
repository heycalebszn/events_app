'use client'
import React from 'react'
import { useGreeting } from "@/hooks/use-greetings"
import { Calendar, DollarSign, TicketIcon, UserCheck, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const OrganizerDashboardPage: React.FC = () => {
  const attendeeData = { user: { name: "Pwani Tech" } }
  const { greeting, timestamp } = useGreeting(attendeeData.user.name)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          {greeting}
        </h1>
        <p className="text-sm text-muted-foreground">
          {timestamp}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Upcoming Events" value="3" icon={Calendar} />
        <DashboardCard title="Total Tickets Sold" value="8" icon={TicketIcon} />
        <DashboardCard title="Total Amount Received" value="$450" icon={DollarSign} />
        <DashboardCard title="Attended Events" value="12" icon={UserCheck} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTickets />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Events</CardTitle>
          </CardHeader>
          <CardContent>
            <PopularEvents />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingEvents />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <EventCategories />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

function RecentTickets() {
  const tickets = [
    { id: '1', event: 'Tech Conference', total: '$150', status: 'Completed' },
    { id: '2', event: 'Music Festival', total: '$99', status: 'Upcoming' },
    { id: '3', event: 'Art Exhibition', total: '$45', status: 'Pending' },
  ]

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex items-center justify-between border-b pb-2">
          <div>
            <p className="font-medium">{ticket.event}</p>
            <p className="text-sm text-muted-foreground">{ticket.total}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{ticket.status}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function PopularEvents() {
  const events = [
    { name: 'Summer Music Fest', sales: 500, rating: 4.8 },
    { name: 'Tech Innovation Summit', sales: 350, rating: 4.6 },
    { name: 'Art & Culture Expo', sales: 250, rating: 4.9 },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.name} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{event.name}</p>
            <p className="text-sm text-muted-foreground">{event.sales} attended</p>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{event.rating}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function UpcomingEvents() {
  const events = [
    { name: 'Tech Conference', date: '2024-08-15', location: 'San Francisco' },
    { name: 'Music Festival', date: '2024-09-20', location: 'Central Park' },
    { name: 'Art Exhibition', date: '2024-10-05', location: 'Modern Art Museum' },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.name} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{event.name}</p>
            <p className="text-sm text-muted-foreground">{event.location}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function EventCategories() {
  const categories = [
    { item: 'Technology', quantity: 15, status: 'High' },
    { item: 'Music', quantity: 12, status: 'Medium' },
    { item: 'Art', quantity: 8, status: 'Low' },
    { item: 'Sports', quantity: 5, status: 'Critical' },
  ]

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.item} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{category.item}</p>
            <p className="text-sm text-muted-foreground">Events: {category.quantity}</p>
          </div>
          <div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              category.status === 'High' ? 'bg-green-100 text-green-800' :
              category.status === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              category.status === 'Low' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {category.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrganizerDashboardPage