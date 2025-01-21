"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, AlertTriangle, Loader2 } from "lucide-react"

// Mock data for transferable tickets
const transferableTickets = [
  {
    id: 1,
    eventName: "Nairobi Tech Week",
    date: "Mar 18, 2024",
    location: "Nairobi, Kenya",
    ticketType: "VIP",
  },
  {
    id: 2,
    eventName: "Kenya Fintech Summit",
    date: "Apr 7, 2024",
    location: "Mombasa, Kenya",
    ticketType: "Regular",
  },
  {
    id: 3,
    eventName: "Agritech Innovation Forum",
    date: "May 22, 2024",
    location: "Nakuru, Kenya",
    ticketType: "Early Bird",
  },
]

export default function TicketTransfer() {
  const [selectedTicket, setSelectedTicket] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTransferring(true)

    // Validate form
    if (!selectedTicket || !recipientName || !recipientEmail) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      setIsTransferring(false)
      return
    }

    // Mock API call for ticket transfer
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Ticket Transferred",
      description: `Your ticket has been transferred to ${recipientName}`,
    })

    setIsTransferring(false)
    router.push("/dashboard/attendee/tickets")
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 lg:px-12">
      <h1 className="text-4xl font-bold mb-8">Transfer Ticket</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ticket Transfer</CardTitle>
          <CardDescription>Transfer your ticket to a friend</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTransfer}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticket">Select Ticket to Transfer</Label>
                <Select onValueChange={setSelectedTicket} required>
                  <SelectTrigger id="ticket">
                    <SelectValue placeholder="Select a ticket" />
                  </SelectTrigger>
                  <SelectContent>
                    {transferableTickets.map((ticket) => (
                      <SelectItem key={ticket.id} value={ticket.id.toString()}>
                        {ticket.eventName} - {ticket.ticketType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedTicket && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    {transferableTickets.map(
                      (ticket) =>
                        ticket.id.toString() === selectedTicket && (
                          <div key={ticket.id}>
                            <h3 className="font-semibold mb-2">{ticket.eventName}</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {ticket.date}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {ticket.location}
                              </div>
                            </div>
                          </div>
                        ),
                    )}
                  </CardContent>
                </Card>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Recipient&apos;s Name</Label>
                <Input id="name" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Recipient&apos;s  Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <div className="flex items-center text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <p className="text-sm">Once transferred, this ticket will no longer be valid for you.</p>
          </div>
          <Button onClick={handleTransfer} disabled={isTransferring}>
            {isTransferring ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Transferring...
              </>
            ) : (
              "Transfer Ticket"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

