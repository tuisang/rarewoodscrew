import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});