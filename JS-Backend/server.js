import express from "express";
import cors from "cors"
import dotenv from "dotenv"


dotenv.config()
const app = express();
const PORT = 4500;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("NFT backend is running");
});
app.listen(PORT, () => {
  console.log(`server started on  localhost:${PORT}`);
});
