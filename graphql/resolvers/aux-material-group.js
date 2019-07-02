const AuxMaterialGroup = require("../../models/aux-material-group");
const Concept = require("../../models/concept");
const { transformAuxMaterialGroup } = require("./merge");

module.exports = {
  auxMaterialGroups: async () => {
    try {
      const auxMaterialGroups = await AuxMaterialGroup.find();
      return auxMaterialGroups.map(auxMaterialGroup => {
        return transformAuxMaterialGroup(auxMaterialGroup);
      });
    } catch (err) {
      throw err;
    }
  },

  auxMaterialGroup: async args => {
    try {
      const auxMaterialGroup = await AuxMaterialGroup.findById(args.id);
      return transformAuxMaterialGroup(auxMaterialGroup);
    } catch (err) {
      throw err;
    }
  },

  createAuxMaterialGroup: async args => {
    try {
      console.log(args)
      const auxMaterialGroup = AuxMaterialGroup({
        ...args.auxMaterialGroupInput
      });

      const result = await auxMaterialGroup.save();
      console.log(result)
      return transformAuxMaterialGroup(result);
    } catch (err) {
      throw err;
    }
  },

  updateAuxMaterialGroup: async args => {
    try {
      const auxMaterialGroup = await AuxMaterialGroup.findOneAndUpdate(
        { _id: args.id },
        { ...args.auxMaterialGroupInput },
        { new: true }
      );

      return transformAuxMaterialGroup(auxMaterialGroup);
    } catch (err) {
      throw err;
    }
  },

  deleteAuxMaterialGroup: async args => {
    try {
      //Delete MaterialGroup
      const auxMaterialGroup = await AuxMaterialGroup.findByIdAndDelete(args.id);

      //Delete Concept Reference
      const concepts = await Concept.find({ auxMaterialGroups: args.id });
      for (const concept of concepts) {
        const auxMaterialGroupIndex = concept.auxMaterialGroups.findIndex((auxMaterialGroup) => auxMaterialGroup == args.id);
        concept.price -= concept.auxMaterialGroups[auxMaterialGroupIndex].totalPrice;
        // concept.price -= auxMaterialGroup.totalPrice;
        concept.auxMaterialGroups.splice(auxMaterialGroupIndex, 1);
        await concept.save();
      }

      return transformAuxMaterialGroup(auxMaterialGroup);
    } catch (err) {
      throw err;
    }
  }
};
