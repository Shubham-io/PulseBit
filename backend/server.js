import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose, { connect } from "mongoose";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;
connectCloudinary();

try {
  mongoose.connect(`${URI}/prescripto`);
  console.log("connection successful");
} catch (error) {
  console.log("Error: ", error);
}

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://pulsebit-frontend.vercel.app"],
    credentials: true,
  })
);

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API working ");
});

app.listen(PORT, () => console.log("Server started", PORT));
