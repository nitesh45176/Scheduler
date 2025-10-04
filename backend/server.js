import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import slotRoutes from './routes/slot.Routes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://scheduler.vercel.app",
  "https://scheduler-git-main-nitesh45176s-projects.vercel.app",
  "https://scheduler-b1p5.vercel.app",
  "https://scheduler-b1p5-git-main-nitesh45176s-projects.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
    if (!origin) {
      console.log("✅ Allowing request with no origin");
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log("✅ Allowed origin:", origin);
      return callback(null, true);
    }
    
    // Block all other origins
    console.warn("❌ Blocked origin:", origin);
    return callback(new Error(`CORS policy: Origin ${origin} is not allowed`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/slots', slotRoutes);

app.get('/', (req, res) => res.send('Backend is running'));

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  if (err.message.includes('CORS')) {
    return res.status(403).json({ error: err.message });
  }
  res.status(500).json({ 
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Connect DB and start server
connectDB()
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.error("❌ DB connection failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));