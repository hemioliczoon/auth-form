import express from "express";
import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../controllers/auth";


import { addUser, deleteUser, getUserById, getUserByName, getUsersTable } from "../controllers/user";
import { admin } from "../setUp";
import { User } from "../types/User";

const router = express.Router();


router.get("/users", getUsersTable)


router.get("/users/:id", getUserById)

router.delete("/users/:id", deleteUser)
// 

export default router;
