var mongoose = require("mongoose");

var auxMaterialGroupSchema = new mongoose.Schema({
  materialGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaterialGroup"
  },
  quantity: Number,
  unitPrice: Number,
  totalPrice: Number,
  Mo:Number,
  noMo:Number
});

module.exports = mongoose.model("AuxMaterialGroup", auxMaterialGroupSchema);
