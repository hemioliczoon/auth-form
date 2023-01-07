import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user";
import planRouter from "./routes/plan";
import authRouter from "./routes/auth";
import { db } from "./db";

import { addPlan } from "./controllers/plan";
import { Plan } from "./types/Plan";
import { setUp } from "./setUp";

const app = express();

setUp()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true")
  next()
})

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3030"
}))
app.use(cookieParser());

app.use("/auth", authRouter)
app.use(userRouter)
app.use(planRouter)

app.listen(4041);
