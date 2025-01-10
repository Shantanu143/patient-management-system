import express from "express";
import {
  loginAdmin,
  registerDoctor,
  updateDoctor,
} from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login-admin", loginAdmin);
adminRouter.post("/register-doctor", authAdmin, registerDoctor);
adminRouter.put("/update-doctor", authAdmin, updateDoctor);

export default adminRouter;
