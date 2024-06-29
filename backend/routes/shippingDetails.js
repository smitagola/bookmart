import express from "express";
import { getShippingDetails, saveShippingDetails } from "../controllers/shippingDetail.js";

const router = express.Router();

// GET user shipping details if is store in database
router.get("/user-address/:id", getShippingDetails);

// SAVE user shipping details in database
router.post("/save-address", saveShippingDetails);

export default router;