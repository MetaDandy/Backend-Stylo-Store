import express from "express";
import {
  productRoutes,
  categoryRoutes,
  userRoutes,
  seasonRoutes,
  brandRoutes,
  orderRoutes,
  paymentRoutes,
  orderTypeRoutes,
  categoryTypeRoutes,
  roleRoutes,
} from "./routes/index.js";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";

//App config
const app = express();
const PORT = process.env.PORT || 3000;
connectCloudinary();

app.use(morgan("dev"));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api endpoints
app.use("/product", productRoutes);
app.use("/api", categoryRoutes);
app.use("/user", userRoutes);
app.use("/season", seasonRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/orderType", orderTypeRoutes);
app.use("/categoryType", categoryTypeRoutes);
app.use("/role", roleRoutes);

app.listen(PORT, () => console.log("Server on port:", PORT));
