import express from "express";
import { verifyToken } from "../controllers/auth";
import { addPlan, getPlanById, getPlanByName, getPlansTable, removePlan } from "../controllers/plan";
import { admin } from "../setUp";
import { Plan } from "../types/Plan";

const router = express.Router();

router.get("/plans", getPlansTable)

router.get("/plans/:id", getPlanById)

router.delete("/plans/:id", removePlan)

router.post("/plans/", addPlan)

export default router 
