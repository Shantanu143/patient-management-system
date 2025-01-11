import express from "express";
import {
  deleteDoctor,
  getAllDoctors,
  loginAdmin,
  registerDoctor,
  updateDoctor,
} from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login-admin", loginAdmin);
adminRouter.post("/register-doctor", authAdmin, registerDoctor);
adminRouter.get("/get-all-doctors", authAdmin, getAllDoctors);
adminRouter.put("/update-doctor", authAdmin, updateDoctor);
adminRouter.delete("/delete-doctor", authAdmin, deleteDoctor);

export default adminRouter;
