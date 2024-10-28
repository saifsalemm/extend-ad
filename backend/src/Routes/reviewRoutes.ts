import { Router } from "express";
import { createReview } from "../Controllers/reviewController.js";
import { customerAuth } from "../Middleware/customerAuth.js";

export const reviewRouter: Router = Router();

reviewRouter.post("/", customerAuth, createReview);
