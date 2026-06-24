import { Pool } from "pg";
import dotenv from "dotenv";


dotenv.config();


export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

pool.on("error", (err) => {
    console.error("Unexpected PG error", err);
});

const connectDB = async () => {
    try {
        const client = await pool.connect()
        console.log("Connected to the database:");
        client.release();
    } catch (error) {
        console.error("Error connecting to the database:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

export default connectDB