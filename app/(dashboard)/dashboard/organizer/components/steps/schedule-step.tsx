import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormProps, EventFormData } from "../create-event-form"

export function ScheduleStep({ form }: FormProps) {
  const { setValue } = form
  const [schedule, setSchedule] = useState<EventFormData["schedule"]>([{ time: "", activity: "" }])

  const addScheduleItem = () => {
    setSchedule([...schedule, { time: "", activity: "" }])
  }

  const updateSchedule = (index: number, field: keyof EventFormData["schedule"][number], value: string) => {
    const updatedSchedule = schedule.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setSchedule(updatedSchedule)
    setValue("schedule", updatedSchedule)
  }

  return (
    <div className="space-y-4">
      {schedule.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`time-${index}`}>Time</Label>
            <Input
              id={`time-${index}`}
              type="time"
              value={item.time}
              onChange={(e) => updateSchedule(index, "time", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`activity-${index}`}>Activity</Label>
            <Input
              id={`activity-${index}`}
              value={item.activity}
              onChange={(e) => updateSchedule(index, "activity", e.target.value)}
              placeholder="Activity description"
            />
          </div>
        </div>
      ))}
      <Button type="button" onClick={addScheduleItem} variant="outline">
        Add Schedule Item
      </Button>
    </div>
  )
}

