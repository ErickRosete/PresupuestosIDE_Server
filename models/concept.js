var mongoose = require("mongoose");

var conceptSchema = new mongoose.Schema({
    conceptKey: {
        type: String,
        required: true
    },
    name: String,
    measurementUnit: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    materialGroups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaterialGroup"
    }],
});


module.exports = mongoose.model("Concept", conceptSchema);