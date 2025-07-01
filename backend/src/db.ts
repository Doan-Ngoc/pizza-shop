import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

//   pool.on('connect', () => {
//   console.log('✅ Connected to PostgreSQL');
// });
pool
  .query("SELECT NOW()")
  .then(() => console.log("✅ Connected to Supabase Postgres"))
  .catch((err) => console.error("❌ Connection failed:", err));

export default pool;
