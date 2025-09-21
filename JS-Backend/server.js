import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({path: './.env'});
import { setupSwagger } from "./swagger.js";
import nftRoutes from "./routes/nftRoutes.js";

const app = express();
const PORT = 4500;

app.use(express.json());
app.use(cors());

setupSwagger(app);

app.use("/api/v1", nftRoutes);
app.listen(PORT, () => {
  console.log(`server started on  localhost:${PORT}`);
});
