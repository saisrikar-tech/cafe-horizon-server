const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");

const app = express();
app.use(express.json());

// FIX 1: Allow requests from your Vercel frontend
app.use(cors({
  origin: [
    "http://localhost:5173",                        // local dev
    "https://cafe-horizon-frontend.vercel.app",     // ← replace with your actual Vercel URL
  ],
  credentials: true,
}));

app.use("/api/v1/products", router);

// FIX 2: Health check route — Render needs this
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// FIX 3: Fallback PORT in case env variable is missing
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
    process.exit(1); // exit if DB connection fails
  });

// FIX 4: Keep alive ping — prevents Render free tier from sleeping
setInterval(() => {
  const url = process.env.RENDER_URL;
  if (url) {
    fetch(`${url}/health`)
      .then(() => console.log("Keep alive ping sent"))
      .catch(() => console.log("Ping failed"));
  }
}, 10 * 60 * 1000); // every 10 minutes

module.exports = app;