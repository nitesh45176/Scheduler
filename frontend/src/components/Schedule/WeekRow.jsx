import React from "react";
import SlotItem from "./SlotItem";
import dayjs from "dayjs";

export default function WeekRow({ day, onChange, onAddSlot }) {
  // Format label using dayjs
  const label = dayjs(day.date).format("ddd, DD MMMM");
  // Example → "Mon, 22 September"

  return (
    <div className="flex flex-col border-b py-3">
      {/* Date Label */}
      <div className="text-gray-700 font-medium mb-2">{label}</div>

      {/* Slots */}
      <div className="space-y-2">
        {day.slots.length > 0 ? (
          day.slots.map((slot, index) => {
            const slotKey =
              slot.recurringSlotId ??
              slot._id ??
              slot.id ??
              `${day.date}-${index}`;
            return (
              <SlotItem
                key={slotKey}
                slot={slot}
                date={day.date}
                onChange={(slotId) => onChange(slotId, day.date)}
              />
            );
          })
        ) : (
          <div className="text-sm text-gray-400">No slots</div>
        )}
      </div>

      {/* Add Slot Button */}
      <button
        onClick={() => onAddSlot(day.date)}
        className={`mt-2 flex items-center text-sm ${
          day.slots.length >= 2
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500 hover:underline"
        }`}
        disabled={day.slots.length >= 2} // disable if already 2 slots
      >
        ＋ Add Slot
      </button>
    </div>
  );
}
