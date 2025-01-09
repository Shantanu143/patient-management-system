import express from "express";
import { doctorAuthTest, loginDoctor } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.post("/login-doctor", loginDoctor);
doctorRouter.get("/doctor-auth", authDoctor, doctorAuthTest);

export default doctorRouter;
