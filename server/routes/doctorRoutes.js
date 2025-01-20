import express from "express";
import {
  deletePatient,
  updatePatient,
  getAllPatient,
  getPatient,
  loginDoctor,
  registerPatient,
  getAllPrescriptions,
  addPrescription,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

// login
doctorRouter.post("/login-doctor", loginDoctor);
// patient
doctorRouter.post("/register-patient", authDoctor, registerPatient);
doctorRouter.get("/get-all-patients", authDoctor, getAllPatient);
doctorRouter.get("/get-patient/:id", authDoctor, getPatient);
doctorRouter.put("/update-patient", authDoctor, updatePatient);
doctorRouter.delete("/delete-patient", authDoctor, deletePatient);
// prescription
doctorRouter.post("/add-prescription", authDoctor, addPrescription);
doctorRouter.get("/get-all-prescription", authDoctor, getAllPrescriptions);

export default doctorRouter;
