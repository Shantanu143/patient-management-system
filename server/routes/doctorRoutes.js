import express from "express";
import {
  deletePatient,
  updatePatient,
  getAllPatient,
  getPatient,
  loginDoctor,
  registerPatient,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.post("/login-doctor", loginDoctor);
doctorRouter.post("/register-patient", authDoctor, registerPatient);
doctorRouter.get("/get-all-patients", authDoctor, getAllPatient);
doctorRouter.get("/get-patient/:id", authDoctor, getPatient);
doctorRouter.put("/update-patient", authDoctor, updatePatient);
doctorRouter.delete("/delete-patient", authDoctor, deletePatient);

export default doctorRouter;
