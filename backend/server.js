import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import slotRoutes from './routes/slot.Routes.js'; 

dotenv.config();

const app = express();

// CORS config
const allowedOrigins = [
  "https://scheduler.vercel.app",
  "https://scheduler-git-main-nitesh45176s-projects.vercel.app"
];

app.use(cors({
  origin: '*',
  credentials: true
}));



app.use(express.json());

// Route prefix
app.use('/slots/week', slotRoutes); // frontend calls /slots/week

// Connect DB
connectDB().then(() => console.log("DB connected"));

app.get('/', (req,res) => res.send('Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
