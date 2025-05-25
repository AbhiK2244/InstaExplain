import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getExplanationFromGemini } from "./service/gemini.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({status: 'ok', message: 'Server is running!'});
});

app.post("/explain", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ success: false, explanation: "Text is required." });
  }

  const result = await getExplanationFromGemini(text);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
