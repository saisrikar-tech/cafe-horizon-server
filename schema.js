const mongoose = require("mongoose");

// ==========================
// COMMON SCHEMAS
// ==========================

// WITHOUT isVeg
const basicFoodSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String
});

// WITH isVeg
const vegFoodSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String,
  isVeg: { type: Boolean, default: true }
});

// ==========================
// PRODUCT
// ==========================
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number
});

// ==========================
// WITHOUT isVeg
// ==========================
const shakesSchema = basicFoodSchema;
const hotBeveragesSchema = basicFoodSchema;
const mocktailsSchema = basicFoodSchema;
const dessertsSchema = basicFoodSchema;

// ==========================
// WITH isVeg
// ==========================
const breakfastSchema = vegFoodSchema;
const soupsSchema = vegFoodSchema;
const appetizersSchema = vegFoodSchema;
const snacksSchema = vegFoodSchema;
const pizzasSchema = vegFoodSchema;
const pastasSchema = vegFoodSchema;

// ==========================
// ORDER
// ==========================
const orderSchema = new mongoose.Schema({
  orderId: Number,
  customerName: String,
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  paymentType: String,
  status: { type: String, default: "Pending" },
  orderDate: { type: Date, default: Date.now },
  discountPercentage: { type: Number, default: 0 },
  couponPercentage: { type: Number, default: 0 }
});

// ==========================
// USER
// ==========================
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  DOB: { type: Date },
  gender: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
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
};
