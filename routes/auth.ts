import express, { Request, Response } from "express";
import { loginUser, registerUser } from "../contollers/auth";

const userRouter = express.Router();

// Register route
userRouter.post("/register", registerUser);

// Login route
userRouter.post("/login", loginUser);

export default userRouter;
