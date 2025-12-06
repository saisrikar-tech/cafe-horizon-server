const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { productSchema, shakesSchema, orderSchema, userSchema } = require("./schema");

// Models
const productsModel = mongoose.model("Products", productSchema);
const shakesModel = mongoose.model("newshakes", shakesSchema, "newshakes"); // forced collection name
const orderModel = mongoose.model("Orders", orderSchema);
const userModel = mongoose.model("Users", userSchema);

// ==========================
// PRODUCTS
// ==========================
const fetchAllProducts = () => productsModel.find();
const addProduct = (newProduct) => productsModel.create(newProduct);

// ==========================
// SHAKES
// ==========================
const fetchAllShakes = () => shakesModel.find();
const addShakes = (newShakes) => shakesModel.insertMany(newShakes);

// ==========================
// ORDERS
// ==========================
const createOrder = (newOrder) => {
  const order = new orderModel(newOrder);
  return order.save();
};

const fetchAllOrders = () => orderModel.find();

// ==========================
// USERS
// ==========================

const createUser = async (data) => {
  const { name, email, phone, password, DOB, gender, address } = data;

  // check if email already exists
  const existing = await userModel.findOne({ email });
  if (existing) {
    return { success: false, message: "Email already exists" };
  }

  //  hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new userModel({
    name,
    email,
    phone,
    password: hashedPassword,   // ← stores hashed password
    DOB,
    gender,
    address
  });

  const savedUser = await user.save();

  return {
    success: true,
    message: "User registered successfully",
    user: savedUser,
  };
};


//============= LOGIN =================

const loginUserService = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  // Compare entered password with hashed password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    status: true,
    message: "Login successful",
    user,
    token,
  };
};

// EXPORTS
module.exports = {
  fetchAllProducts,
  addProduct,
  fetchAllShakes,
  addShakes,
  createOrder,
  fetchAllOrders,
  createUser,
  loginUserService,
};
