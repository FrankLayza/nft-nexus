import express from "express";

const app = express();
const PORT = 4500;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("NFT backend is running");
});
app.listen(PORT, () => {
  console.log(`server started on  localhost:${PORT}`);
});
