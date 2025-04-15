import express from "express";
import "dotenv/config";
import cors from "cors";
import archiRouter from "./routes/architecture.js";
import webRouter from "./routes/webdev.js";
import arRouter from "./routes/ar.js";

const app = express();

const { PORT, CORS_ORIGIN } = process.env;
const allowedOrigins = CORS_ORIGIN.split(','); // Split CORS_ORIGIN by commas to get an array of origins

// CORS configuration to allow multiple origins
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests) or from allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.static("public")); // Serve static files from the 'public' folder

app.use(archiRouter); // Use the router as middleware
app.use(webRouter);
app.use(arRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
