"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { addDays, isSameDay, isWithinInterval, startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns"
import { DatePickerWithRange } from "@/components/shared/date-time-picker"
import type { DateRange } from "react-day-picker"

const filters = [
  "All",
  "Online",
  "Festivals",
  "Conference",
  "Tech",
  "Outdoor",
  // "Ventures",
  "Networking",
  "Workshops",
]

const events = [
  {
    id: 1,
    title: "Nairobi VC Dinner Night",
    date: "2024-01-31",
    location: "Nairobi, Kenya",
    type: "Business",
    image: "/images/logo.jpg",
  },
  {
    id: 2,
    title: "Tech Startup Expo",
    date: "2024-01-27",
    location: "Online, Google Meet",
    type: "Tech",
    image: "/images/mpesa.png",
  },
  {
    id: 3,
    title: "AI Conference",
    date: "2024-02-20",
    location: "Online, Zoom",
    type: "Tech",
    image: "/dummy/four.jpeg",
  },
  {
    id: 4,
    title: "Outdoor Adventure Meetup",
    date: "2024-03-01",
    location: "Nairobi National Park",
    type: "Outdoor",
    image: "/dummy/three.jpeg",
  },
  {
    id: 5,
    title: "Startup Networking Event",
    date: "2024-03-10",
    location: "Kigali, Rwanda",
    type: "Networking",
    image: "/dummy/two.jpeg",
  },
  {
    id: 6,
    title: "Wanati party",
    date: "2024-03-15",
    location: "Nyali, Kenya",
    type: "Festivals",
    image: "/dummy/one.jpg",
  },
  {
    id: 7,
    title: "Blockchain Workshop",
    date: "2024-03-20",
    location: "Nairobi, Kenya",
    type: "Workshops",
    image: "/dummy/one.jpg",
  },
]

interface Event {
  id: number
  title: string
  date: string
  location: string
  type: string
  image: string
}

export default function EventsList() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [dateFilter, setDateFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const eventsPerPage = 6

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filterEventsByDate = (event: Event) => {
    const eventDate = new Date(event.date)
    const today = new Date()

    switch (dateFilter) {
      case "today":
        return isSameDay(eventDate, today)
      case "tomorrow":
        return isSameDay(eventDate, addDays(today, 1))
      case "weekend":
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)
        return isWithinInterval(eventDate, { start: weekStart, end: weekEnd })
      case "custom":
        if (dateRange?.from && dateRange?.to) {
          return isWithinInterval(eventDate, {
            start: startOfDay(dateRange.from),
            end: endOfDay(dateRange.to),
          })
        }
        return true
      default:
        return true
    }
  }

  const filteredEvents = events.filter(
    (event) =>
      (selectedFilter === "All" || event.type === selectedFilter) &&
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterEventsByDate(event),
  )

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const renderPaginationButtons = () => {
    const pageNumbers = []
    const maxPagesToShow = 3

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("...")
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1)
        pageNumbers.push("...")
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push("...")
        pageNumbers.push(currentPage)
        pageNumbers.push("...")
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers.map((pageNumber, index) => (
      <Button
        key={index}
        variant={currentPage === pageNumber ? "default" : "outline"}
        onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
        className="mx-1 px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base"
        disabled={pageNumber === "..."}
      >
        {pageNumber}
      </Button>
    ))
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-12">
      <h1 className="text-4xl font-bold mb-8">Discover Events</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            onClick={() => {
              setSelectedFilter(filter)
              setCurrentPage(1)
            }}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="mb-8 relative">
        <Input
          type="search"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="mb-8 flex flex-wrap gap-4 items-end justify-end">
        <Button variant={dateFilter === "all" ? "default" : "outline"} onClick={() => setDateFilter("all")}>
          All Dates
        </Button>
        <Button variant={dateFilter === "today" ? "default" : "outline"} onClick={() => setDateFilter("today")}>
          Today
        </Button>
        <Button variant={dateFilter === "tomorrow" ? "default" : "outline"} onClick={() => setDateFilter("tomorrow")}>
          Tomorrow
        </Button>
        <Button variant={dateFilter === "weekend" ? "default" : "outline"} onClick={() => setDateFilter("weekend")}>
          This Weekend
        </Button>
        <DatePickerWithRange
          className="w-[300px]"
          date={dateRange}
          onDateSelect={(range) => {
            setDateRange(range)
            setDateFilter("custom")
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{event.title}</CardTitle>
              <div className="flex items-center mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mt-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.id}`} passHref>
                <Button>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {renderPaginationButtons()}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

