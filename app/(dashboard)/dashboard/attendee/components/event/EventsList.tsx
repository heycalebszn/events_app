"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const filters = [
  "All",
  "Online",
  "Physical",
  "Festivals",
  "Conference",
  "Tech",
  "Outdoor",
  "Ventures",
  "Networking",
  "Workshops",
]

const events = [
    {
      id: 1,
      title: "Nairobi VC Dinner Night",
      date: "Jan 31, 2024",
      location: "Nairobi, Kenya",
      type: "Business",
      image: "/images/logo.jpg",
    },
    {
      id: 2,
      title: "Tech Startup Expo",
      date: "Feb 15, 2024",
      location: "Online",
      type: "Tech",
      image: "/images/mpesa.png",
    },
    {
      id: 3,
      title: "Tech Startup Expo",
      date: "Feb 15, 2024",
      location: "Online",
      type: "Tech",
      image: "/dummy/four.jpeg",
    },
    {
      id: 4,
      title: "Tech Startup Expo",
      date: "Feb 15, 2024",
      location: "Online",
      type: "Tech",
      image: "/dummy/three.jpeg",
    },
    {
      id: 5,
      title: "Tech Startup Expo",
      date: "Feb 15, 2024",
      location: "Online",
      type: "Tech",
      image: "/dummy/two.jpeg",
    },
    {
      id: 6,
      title: "Wanati party",
      date: "Feb 15, 2024",
      location: "Physical",
      type: "Tech",
      image: "/dummy/one.jpg",
    },
    {
      id: 7,
      title: "Wanati party",
      date: "Feb 15, 2024",
      location: "Physical",
      type: "Tech",
      image: "/dummy/one.jpg",
    },
    // Add more events as needed
  ]
  
  
  
export default function EventsList() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const filteredEvents = events.filter(
    (event) =>
      (selectedFilter === "All" || event.type === selectedFilter) &&
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
              setCurrentPage(1) // Reset to first page when changing filter
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
                <span className="text-sm">{event.date}</span>
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
