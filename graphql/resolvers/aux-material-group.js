const AuxMaterialGroup = require("../../models/aux-material-group");
const Concept = require("../../models/concept");
const {
  transformAuxMaterialGroup,
  auxMaterialGroupLoader
} = require("./merge");

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
      console.log("=====creatingAuxMaterialGroup")
      console.log(args);
      const auxMaterialGroup = AuxMaterialGroup({
        ...args.auxMaterialGroupInput
      });

      const result = await auxMaterialGroup.save();
      console.log(result);
      return transformAuxMaterialGroup(result);
    } catch (err) {
      throw err;
    }
  },

  updateAuxMaterialGroup: async args => {
    console.log("======updateAuxMaterialGroup")
    try {
      const auxMaterialGroup = await AuxMaterialGroup.findOneAndUpdate(
        { _id: args.id },
        { ...args.auxMaterialGroupInput },
        { new: true }
      );

      auxMaterialGroupLoader.clear(args.id.toString());

      return transformAuxMaterialGroup(auxMaterialGroup);
    } catch (err) {
      throw err;
    }
  },

  deleteAuxMaterialGroup: async args => {
    console.log("======deleteAuxMaterialGroup")
    try {
      //Delete MaterialGroup
      const auxMaterialGroup = await AuxMaterialGroup.findByIdAndDelete(
        args.id
      );

      //Delete Concept Reference
      const concepts = await Concept.find({ auxMaterialGroups: args.id });
      for (const concept of concepts) {
        const auxMaterialGroupIndex = concept.auxMaterialGroups.findIndex(
          auxMaterialGroup => auxMaterialGroup == args.id
        );
        console.log(`elemento a borrar: ${auxMaterialGroupIndex}`)
        concept.price -= auxMaterialGroup.totalPrice;
        concept.Mo -= auxMaterialGroup.Mo;
        concept.noMo -= auxMaterialGroup.noMo;
        concept.auxMaterialGroups.splice(auxMaterialGroupIndex, 1);
        console.log("=concepto a grabar")
        console.log(concept)
        await concept.save();
      }

      return transformAuxMaterialGroup(auxMaterialGroup);
    } catch (err) {
      throw err;
    }
  }
};
