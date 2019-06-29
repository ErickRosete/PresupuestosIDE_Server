var mongoose = require("mongoose");

var auxMaterialSchema = new mongoose.Schema({
    materialKey: String,
    name: String,
    materialQuantity: Number,
    totalQuantity: Number,
    measurementUnit: String,
    unitPrice: Number,
    totalPrice: Number,
    quantity: Number,
    fromExcel: Boolean
});


module.exports = mongoose.model("AuxMaterial", auxMaterialSchema);