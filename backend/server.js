import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import slotRoutes from '../backend/routes/slot.Routes.js'; // adjust path if needed

dotenv.config();

const app = express();

// CORS config
const allowedOrigins = [
  "https://scheduler.vercel.app",
  "https://scheduler-git-main-nitesh45176s-projects.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests like Postman
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


app.use(express.json());

// Route prefix
app.use('/slots', slotRoutes); // frontend calls /slots/week

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
