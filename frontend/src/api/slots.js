import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change when deploying
});

// Get slots for a week
export const getWeekSlots = (startDate) =>
  API.get(`/slots/week`, { params: { start: startDate } });

// Create new slot
export const createSlot = (slotData) =>
  API.post(`/slots`, slotData);

// Update slot (exception)
export const updateSlot = (slotId, data) =>
  API.put(`/slots/${slotId}/exception`, data);  // ✅ added /exception

// Delete slot for specific date
export const deleteSlotForDate = (slotId, date) =>
  API.delete(`/slots/${slotId}/exception`, { params: { date } });  // ✅ added /exception
