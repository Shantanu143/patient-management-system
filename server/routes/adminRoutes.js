import express from "express";
import { loginAdmin } from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.post("/login-admin", loginAdmin);

export default adminRouter;
