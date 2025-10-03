import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import slotRoutes from './routes/slot.Routes.js'; // adjust path if needed

dotenv.config();

const app = express();

// CORS config
app.use(cors({
  origin: 'https://scheduler.vercel.app',
  credentials: true,
}));

app.use(express.json());

// Route prefix
app.use('/slots', slotRoutes); // frontend calls /slots/week

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
