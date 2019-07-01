const AuxMaterialGroup = require("../../models/aux-material-group");
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
      const auxMaterialGroup = AuxMaterialGroup({
        ...args.auxMaterialGroupInput
      });

      const result = await auxMaterialGroup.save();
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
      const auxMaterialGroup = await AuxMaterialGroup.findByIdAndDelete(
        args.id
      );
      return transformAuxMaterialGroup(auxMaterialGroup);
    } catch (err) {
      throw err;
    }
  }
};
