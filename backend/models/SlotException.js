import mongoose  from "mongoose";

const SlotExceptionSchema = new mongoose.Schema(
  {
    recurringSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "RecurringSlot" },
    date: { type: String, required: true }, // YYYY-MM-DD
    start_time: { type: String },
    end_time: { type: String },
    type: { type: String, enum: ["override", "deleted"], required: true },
  },
  { timestamps: true }
);

const SlotException = mongoose.model("SlotException", SlotExceptionSchema);
export default SlotException