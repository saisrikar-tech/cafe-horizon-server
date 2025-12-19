const express = require("express");
const {
  getAllProducts,
  saveProduct,

  getShakes,
  saveShakes,

  getHotBeverages,
  saveHotBeverages,

  getMocktails,
  saveMocktails,

  getDesserts,
  saveDesserts,

  getBreakfast,
  saveBreakfast,

  getSoups,
  saveSoups,

  getAppetizers,
  saveAppetizers,

  getSnacks,
  saveSnacks,

  getPizzas,
  savePizzas,

  getPastas,
  savePastas,

  saveOrder,
  getOrders,

  registerUser,
  loginUser
} = require("./ProductsController");

const authMiddleware = require("./authMiddleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Products 
router.get("/products", getAllProducts);
router.post("/products", saveProduct);

// Protect below routes
// router.use(authMiddleware);


// Shakes
router.get("/shakes", getShakes);
router.post("/shakes", saveShakes);

// Hot Beverages
router.get("/hotbeverages", getHotBeverages);
router.post("/hotbeverages", saveHotBeverages);

// Mocktails
router.get("/mocktails", getMocktails);
router.post("/mocktails", saveMocktails);

// Desserts
router.get("/desserts", getDesserts);
router.post("/desserts", saveDesserts);

// Breakfast
router.get("/breakfast", getBreakfast);
router.post("/breakfast", saveBreakfast);

// Soups
router.get("/soups", getSoups);
router.post("/soups", saveSoups);

// Appetizers
router.get("/appetizers", getAppetizers);
router.post("/appetizers", saveAppetizers);

// Snacks
router.get("/snacks", getSnacks);
router.post("/snacks", saveSnacks);

// Pizzas
router.get("/pizzas", getPizzas);
router.post("/pizzas", savePizzas);

// Pastas
router.get("/pastas", getPastas);
router.post("/pastas", savePastas);

// Orders
router.post("/orders", saveOrder);
router.get("/orders", getOrders);

module.exports = router;
