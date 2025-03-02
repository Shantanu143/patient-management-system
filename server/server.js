import express from "express";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import dotenv from "dotenv";
import connectMongoDb from "./config/connectMongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import doctorRouter from "./routes/doctorRoutes.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

// env config
dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

// database connection function call
connectMongoDb();

// cloudinary connection function call
connectCloudinary();

// middlewares
app.use(express.json());

// middleware for passing cookies
app.use(cookieParser());

// middleware for parsing URL_encoded Data
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// api endpoints
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/auth", authRoutes);

// test api
app.get("/", (req, res) => {
  res.send("server is working");
});

app.listen(port, () => {
  console.log("server started", port);
});
