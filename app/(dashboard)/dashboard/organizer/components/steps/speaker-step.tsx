"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormProps } from "../create-event-form"

export function SpeakersStep({ form }: FormProps) {
  const { watch, setValue } = form
  const [speakers, setSpeakers] = useState<{ name: string; bio: string }[]>([])
  const hasSpeakers = watch("hasSpeakers")
  const category = watch("category")

  const [vettedSpeakers, setVettedSpeakers] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    // Simulating fetching vetted speakers based on category
    if (category === "tech" || category === "business") {
      // In a real application, you would fetch this data from your API
      setVettedSpeakers([
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
        { id: "3", name: "Bob Johnson" },
      ])
    } else {
      setVettedSpeakers([])
    }
  }, [category])

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "", bio: "" }])
  }

  const updateSpeakers = (index: number, field: "name" | "bio", value: string) => {
    const updatedSpeakers = speakers.map((speaker, i) => (i === index ? { ...speaker, [field]: value } : speaker))
    setSpeakers(updatedSpeakers)
    setValue("speakers", updatedSpeakers)
  }

  const addVettedSpeaker = (speakerId: string) => {
    const speaker = vettedSpeakers.find((s) => s.id === speakerId)
    if (speaker) {
      setSpeakers([...speakers, { name: speaker.name, bio: "" }])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasSpeakers"
          checked={hasSpeakers}
          onCheckedChange={(checked) => setValue("hasSpeakers", checked as boolean)}
        />
        <Label htmlFor="hasSpeakers">This event has speakers</Label>
      </div>
      {hasSpeakers && (
        <div className="space-y-4">
          {(category === "tech" || category === "business") && (
            <div className="space-y-2">
              <Label>Add Vetted Speaker</Label>
              <Select onValueChange={addVettedSpeaker}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a vetted speaker" />
                </SelectTrigger>
                <SelectContent>
                  {vettedSpeakers.map((speaker) => (
                    <SelectItem key={speaker.id} value={speaker.id}>
                      {speaker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {speakers.map((speaker, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-md">
              <Input
                placeholder="Speaker Name"
                value={speaker.name}
                onChange={(e) => updateSpeakers(index, "name", e.target.value)}
              />
              <Input
                placeholder="Speaker Bio"
                value={speaker.bio}
                onChange={(e) => updateSpeakers(index, "bio", e.target.value)}
              />
            </div>
          ))}
          <Button type="button" onClick={addSpeaker} variant="outline">
            Add Custom Speaker
          </Button>
        </div>
      )}
    </div>
  )
}

