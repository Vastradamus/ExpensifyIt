const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true },
  totalSpend: { type: Number, required: true },
  subCategories: [{
    name: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true },
    totalSpend: { type: Number, required: true },
  }]
});

const receiptItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SharedItems",
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: categorySchema,
});

const receiptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: [receiptItemSchema],
    required: true,
  },
  total: { type: Number, required: true },
  categories: {
    type: [categorySchema],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  claudinary: { type: String },
});

module.exports = mongoose.model("Receipt", receiptSchema);
