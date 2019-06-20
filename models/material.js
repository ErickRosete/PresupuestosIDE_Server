var mongoose = require("mongoose");

var materialSchema = new mongoose.Schema({
    materialKey: {
        type: String,
        required: true
    },
    name: String,
    description: String,
    measurementUnit: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number
});


module.exports = mongoose.model("Material", materialSchema);