"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

const eventCategoryData = [
  { name: "Music", value: 35 },
  { name: "Technology", value: 25 },
  { name: "Sports", value: 20 },
  { name: "Art", value: 15 },
  { name: "Food", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const recentEvents = [
  { id: 1, name: "Tech Conference 2023", date: "2023-06-15", category: "Technology" },
  { id: 2, name: "Summer Music Festival", date: "2023-05-20", category: "Music" },
  { id: 3, name: "Local Art Exhibition", date: "2023-04-10", category: "Art" },
]

export default function EventsAttendedAnalysis() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Events Attended Analysis</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
            <CardDescription>Distribution of events you&apos;ve attended by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Percentage",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {eventCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events Attended</CardTitle>
            <CardDescription>Your most recently attended events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    {event.category}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Attendance Statistics</CardTitle>
          <CardDescription>Overview of your event attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary">Total Events Attended</h3>
              <p className="text-2xl font-bold">28</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary">Most Attended Category</h3>
              <p className="text-2xl font-bold">Music</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary">Attendance Streak</h3>
              <p className="text-2xl font-bold">5 weeks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

