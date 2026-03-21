// One-time script to create admin account
// Usage: node createAdmin.js
// All values come from your .env file — no hardcoding

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { adminSchema } = require("./schema");

const Admin = mongoose.model("admins", adminSchema);

const createAdmin = async () => {
  // Check all required env variables are set
  const { MONGODB_URL, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SECRET_KEY } = process.env;

  if (!MONGODB_URL || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_SECRET_KEY) {
    console.error("Missing required env variables. Make sure these are set in .env:");
    console.error("MONGODB_URL, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SECRET_KEY");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB Connected");

    // Check if admin already exists
    const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existing) {
      console.log("Admin already exists with this email!");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = new Admin({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      password: hashedPassword,
      role: "admin",
      secretKey: ADMIN_SECRET_KEY,
    });

    await admin.save();

    console.log("============================");
    console.log("Admin created successfully!");
    console.log(`Name:  ${ADMIN_NAME}`);
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log("============================");
    console.log("You can now login with these credentials.");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();