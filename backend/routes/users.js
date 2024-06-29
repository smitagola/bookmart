import { db } from "../db.js";
import express from "express";
import { createUser, getUsers, getUser, forgotPassword, resetPassword } from "../controllers/user.js";

const router = express.Router();

//GET all user
router.get("/", getUsers);

//GET user form login
router.post("/login", getUser);

// CREATE new user
router.post("/new", createUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:id/:token", resetPassword);

export default router;