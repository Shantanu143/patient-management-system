import express from "express";
import { loginAdmin, registerDoctor } from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login-admin", loginAdmin);
adminRouter.post("/register-doctor", authAdmin, registerDoctor);

export default adminRouter;
