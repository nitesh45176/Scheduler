import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import slotRoutes from './routes/slot.Routes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://scheduler.vercel.app",
  "https://scheduler-git-main-nitesh45176s-projects.vercel.app",
  "https://scheduler-b1p5.vercel.app"  // <-- add your new frontend here
];


app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow server-to-server / Postman
    if(allowedOrigins.includes(origin)){
      return callback(null, true);
    }
    console.warn("Blocked origin:", origin);
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true
}));


app.use(express.json());

// Correct route
app.use('/slots', slotRoutes);

connectDB().then(() => console.log("✅ DB connected")).catch(err => console.error(err));

app.get('/', (req,res) => res.send('Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
