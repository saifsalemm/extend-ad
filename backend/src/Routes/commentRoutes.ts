import { Router } from "express";
import { createComment } from "../Controllers/commentController.js";

export const commentRouter: Router = Router();

commentRouter.post("/", createComment);
