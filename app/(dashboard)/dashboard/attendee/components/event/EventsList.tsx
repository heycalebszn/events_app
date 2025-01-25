"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const filters = [
  "All", "Online", "Physical", "Festivals", "Conference", 
  "Tech", "Outdoor", "Ventures", "Networking", "Workshops"
]

const events = [
  {
    id: 1,
    title: "Nairobi VC Dinner Night",
    date: "Jan 31, 2024",
    location: "Nairobi, Kenya",
    category: "Networking",
    image: "/images/logo.jpg",
  },
  {
    id: 2,
    title: "Tech Startup Expo",
    date: "Feb 15, 2024",
    location: "Online",
    category: "Tech",
    image: "/images/mpesa.png",
  },
  {
    id: 3,
    title: "AI Conference 2024",
    date: "Mar 10, 2024",
    location: "San Francisco, USA",
    category: "Conference",
    image: "/dummy/four.jpeg",
  },
  {
    id: 4,
    title: "Outdoor Music Festival",
    date: "Apr 5, 2024",
    location: "London, UK",
    category: "Festivals",
    image: "/dummy/three.jpeg",
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    date: "May 20, 2024",
    location: "New York, USA",
    category: "Ventures",
    image: "/dummy/two.jpeg",
  },
  {
    id: 6,
    title: "Wanati party",
    date: "Jun 15, 2024",
    location: "Physical",
    category: "Networking",
    image: "/dummy/one.jpg",
  },
  {
    id: 7,
    title: "Web Development Workshop",
    date: "Jul 1, 2024",
    location: "Online",
    category: "Workshops",
    image: "/dummy/one.jpg",
  }
]

const categories = [
  { id: 1, name: "Online", image: "/images/online.svg?height=200&width=400", count: 15 },
  { id: 2, name: "Physical", image: "/images/physical.svg?height=200&width=400", count: 20 },
  { id: 3, name: "Festivals", image: "/images/festival.svg?height=200&width=400", count: 8 },
  { id: 4, name: "Conference", image: "/images/conference.svg?height=200&width=400", count: 12 },
  { id: 5, name: "Tech", image: "/images/tech.svg?height=200&width=400", count: 25 },
  { id: 6, name: "Outdoor", image: "/images/outdoor.svg?height=200&width=400", count: 10 },
  { id: 7, name: "Networking", image: "/images/networking.svg?height=200&width=400", count: 18 },
  { id: 8, name: "Workshops", image: "/images/workshop.svg?height=200&width=400", count: 14 },
]
interface EventsListProps {
  initialView: string
  initialCategory: string
}

export default function EventsList({ initialView, initialCategory }: EventsListProps) {
  const router = useRouter()
  const [view, setView] = useState(initialView)
  const [selectedFilter, setSelectedFilter] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  useEffect(() => {
    setView(initialView)
    setSelectedFilter(initialCategory)
  }, [initialView, initialCategory])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleViewChange = (newView: string) => {
    setView(newView)
    router.push(`/dashboard/attendee/events?view=${newView}`, { scroll: false })
  }

  const filteredEvents = events.filter(
    (event) =>
      (selectedFilter === "All" || event.category === selectedFilter) &&
      event.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("...")
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push("...")
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers.map((pageNumber, index) => (
      <Button
        key={index}
        variant={currentPage === pageNumber ? "default" : "outline"}
        onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
        className="mx-1 px-3 py-2"
        disabled={pageNumber === "..."}
      >
        {pageNumber}
      </Button>
    ))
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-12">
      <h1 className="text-4xl font-bold mb-8">{view === "categories" ? "Event Categories" : "Discover Events"}</h1>

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Button variant={view === "list" ? "default" : "outline"} onClick={() => handleViewChange("list")}>
            Event List
          </Button>
          <Button
            variant={view === "categories" ? "default" : "outline"}
            onClick={() => handleViewChange("categories")}
          >
            Categories
          </Button>
        </div>
        <div className="relative">
          <Input
            type="search"
            placeholder={view === "categories" ? "Search categories..." : "Search events..."}
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {view === "list" && (
        <>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover  rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{event.title}</CardTitle>
                  <div className="flex items-center mt-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/dashboard/attendee/events/${event.id}`} passHref>
                    <Button>Get Ticket</Button>
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
        </>
      )}

      {view === "categories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-fit rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{category.name}</CardTitle>
                <p className="text-sm text-gray-600 mb-4">{category.count} events</p>
                <Button
                  className="w-full"
                  onClick={() => {
                    setView("list")
                    setSelectedFilter(category.name)
                    router.push(`/dashboard/attendee/events?view=list&category=${category.name}`)
                  }}
                >
                  View Events
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}