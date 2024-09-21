import express from "express";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import userRoutes from "./routes/user.routes.js";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => console.log("Server on port:", PORT));
