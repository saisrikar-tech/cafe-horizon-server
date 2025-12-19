const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  productSchema,

  shakesSchema,
  hotBeveragesSchema,
  mocktailsSchema,
  dessertsSchema,

  breakfastSchema,
  soupsSchema,
  appetizersSchema,
  snacksSchema,
  pizzasSchema,
  pastasSchema,

  orderSchema,
  userSchema
} = require("./schema");

// ==========================
// MODELS
// ==========================
const productsModel = mongoose.model("products", productSchema);

const shakesModel = mongoose.model("shakes", shakesSchema, "newshakes");
const hotBeveragesModel = mongoose.model("hotbeverages", hotBeveragesSchema);
const mocktailsModel = mongoose.model("mocktails", mocktailsSchema);
const dessertsModel = mongoose.model("desserts", dessertsSchema);

const breakfastModel = mongoose.model("breakfast", breakfastSchema);
const soupsModel = mongoose.model("soups", soupsSchema);
const appetizersModel = mongoose.model("appetizers", appetizersSchema);
const snacksModel = mongoose.model("snacks", snacksSchema);
const pizzasModel = mongoose.model("pizzas", pizzasSchema);
const pastasModel = mongoose.model("pastas", pastasSchema);

const orderModel = mongoose.model("orders", orderSchema);
const userModel = mongoose.model("users", userSchema);

// ==========================
// GENERIC HELPERS
// ==========================
const fetchAll = (model) => model.find();
const insertMany = (model, data) => model.insertMany(data);

// ==========================
// PRODUCTS
// ==========================
const fetchAllProducts = () => fetchAll(productsModel);
const addProduct = (data) => productsModel.create(data);

// ==========================
// CATEGORY FUNCTIONS
// ==========================
const fetchShakes = () => fetchAll(shakesModel);
const addShakes = (data) => insertMany(shakesModel, data);

const fetchHotBeverages = () => fetchAll(hotBeveragesModel);
const addHotBeverages = (data) => insertMany(hotBeveragesModel, data);

const fetchMocktails = () => fetchAll(mocktailsModel);
const addMocktails = (data) => insertMany(mocktailsModel, data);

const fetchDesserts = () => fetchAll(dessertsModel);
const addDesserts = (data) => insertMany(dessertsModel, data);

const fetchBreakfast = () => fetchAll(breakfastModel);
const addBreakfast = (data) => insertMany(breakfastModel, data);

const fetchSoups = () => fetchAll(soupsModel);
const addSoups = (data) => insertMany(soupsModel, data);

const fetchAppetizers = () => fetchAll(appetizersModel);
const addAppetizers = (data) => insertMany(appetizersModel, data);

const fetchSnacks = () => fetchAll(snacksModel);
const addSnacks = (data) => insertMany(snacksModel, data);

const fetchPizzas = () => fetchAll(pizzasModel);
const addPizzas = (data) => insertMany(pizzasModel, data);

const fetchPastas = () => fetchAll(pastasModel);
const addPastas = (data) => insertMany(pastasModel, data);

// ==========================
// ORDERS
// ==========================
const createOrder = (data) => new orderModel(data).save();
const fetchAllOrders = () => fetchAll(orderModel);

// ==========================
// AUTH
// ==========================
const createUser = async (data) => {
  const existing = await userModel.findOne({ email: data.email });
  if (existing) return { success: false, message: "Email already exists" };

  const hashed = await bcrypt.hash(data.password, 10);

  const user = new userModel({ ...data, password: hashed });
  const saved = await user.save();

  return { success: true, message: "Registered successfully", user: saved };
};

const loginUserService = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { status: true, message: "Login successful", user, token };
};

module.exports = {
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
  loginUserService
};
