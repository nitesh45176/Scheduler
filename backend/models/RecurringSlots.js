import mongoose from "mongoose";

const RecurringSlotSchema = new mongoose.Schema(
  {
    weekday: { type: Number, required: true }, 
    start_time: { type: String, required: true }, 
    end_time: { type: String, required: true },   
  },
  { timestamps: true }
);

const RecurringSlot = mongoose.model("RecurringSlot", RecurringSlotSchema);
export default RecurringSlot