import React, { useEffect, useState, useCallback } from "react";
import { getWeekSlots } from "../api/slots";
import WeekView from "../components/Schedule/WeekView";
import { startOfWeek, addWeeks, format } from "date-fns";
import { createSlot } from "../api/slots";

export default function Schedule() {
  const [weeks, setWeeks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [loading, setLoading] = useState(false);

  const fetchWeekSlots = useCallback(async (weekStart) => {
    try {
      setLoading(true);
      const startStr = format(weekStart, "yyyy-MM-dd");
      const { data } = await getWeekSlots(startStr);

      setWeeks((prev) => [...prev, { start: startStr, slots: data.dates }]);
    } catch (err) {
      console.error("Error fetching week slots", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeekSlots(currentWeek);
  }, [fetchWeekSlots, currentWeek]);

  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    if (bottom && !loading) {
      const nextWeek = addWeeks(currentWeek, weeks.length);
      fetchWeekSlots(nextWeek);
    }
  }, [currentWeek, weeks, loading, fetchWeekSlots]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSlotDelete = (slotId, date) => {
    setWeeks((prevWeeks) =>
      prevWeeks.map((week) => ({
        ...week,
        slots: week.slots.map((day) =>
          day.date === date
            ? {
                ...day,
                slots: day.slots.filter(
                  (slot) => slot.recurringSlotId !== slotId
                ),
              }
            : day
        ),
      }))
    );
  };

  // ✅ Add Slot handler
const handleAddSlot = async (date) => {
  // Find the day in current weeks
  const dayData = weeks
    .flatMap((week) => week.slots)
    .find((day) => day.date === date);

  if (dayData && dayData.slots.length >= 2) {
    alert("You can only add up to 2 slots per day");
    return; // prevent adding
  }

  try {
    const { data } = await createSlot({
      weekday: new Date(date).getDay(),
      start_time: "09:00",
      end_time: "10:00",
    });

    setWeeks((prevWeeks) =>
      prevWeeks.map((week) => ({
        ...week,
        slots: week.slots.map((day) =>
          day.date === date
            ? {
                ...day,
                slots: [...day.slots, { ...data, recurringSlotId: data._id }],
              }
            : day
        ),
      }))
    );
  } catch (err) {
    console.error("Error adding slot:", err);
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Schedule</h1>

      {weeks.map((week, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-lg font-semibold mb-2">
            Week starting {week.start}
          </h2>
          <WeekView
            slots={week.slots}
            onAddSlot={handleAddSlot}
            onChange={handleSlotDelete} // updated
          />
        </div>
      ))}

      {loading && (
        <p className="text-center text-gray-500">Loading more weeks...</p>
      )}
    </div>
  );
}
