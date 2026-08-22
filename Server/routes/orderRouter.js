import express from 'express';
import authUser from '../middlewares/authUser.js'
import { getAllOrders, getOrderStatus, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import sellerAuth from '../middlewares/sellerAuth.js'

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", sellerAuth, getAllOrders);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.get("/status/:orderId", authUser, getOrderStatus);

export default orderRouter;