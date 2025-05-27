import express from "express";
import { configDotenv } from "dotenv";
import { connectDatabase } from "./database";
import cors from "cors";
import {
  authRouter,
  foodRouter,
  categoryRouter,
  foodOrderRouter,
} from "./routers";
const app = express();

configDotenv();
connectDatabase();
const port = 8000;
app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/food", foodRouter);
app.use("/food-category", categoryRouter);
app.use("/food-order", foodOrderRouter);

app.listen(port, () => console.log(`http://localhost:${port}`));
