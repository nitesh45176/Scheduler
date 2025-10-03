import RecurringSlot from "../models/RecurringSlots.js";
import SlotException from "../models/SlotException.js";


// Create recurring slot
export const createSlot = async (req, res) => {
  try {
    const { weekday, start_time, end_time } = req.body;
    const slot = await RecurringSlot.create({ weekday, start_time, end_time });
    res.json(slot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get slots for a week
export const getWeekSlots = async (req, res) => {
  try {
    const start = req.query.start;
    if (!start) return res.status(400).json({ error: "start query required" });

    const startDate = new Date(start);
    const dates = [...Array(7)].map((_, i) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      return d.toISOString().slice(0, 10);
    });

    const weekdays = dates.map((d) => new Date(d).getDay());
    const recurring = await RecurringSlot.find({ weekday: { $in: weekdays } }).lean();
    const exceptions = await SlotException.find({ date: { $in: dates } }).lean();

    const result = dates.map((date) => {
      const dayIndex = new Date(date).getDay();
      let slots = recurring
        .filter((r) => r.weekday === dayIndex)
        .map((r) => ({
          recurringSlotId: String(r._id),  // ✅ MUST be String(r._id)
          start_time: r.start_time,
          end_time: r.end_time,
          source: "recurring",
        }));

      const dayExceptions = exceptions.filter((e) => e.date === date);
      for (const ex of dayExceptions) {
        const idx = slots.findIndex((s) => s.recurringSlotId === String(ex.recurringSlotId));
        if (ex.type === "deleted" && idx !== -1) {
          slots.splice(idx, 1);
        } else if (ex.type === "override") {
          if (idx !== -1) {
            slots[idx].start_time = ex.start_time;
            slots[idx].end_time = ex.end_time;
            slots[idx].exception = true;
          } else {
            slots.push({
              recurringSlotId: String(ex.recurringSlotId),  // ✅ MUST be String()
              start_time: ex.start_time,
              end_time: ex.end_time,
              exception: true,
            });
          }
        } else if (!ex.recurringSlotId && ex.type !== "deleted") {
          slots.push({
            recurringSlotId: null,
            start_time: ex.start_time,
            end_time: ex.end_time,
            exception: true,
          });
        }
      }

      slots.sort((a, b) => a.start_time.localeCompare(b.start_time));
      if (slots.length > 2) slots = slots.slice(0, 2);

      return { date, slots };
    });

    res.json({ dates: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create override exception
export const createOverride = async (req, res) => {
  try {
    const { date, start_time, end_time } = req.body;
    const ex = await SlotException.create({
      recurringSlotId: req.params.id,
      date,
      start_time,
      end_time,
      type: "override",
    });
    res.json(ex);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete slot for specific date
export const deleteSlotForDate = async (req, res) => {
  try {
    const { date } = req.query;
    const ex = await SlotException.create({
      recurringSlotId: req.params.id,
      date,
      type: "deleted",
    });
    res.json(ex);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
