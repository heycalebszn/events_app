import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/shared/date-time-picker"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

interface FormProps {
  setValue: (name: string, value: DateRange | string) => void;
}

export function DateTimeStep({ form }: { form: FormProps }) {
  const { setValue } = form
  const [date, setDate] = useState<DateRange | undefined>()

  const onDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    if (selectedDate?.from && selectedDate?.to) {
      setValue("dateRange", { from: selectedDate.from, to: selectedDate.to })
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Event Date</Label>
        <DatePickerWithRange date={date} onDateSelect={onDateSelect} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <input
            type="time"
            id="startTime"
            onChange={(e) => setValue("startTime", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <input
            type="time"
            id="endTime"
            onChange={(e) => setValue("endTime", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  )
}

