import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import selectDate from "@/store/dateStore";

export function DatePicker() {
  const {selectedDate, setSelectedDate} = selectDate();
  
  return (
    <div className="flex justify-center items-center w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-center text-center font-normal bg-gray-900 border-gray-500/30 hover:bg-gray-800 hover:border-gray-500/50 text-gray-200",
              !selectedDate && "text-gray-400"
            )}
          >
            {/* <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" /> */}
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-900 border border-gray-500/30 flex justify-center" align="center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
            className="bg-gray-900 text-gray-200"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}