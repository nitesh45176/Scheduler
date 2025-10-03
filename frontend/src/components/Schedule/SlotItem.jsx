import React, { useState } from "react";
import { updateSlot, deleteSlotForDate } from "../../api/slots";

export default function SlotItem({ slot, date, onChange }) {
  const [start, setStart] = useState(slot.start_time);
  const [end, setEnd] = useState(slot.end_time);
  const [saved, setSaved] = useState(false);

  // Always use Mongo _id (recurringSlotId)
  const slotId = slot.recurringSlotId;

  const handleSave = async () => {
    try {
      if (!slotId) {
        console.error("No valid slot ID found:", slot);
        return;
      }

      console.log("Saving with slotId:", slotId);

      await updateSlot(slotId, {
        start_time: start,
        end_time: end,
        date,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      onChange();
    } catch (err) {
      console.error("Update failed:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
      }
    }
  };




const handleDelete = async () => {
  try {
    if (!slotId) {
      console.error("No valid slot ID found:", slot);
      return;
    }

    console.log("Deleting with slotId:", slotId);
    await deleteSlotForDate(slotId, date);

    // Pass the slotId and date to parent
    onChange(slotId, date);
  } catch (err) {
    console.error("Delete failed:", err);
    if (err.response) {
      console.error("Error response:", err.response.data);
    }
  }
};



  return (
    <div className="flex items-center gap-2">
      <input
        type="time"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="border rounded px-3 py-1 text-sm w-28"
      />
      <span>-</span>
      <input
        type="time"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="border rounded px-3 py-1 text-sm w-28"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Save
      </button>
      <button
        onClick={handleDelete}
        className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
      >
        🗑
      </button>

      {saved && <span className="ml-2 text-green-600 text-sm">Saved!</span>}
    </div>
  );
}
