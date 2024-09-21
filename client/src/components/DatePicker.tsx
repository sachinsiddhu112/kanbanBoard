"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker, Matcher } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface DatePickerProps {
  selectedDate: Date | null; // Ensuring this is Date | null
  setDate: (date: Date | null) => void; // Passing setDate as a prop
}

export const  DatePicker:React.FC<DatePickerProps>=({selectedDate,setDate}) => {
  //const [date, setDate] = React.useState<Date>()
return (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "w-[280px] justify-start text-left font-normal",
          !selectedDate && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {selectedDate? format(selectedDate, "PPP") : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={selectedDate ?? undefined} // Pass date directly, or undefined if null
        onSelect={(newDate) => {
          setDate(newDate || null); // Set newDate or null
        }}
        initialFocus
      />
    </PopoverContent>
  </Popover>
)
}
