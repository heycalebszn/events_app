import Image from "next/image"
import { QrCodeIcon as QRCode } from "lucide-react"

interface TicketProps {
  serialNumber: string
  validated?: boolean
  eventName: string
  date: string
  time: string
  price: string
  location: string
  venue: string
  image: string
}

export function TicketCard({
  serialNumber,
  validated,
  eventName,
  date,
  time,
  price,
  location,
  venue,
  image,
}: TicketProps) {
  return (
    <div className="h-full">
      <div className="flex flex-col h-full bg-[#faf9f6] rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative w-full h-48">
          <div className="absolute top-4 left-4 z-10">
            <h3 className="text-black bg-white/80 backdrop-blur-sm font-semibold text-lg tracking-wide">Events Parlour</h3>
          </div>
          <Image 
            src={image || "/placeholder.svg"} 
            alt={`${eventName} event image`} 
            fill 
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-wider text-neutral-600">LIVE MUSIC</p>
              <h1 className="text-xl font-bold tracking-tight">{eventName}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-neutral-100">{date}</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-neutral-100">{time}</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-neutral-100">{price}</span>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-neutral-600">
                {venue}
                <br />
                {location}
              </p>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Ticket No.</p>
                <p className="font-mono text-base">{serialNumber}</p>
                {validated && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                    Validated
                  </span>
                )}
              </div>
              <QRCode className="h-12 w-12 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}