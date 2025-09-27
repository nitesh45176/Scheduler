import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);  // 👈 add this line

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
    
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};
