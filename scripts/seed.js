import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.DATABASE_URL)

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

async function seed() {
    try {
        await pool.query(`
INSERT INTO products (
  name,
  price,
  category
)
SELECT  
'product ' || id AS name,
round(random() * 1000) AS price,
(
  ARRAY[
   'Electronics',
            'Books',
            'Clothing',
            'Sports',
            'Home'
  ]
)[FLOOR(random() * 5 + 1)] AS category
FROM generate_series(1,200000) id;
`)
    } catch (error) {
        console.error(error?.message)
    }
}


seed()