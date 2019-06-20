var mongoose = require("mongoose");

var materialGroupSchema = new mongoose.Schema({
    materialGroupKey: {
        type: String,
        required: true
    },
    name: String,
    measurementUnit: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    materials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material"
    }],
});


module.exports = mongoose.model("MaterialGroup", materialGroupSchema);