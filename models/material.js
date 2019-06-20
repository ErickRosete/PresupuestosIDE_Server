var mongoose = require("mongoose");

var materialSchema = new mongoose.Schema({
    materialKey: {
        type: String,
        required: true
    },
    name: String,
    measurementUnit: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    fromExcel: Boolean
});


module.exports = mongoose.model("Material", materialSchema);