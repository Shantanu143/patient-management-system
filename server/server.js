import express from "express";
import cors from "cors";
import adminRouter from "./routes/adminRoutes";
// import connectMongoDb from "./config/connecrtMongoDb";
// import connectCloudinary from "./config/cloudinary";

const app = express();
const port = process.env.PORT || 4001;

// database connection function call
// connectMongoDb();

// cloudinary connection function call
// connectCloudinary();

// middlewares
app.use(express.json());

// middleware for parsing URL_encoded Data
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api endpoints

app.get("/admin", adminRouter);

// test api
app.get("/", (req, res) => {
  res.send("server is working ");
});

app.listen(port, () => {
  console.log("server started", port);
});
