import { Router } from "express";
import {
  createUser,
  currentUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../Controllers/userController.js";
import { customerAuth } from "../Middleware/customerAuth.js";

export const userRouter: Router = Router();

userRouter.post("/login", loginUser);
userRouter.post("/", createUser);
userRouter.get("/me", customerAuth, currentUser);
userRouter.put("/", customerAuth, updateUser);
userRouter.delete("/", customerAuth, deleteUser);
