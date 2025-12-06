const { fetchAllProducts, addProduct, fetchAllShakes, addShakes, createOrder, fetchAllOrders, createUser, loginUserService } = require("./ProductsService");

// Products
const getAllProducts = async (req, res) => {
  try {
    const products = await fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const saveProduct = async (req, res) => {
  try {
    const saved = await addProduct(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Shakes
const getShakes = async (req, res) => {
  try {
    const shakes = await fetchAllShakes();
    res.status(200).json(shakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const saveShakes = async (req, res) => {
  try {
    const saved = await addShakes(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Orders
const saveOrder = async (req, res) => {
  try {
    const savedOrder = await createOrder(req.body);
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};
const getOrders = async (req, res) => {
  try {
    const savedOrders = await fetchAllOrders();
    res.status(200).json(savedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Register User
const registerUser = async (req, res) => {
  try {
    const savedUser = await createUser(req.body);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

const loginUser = async (req, res) => {
  try {
    const loggedIn = await loginUserService(req.body);
    res.status(200).json(loggedIn);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllProducts, saveProduct, getShakes, saveShakes, saveOrder,getOrders,registerUser,loginUser };
