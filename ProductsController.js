const {
  fetchAllProducts,
  addProduct,

  fetchShakes,
  addShakes,

  fetchHotBeverages,
  addHotBeverages,

  fetchMocktails,
  addMocktails,

  fetchDesserts,
  addDesserts,

  fetchBreakfast,
  addBreakfast,

  fetchSoups,
  addSoups,

  fetchAppetizers,
  addAppetizers,

  fetchSnacks,
  addSnacks,

  fetchPizzas,
  addPizzas,

  fetchPastas,
  addPastas,

  createOrder,
  fetchAllOrders,

  createUser,
  loginUserService,
  createRazorpayOrder,
  verifyRazorpayPayment,
  fetchOrdersByEmail
} = require("./ProductsService");

// PRODUCTS
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

// SHAKES
const getShakes = async (req, res) => {
  try {
    const shakes = await fetchShakes();
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

// HOT BEVERAGES
const getHotBeverages = async (req, res) => {
  try {
    const data = await fetchHotBeverages();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveHotBeverages = async (req, res) => {
  try {
    const saved = await addHotBeverages(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MOCKTAILS
const getMocktails = async (req, res) => {
  try {
    const data = await fetchMocktails();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveMocktails = async (req, res) => {
  try {
    const saved = await addMocktails(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DESSERTS
const getDesserts = async (req, res) => {
  try {
    const data = await fetchDesserts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveDesserts = async (req, res) => {
  try {
    const saved = await addDesserts(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// BREAKFAST
const getBreakfast = async (req, res) => {
  try {
    const data = await fetchBreakfast();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveBreakfast = async (req, res) => {
  try {
    const saved = await addBreakfast(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SOUPS
const getSoups = async (req, res) => {
  try {
    const data = await fetchSoups();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveSoups = async (req, res) => {
  try {
    const saved = await addSoups(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPETIZERS
const getAppetizers = async (req, res) => {
  try {
    const data = await fetchAppetizers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveAppetizers = async (req, res) => {
  try {
    const saved = await addAppetizers(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SNACKS
const getSnacks = async (req, res) => {
  try {
    const data = await fetchSnacks();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveSnacks = async (req, res) => {
  try {
    const saved = await addSnacks(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PIZZAS
const getPizzas = async (req, res) => {
  try {
    const data = await fetchPizzas();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const savePizzas = async (req, res) => {
  try {
    const saved = await addPizzas(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PASTAS
const getPastas = async (req, res) => {
  try {
    const data = await fetchPastas();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const savePastas = async (req, res) => {
  try {
    const saved = await addPastas(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ORDERS
const saveOrder = async (req, res) => {
  try {
    const savedOrder = await createOrder(req.body);
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};


// get orders by email 
const getOrders = async (req, res) => {
  try {
    const email = req.user.email; // comes from JWT token via authMiddleware
    const orders = await fetchOrdersByEmail(email);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// AUTH
const registerUser = async (req, res) => {
  try {
    const savedUser = await createUser(req.body);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const loggedIn = await loginUserService(req.body);
    res.status(200).json(loggedIn);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ==========================  payment integration ==========================
const createPaymentOrder = async (req, res) => {

  try {

    const { amount } = req.body;
    const order = await createRazorpayOrder(amount);

    res.status(200).json(order);

  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({
      message: "Payment creation failed",
      error: error.message
    });

  }

};


// ======================Verify Razorpay payment======================
const verifyPaymentController = async (req, res) => {

  try {

    const verificationResult = await verifyRazorpayPayment(req.body);

    if (verificationResult.success) {

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully"
      });

    } else {

      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });

    }

  } catch (error) {

    console.error("Payment verification error:", error);

    res.status(500).json({
      message: "Verification error",
      error: error.message
    });

  }

};

module.exports = {
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
  loginUser,

  createPaymentOrder,
  verifyPaymentController
};
