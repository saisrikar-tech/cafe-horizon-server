const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number
});

// Shakes Schema
const shakesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String,
  isVeg: { type: Boolean, default: true }
});

// Order Schema (ALL FIELDS OPTIONAL)
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


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  DOB: { type: Date },
  gender:String,
  address:String,
  createdAt: { type: Date, default: Date.now }
});




module.exports = { productSchema, shakesSchema, orderSchema,userSchema };
