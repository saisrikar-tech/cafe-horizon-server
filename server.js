const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");
const adminRouter = require("./adminRoutes"); // ← ADD THIS

const app = express();
app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      "https://cafe-horizon-frontend.vercel.app",
      "https://cafe-horizon-admin.vercel.app",
    ];
    if (!origin || origin.startsWith("http://localhost") || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use("/api/v1/products", router);
app.use("/api/v1/admin", adminRouter); // ← ADD THIS

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

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
    process.exit(1);
  });

setInterval(() => {
  const url = process.env.RENDER_URL;
  if (url) {
    fetch(`${url}/health`)
      .then(() => console.log("Keep alive ping sent"))
      .catch(() => console.log("Ping failed"));
  }
}, 10 * 60 * 1000);

module.exports = app;