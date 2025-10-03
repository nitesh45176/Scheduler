import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {connectDB} from './configs/db.js'
import slotRoutes from '../backend/routes/slot.Routes.js'

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://scheduler.vercel.app",
  credentials: true
}));
app.use(express.json());


 app.use("/api/slots", slotRoutes);


connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
