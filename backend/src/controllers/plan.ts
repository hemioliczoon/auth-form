import { Request, Response } from "express";
import { Plan } from "../types/Plan";
import { db } from "../db";
import { verifyToken } from "./auth";
import { admin } from "../setUp";

// get user with matching fields
export const getPlanByName = (name: string): Plan | undefined => {
  const table = db.getTable("plans");

  if (!table) return undefined;

  return table.find((plan) => plan.name === name);
}

export const getPlanById = (req: Request<any>, res: Response<any>) => {
  const plan = db.getById("plans", Number(req.params.id))
  if (!plan) return res.status(500).json("something went wrong")

  return res.status(200).json(plan)
}

export const getPlansTable = (req: Request<any>, res: Response<any>) => {
  const table = db.getTable("plans") as Plan[] | undefined

  if (!table) return res.status(500).json("can't find plans table")

  res.status(200).json(table)
}

export const addPlan = (req: Request<any>, res: Response<any>) => {
  // TODO: change the way this handled probably
  //                                        admin comes from the import
  if (!verifyToken(res, req.cookies.accessToken, admin)) return res.status(401)

  const plan = req.body as Plan
  if (getPlanByName(plan.name)) return res.status(400).json("plan already exists")

  const status = db.addToTable("plans", plan)
  if (!status) return res.status(500).json("something went wrong")

  res.status(200).json(plan)
}

export const removePlan = (req: Request<any>, res: Response<any>) => {
  // TODO: change the way this handled probably
  //                                        admin comes from the import
  if (!verifyToken(res, req.cookies.accessToken, admin)) return
    
  const status = db.removeFromTable("plans", Number(req.params.id)) ;
  if (!status) return res.status(500).json("something went wrong")

  res.status(200).json(req.params.id)
}

