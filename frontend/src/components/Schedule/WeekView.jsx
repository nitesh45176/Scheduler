import React from "react";
import WeekRow from "./WeekRow";

export default function WeekView({ slots, onChange, onAddSlot }) {
  return (
    <div className="space-y-6">
      {slots.map((day) => (
        <WeekRow
          key={day.date}
          day={day}
          onChange={onChange}
          onAddSlot={onAddSlot}
        />
      ))}
    </div>
  );
}
