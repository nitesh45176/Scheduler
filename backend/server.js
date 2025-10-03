import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import slotRoutes from './routes/slot.Routes.js';

dotenv.config();

const app = express();

// CORS config
app.use(cors({
  origin: [
    "https://scheduler.vercel.app",
    "https://scheduler-git-main-nitesh45176s-projects.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// Correct route mounting
app.use('/slots', slotRoutes);

// DB connection
connectDB().then(() => console.log("✅ DB connected")).catch(err => console.error(err));

app.get('/', (req, res) => res.send('Backend is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
