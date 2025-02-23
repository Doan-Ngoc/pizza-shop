import express from "express";
import cors from "cors";
import pool from "./db";
require("dotenv").config();

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    console.log("Trying to connect...");
    const result = await pool.query("SELECT NOW()");
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

app.post("/order/create", async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      email,
      items,
      orderPrice,
      shippingFee,
      discount,
      couponCode,
    } = req.body;

    // Insert order into the database
    const result = await pool.query(
      `INSERT INTO orders 
      (customer_name, address, phone_number, email, order_price, shipping_fee, discount, coupon_code) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING order_id`,
      [
        name,
        address,
        phone,
        email || null,
        orderPrice,
        shippingFee,
        discount,
        couponCode || null,
      ]
    );

    const order_id = result.rows[0].order_id;

    // Insert items into order_items table (assuming you have an order_items table)
    for (const item of items) {
      const { id, name, quantity, priceOfOne, totalPrice, image, options } =
        item;
      await pool.query(
        `INSERT INTO order_items (order_id, food_id, food_name, quantity, image, price_of_one, total_price, options) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [order_id, id, name, quantity, image, priceOfOne, totalPrice, options]
      );
    }
    res.status(201).json({ message: "Order placed successfully", order_id });
  } catch (error) {
    console.error("Error inserting order:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/", (req, res) => {
  res.json("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
