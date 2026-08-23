import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRouter.js";
import { stripeWebhooks } from "./controllers/orderController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002",
  "http://localhost:3003",
  "https://fresh-cart-project-beta.vercel.app",
  "https://fresh-cart-liard-two.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("API is Working"));

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const startServer = async () => {
  await connectDB();
  connectCloudinary();

  if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
};

startServer();

export default app;