import { Request, Response } from "express";
import { User } from "../types/User";
import { db } from "../db";
import bcrypt from "bcrypt";
import { verifyToken } from "./auth";
import { admin } from "../setUp";

export const getUserByName = (name: string): User | undefined => {
  const table = db.getTable("users");

  if (!table) return undefined;

  return table.find((user) => user.name === name);
}

export const getUsersTable = (req: Request<any>, res: Response<any>) => {
  // TODO: change the way this handled probably
  //                                        admin comes from the import
  if (!verifyToken(res, req.cookies.accessToken, admin)) return
  const table = db.getTable("users");

  if (!table) return res.status(500).json("no users database")

  return res.status(200).json(table)
}

export const addUser = async (user: User): Promise<number | undefined> => {
  // should probably return proper error here hehe
  if (getUserByName(user.name)) return undefined

  user.password = await bcrypt.hash(user.password.trim(), 10)

  return db.addToTable("users", user);
}

export const getUserById = (req: Request<any>, res: Response<any>) => { 
  const user = db.getById("users", Number(req.params.id)) as User | undefined

  if (!user) return res.status(500).json("can't get user")
  if (!verifyToken(res, req.cookies.accessToken, user)) return res.status(401)

  res.status(200).json(user)
}

export const deleteUser = (req: Request<any>, res: Response<any>) => {
  const user = db.getById("users", Number(req.params.id)) as User | undefined
  if (!user) return res.status(500).json("can't get user")

  // TODO: change the way this handled probably
  if (!verifyToken(res, req.cookies.accessToken, user)) return

  db.removeFromTable("users", Number(req.params.id)) ;
  res.status(200).json(req.params.id)
}

