"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const events = [
  { id: 1, name: "Summer Music Festival", lat: 40.7829, lng: -73.9654, type: "Music" },
  { id: 2, name: "Food & Wine Expo", lat: -4.0435, lng: 39.6682, type: "Food & Drink" },
  { id: 3, name: "Tech Conference 2023", lat: 37.7749, lng: -122.4194, type: "Technology" },
]

const eventColors = {
  Music: "bg-red-500",
  "Food & Drink": "bg-orange-500",
  Technology: "bg-blue-500"
}

const createMapIcon = (color: string, label: string) => {
  return L.divIcon({
    html: `
      <div class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span class="bg-white px-1 rounded text-xs font-bold shadow">${label}</span>
      </div>
    `,
    className: "custom-pin",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })
}

const eventIcons = {
  Music: createMapIcon("#ef4444", "M"), // Red
  "Food & Drink": createMapIcon("#f97316", "F"), // Orange
  Technology: createMapIcon("#3b82f6", "T"), // Blue
}

function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null)
  const map = useMap()

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map])

  return position === null ? null : (
    <Marker
      position={position}
      icon={createMapIcon("#10b981", "You")} // Green
    >
      <Popup>You are here</Popup>
    </Marker>
  )
}

function EventList() {
  const map = useMap()

  return (
    <Card className="absolute right-2 top-2 z-[1000] max-h-[calc(100%-20px)] overflow-y-auto">
      <CardHeader>
        <CardTitle>Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-colors"
              onClick={() => map.flyTo([event.lat, event.lng], 13)}
            >
              <span
                className={`w-4 h-4 rounded-full mr-2 ${eventColors[event.type as keyof typeof eventColors]}`}
              ></span>
              {event.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function MapContent() {
  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.lat, event.lng]}
          icon={eventIcons[event.type as keyof typeof eventIcons]}
        >
          <Popup>
            <strong>{event.name}</strong>
            <br />
            Type: {event.type}
          </Popup>
        </Marker>
      ))}
      <LocationMarker />
      <EventList />
    </>
  )
}

export default function EventMap() {
  return (
    <div className="relative">
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "600px", width: "100%" }} className="rounded-lg">
        <MapContent />
      </MapContainer>
    </div>
  )
}