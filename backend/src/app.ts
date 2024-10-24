import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./Routes/userRoutes.js";

dotenv.config();

export const app = express();

const getDomain = (domain: string): string => {
  const allowedOrigins = ["http://localhost:5000"];

  return allowedOrigins.includes(domain) ? domain : allowedOrigins[0];
};

app.use((req, res, next) => {
  const domain = req.get("origin") ?? "https://beta.codebites.com";

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Expose-Headers", "set-cookie");
  res.header("Access-Control-Allow-Origin", getDomain(domain));
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

app.use((req, _res, next) => {
  const domain = req.get("origin") ?? "https://beta.codebites.com";

  cors({
    origin: getDomain(domain),
    credentials: true,
  });
  next();
});

app.use(express.json());

app.use("/v1/users", userRouter);
app.use("/v1/products", userRouter);
