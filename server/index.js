import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: function(origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
      ];
      
      // Allow all Vercel preview deployments
      if (!origin || 
          allowedOrigins.includes(origin) || 
          origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));
  
  // Handle preflight requests explicitly
  app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB connected successfully"))
   .catch((err) => console.log("MongoDB connection error", err));

// Routes
app.use("/api/auth",authRoutes);
app.use("/api/books",bookRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api", (req,res) => {
    res.json({
        success: true,
        message: "Audify server is running!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});