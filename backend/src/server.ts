import express from "express";
import cors from 'cors';
import pool from './db'
require('dotenv').config();

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); 
    console.log("✅ Successfully connected to PostgreSQL!");
    res.json({ message: "PostgreSQL connected!", time: result.rows[0] });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM foods");
    res.json(result.rows); 
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/", (req, res) => {
  res.json("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
