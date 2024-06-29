import express from "express";
import { placeOrder, getOrderDetails, orderDetails } from "../controllers/order.js";

const router = express.Router();

router.post("/place-order", placeOrder);
router.get("/get-order-details/:id", getOrderDetails);
router.get("/order-details", orderDetails);
export default router;