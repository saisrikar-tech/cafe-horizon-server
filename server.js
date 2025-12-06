const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/products", router);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

module.exports = app;
