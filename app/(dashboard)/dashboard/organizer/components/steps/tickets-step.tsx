import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormProps, EventFormData } from "../create-event-form"

const ticketTypes = [
  { value: "regular", label: "Regular" },
  { value: "early-bird", label: "Early Bird" },
  { value: "vip", label: "VIP" },
  { value: "vvip", label: "VVIP" },
  { value: "custom", label: "Custom" },
]

export function TicketsStep({ form }: FormProps) {
  const { setValue, watch } = form
  const [tickets, setTickets] = useState<EventFormData["tickets"]>([
    { name: "General Admission", price: 0, quantity: 100 },
  ])

  const pricingType = watch("pricingType")

  const addTicketType = () => {
    setTickets([...tickets, { name: "", price: 0, quantity: 0 }])
  }

  const updateTicket = (index: number, field: keyof EventFormData["tickets"][number], value: string | number) => {
    const updatedTickets = tickets.map((ticket, i) =>
      i === index ? { ...ticket, [field]: field === "name" ? value : Number(value) } : ticket,
    )
    setTickets(updatedTickets)
    setValue("tickets", updatedTickets)
  }

  if (pricingType === "free") {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">This is a free event. No ticket pricing is required.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Total Available Spots</Label>
          <Input
            type="number"
            id="quantity"
            value={tickets[0].quantity}
            onChange={(e) => updateTicket(0, "quantity", e.target.value)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket, index) => (
        <div key={index} className="space-y-2 p-4 border rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ticket Type</Label>
              <Select onValueChange={(value) => updateTicket(index, "name", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ticket type" />
                </SelectTrigger>
                <SelectContent>
                  {ticketTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {ticket.name === "custom" && (
              <div className="space-y-2">
                <Label>Custom Ticket Name</Label>
                <Input
                  placeholder="Enter custom ticket name"
                  value={ticket.name === "custom" ? "" : ticket.name}
                  onChange={(e) => updateTicket(index, "name", e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Price"
                value={ticket.price}
                onChange={(e) => updateTicket(index, "price", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                placeholder="Quantity"
                value={ticket.quantity}
                onChange={(e) => updateTicket(index, "quantity", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" onClick={addTicketType} variant="outline">
        Add Ticket Type
      </Button>
      <div className="space-y-2">
        <Label>Currency</Label>
        <RadioGroup onValueChange={(value) => setValue("currency", value as EventFormData["currency"])}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="KES" id="kes" />
            <Label htmlFor="kes">KES</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="USD" id="usd" />
            <Label htmlFor="usd">USD</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

