import express from "express";
import "dotenv/config";
import cors from "cors";
import archiRouter from "./routes/architecture.js";
import webRouter from "./routes/webdev.js";

const app = express();

const { PORT, CORS_ORIGIN } = process.env;

app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.static("public")); // Serve static files from the 'public' folder
app.use(cors({ origin: CORS_ORIGIN })); // Allow cross-origin requests

app.use(archiRouter); // Use the router as middleware
app.use(webRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
