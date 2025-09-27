import React, { useEffect, useState, useCallback } from "react";
import { getWeekSlots } from "../api/slots";
import WeekView from "../components/Schedule/WeekView"
import { startOfWeek, addWeeks, format } from "date-fns";

export default function Schedule() {
  const [weeks, setWeeks] = useState([]); // store multiple weeks
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [loading, setLoading] = useState(false);

  // Fetch slots for a given week
  const fetchWeekSlots = useCallback(async (weekStart) => {
    try {
      setLoading(true);
      const startStr = format(weekStart, "yyyy-MM-dd");
      const { data } = await getWeekSlots(startStr);

      setWeeks((prev) => [
        ...prev,
        { start: startStr, slots: data.dates }
      ]);
    } catch (err) {
      console.error("Error fetching week slots", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load (current week)
  useEffect(() => {
    fetchWeekSlots(currentWeek);
  }, [fetchWeekSlots, currentWeek]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    if (bottom && !loading) {
      const nextWeek = addWeeks(currentWeek, weeks.length); 
      fetchWeekSlots(nextWeek);
    }
  }, [currentWeek, weeks, loading, fetchWeekSlots]);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weekly Schedule</h1>

      {weeks.map((week, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-lg font-semibold mb-2">
            Week starting {week.start}
          </h2>
          <WeekView slots={week.slots} />
        </div>
      ))}

      {loading && <p className="text-center text-gray-500">Loading more weeks...</p>}
    </div>
  );
}
