import express from "express";
const authRoutes = express.Router();

authRoutes.post("/login");
authRoutes.post("/signup");

export default authRoutes;
