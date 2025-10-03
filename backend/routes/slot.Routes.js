// slot.Routes.js
import express from 'express';
import { createSlot, getWeekSlots, createOverride, deleteSlotForDate } from "../controllers/slot.Controller.js";

const router = express.Router();

router.post("/", createSlot);
router.get("/week", getWeekSlots);
router.put("/:id/exception", createOverride);
router.delete("/:id/exception", deleteSlotForDate);

export default router;
