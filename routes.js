const express = require("express");
const { getAllProducts, saveProduct, getShakes, saveShakes, saveOrder, getOrders, registerUser, loginUser } = require("./ProductsController");
const authMiddleware = require("./authMiddleware");

const router = express.Router();
// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


router.use(authMiddleware);

// Products
router.get("/products", getAllProducts);
router.post("/products", saveProduct);

// Shakes
router.get("/shakes", getShakes);
router.post("/shakes", saveShakes);

// Orders
router.post("/orders", saveOrder);
router.get("/orders",getOrders)



module.exports = router;
