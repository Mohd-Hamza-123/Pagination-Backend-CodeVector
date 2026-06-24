const app = express();
import cors from "cors"
import express from "express";
import connectDB from "./db/db.js"
import dotenv from "dotenv";
import productsRoute from "./products/products.route.js"

dotenv.config();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Route
app.use("/api/products", productsRoute);

// Start server
const PORT = 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port : ", PORT)
    })
})
.catch((error) => {
        console.error("Error connecting to the database:", error);
        process.exit(1)
})
