import express from "express";
import { addUser } from "../controllers/user";
import { User } from "../types/User";
import jwt from "jsonwebtoken";
import { LoginData } from "../types/LoginData";
import { login, register } from "../controllers/auth";

const router = express.Router();

router.post("/login", login)

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  })
})

router.post("/register", register)

export default router
