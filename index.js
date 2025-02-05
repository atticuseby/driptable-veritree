import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow Shopify's domain to access this API
const corsOptions = {
    origin: ["https://driptable.com"], // Allow Shopify domain
    methods: "GET",
    allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));

// API Route for Veritree stats
const statsHandler = require("./stats.js");
app.get("/api/stats", statsHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
