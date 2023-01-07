import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import { LoginData } from "../types/LoginData";
import { User } from "../types/User";
import { addUser, getUserByName } from "./user";

export const verifyToken = (res: Response<any>, token: any, user: User): boolean => {
  const tokenUser = jwt.verify(token, "secret") as JwtPayload

  if (user.name !== tokenUser.name || tokenUser.name !== "admin") {
    res.status(500).json("can't get user")
    return false
  }

  return true
}

export const login = async (req: Request<any>, res: Response<any>) => {
  const loginData = req.body as LoginData
  const user = getUserByName(loginData.name)

  // TODO: change this http code
  if (!user) return res.status(400).json("username or password is incorrect")

  const match = await bcrypt.compare(loginData.password.trim(), user.password)

  // TODO: change this http code
  if (!match) return res.status(400).json("username or password is incorrect")

  const token = jwt.sign({ name: user.name, planId: user.planId }, "secret")
  const { password, ...other}  = user

  // i'm not sure if this will work properly
  // wish there was like a way to know
  res
  .cookie("accessToken", token, { httpOnly: true })
  .status(200)
  .json(other)
}

// TODO: refactor this
export const register = async (req: Request<any>, res: Response<any>) => {
  const user = req.body as User
  const id = await addUser(user)

  if (!id) return res.status(400).json("can't create a new user, perhaps this username is already in use")

  const { email, password, ...other}  = user
  return res.status(200).json(other)
}
