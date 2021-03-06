var mongoose = require("mongoose");

var conceptSchema = new mongoose.Schema({
  conceptKey: {
    type: String,
    required: true
  },
  name: String,
  price: Number,
  Mo:Number,
  noMo:Number,
  measurementUnit:String,
  auxMaterialGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuxMaterialGroup"
    }
  ]
});

module.exports = mongoose.model("Concept", conceptSchema);
