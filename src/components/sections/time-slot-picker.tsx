"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

// Generate time slots from 8am to 6pm in 30-minute intervals, skipping 1pm-2pm
function generateTimeSlots(): string[] {
  const slots: string[] = [];

  for (let hour = 8; hour < 18; hour++) {
    // Skip 1pm-2pm (13:00-14:00)
    if (hour === 13) continue;

    for (let minute = 0; minute < 60; minute += 30) {
      const time24 = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

      // Convert to 12-hour format
      const hour12 = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      const time12 = `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;

      slots.push(time12);
    }
  }

  return slots;
}

export function TimeSlotPicker({
  selectedTime,
  onTimeSelect,
}: TimeSlotPickerProps) {
  const timeSlots = generateTimeSlots();

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Select Time</label>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {timeSlots.map((slot) => (
          <Button
            key={slot}
            type="button"
            variant={selectedTime === slot ? "default" : "outline"}
            className={cn(
              "h-auto py-2 text-sm",
              selectedTime === slot && "ring-ring ring-2 ring-offset-2",
            )}
            onClick={() => onTimeSelect(slot)}
          >
            {slot}
          </Button>
        ))}
      </div>
    </div>
  );
}
