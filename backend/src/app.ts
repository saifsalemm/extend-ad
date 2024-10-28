import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { commentRouter } from "./Routes/commentRoutes.js";
import { productRouter } from "./Routes/productRoutes.js";
import { reviewRouter } from "./Routes/reviewRoutes.js";
import { userRouter } from "./Routes/userRoutes.js";

dotenv.config();

export const app = express();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type, Authorization, Credentials"
  );
  next();
});

app.use((_, _res, next) => {
  cors({
    origin: "http://localhost:5173",
  });
  next();
});

app.use(express.json());

app.use("/v1/users", userRouter);
app.use("/v1/products", productRouter);
app.use("/v1/comments", commentRouter);
app.use("/v1/reviews", reviewRouter);
