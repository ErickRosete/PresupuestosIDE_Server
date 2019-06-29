var mongoose = require("mongoose");

var auxMaterialSchema = new mongoose.Schema({
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material"
    },
    quantity: Number
});


module.exports = mongoose.model("AuxMaterial", auxMaterialSchema);