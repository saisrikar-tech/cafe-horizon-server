const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const adminMiddleware = require("./adminMiddleware");
const {
  adminSchema,
  orderSchema,
  userSchema,
  breakfastSchema,
  soupsSchema,
  appetizersSchema,
  snacksSchema,
  pizzasSchema,
  pastasSchema,
  shakesSchema,
  hotBeveragesSchema,
  mocktailsSchema,
  dessertsSchema,
} = require("./schema");

const router = express.Router();

// ===== MODELS =====
const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema);
const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);
const User = mongoose.models.users || mongoose.model("users", userSchema);

const categoryModels = {
  breakfast: mongoose.model("breakfast", breakfastSchema),
  soups: mongoose.model("soups", soupsSchema),
  appetizers: mongoose.model("appetizers", appetizersSchema),
  snacks: mongoose.model("snacks", snacksSchema),
  pizzas: mongoose.model("pizzas", pizzasSchema),
  pastas: mongoose.model("pastas", pastasSchema),
  shakes: mongoose.model("shakes", shakesSchema, "newshakes"),
  hotbeverages: mongoose.model("hotbeverages", hotBeveragesSchema),
  mocktails: mongoose.model("mocktails", mocktailsSchema),
  desserts: mongoose.model("desserts", dessertsSchema),
};

// ===== ADMIN REGISTER =====
// User fills: name, email, password
// User must provide secretKey to prove they are allowed to register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    // Validate all fields
    if (!name || !email || !password || !secretKey) {
      return res.status(400).json({ message: "All fields are required including secret key" });
    }

    // Check secret key matches .env
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid secret key. Access denied." });
    }

    // Check if admin already exists
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      admin: { name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== ADMIN LOGIN =====
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Credentials are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== ALL ROUTES BELOW ARE PROTECTED =====
router.use(adminMiddleware);

// ===== ORDERS =====

// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.patch("/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order updated", order: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete order
router.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== USERS =====

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== PRODUCTS =====

// Get all products in a category
router.get("/products/:category", async (req, res) => {
  try {
    const model = categoryModels[req.params.category];
    if (!model) return res.status(404).json({ message: "Category not found" });
    const items = await model.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product to a category
router.post("/products/:category", async (req, res) => {
  try {
    const model = categoryModels[req.params.category];
    if (!model) return res.status(404).json({ message: "Category not found" });
    const saved = await model.create(req.body);
    res.status(201).json({ message: "Product added", product: saved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit product in a category
router.put("/products/:category/:id", async (req, res) => {
  try {
    const model = categoryModels[req.params.category];
    if (!model) return res.status(404).json({ message: "Category not found" });
    const updated = await model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated", product: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product from a category
router.delete("/products/:category/:id", async (req, res) => {
  try {
    const model = categoryModels[req.params.category];
    if (!model) return res.status(404).json({ message: "Category not found" });
    await model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;