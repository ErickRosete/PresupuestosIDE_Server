const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true
  },
  imageLinks: [String],
  details: String,
  shortDescription: String,
  totalQuantity: Number,
  currentQuantity: Number,
  codes: [String],
});

module.exports = mongoose.model("Product", productSchema);
