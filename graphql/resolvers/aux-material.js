const AuxMaterial = require("../../models/aux-material");
const MaterialGroup = require("../../models/material-group");

const { auxMaterialLoader } = require("./merge");

module.exports = {
  auxMaterials: async () => {
    try {
      const auxMaterials = await AuxMaterial.find();
      return auxMaterials.map(auxMaterial => {
        return { ...auxMaterial._doc };
      });
    } catch (err) {
      throw err;
    }
  },

  auxMaterial: async args => {
    try {
      const auxMaterial = await AuxMaterial.findById(args.id);
      return { ...auxMaterial._doc };
    } catch (err) {
      throw err;
    }
  },

  createAuxMaterial: async args => {
    try {
      const auxMaterial = AuxMaterial({
        ...args.auxMaterialInput
      });

      const result = await auxMaterial.save();
      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },

  updateAuxMaterial: async args => {
    try {
      //Update AuxMaterial
      const auxMaterial = await AuxMaterial.findOneAndUpdate(
        { _id: args.id },
        { ...args.auxMaterialInput },
        { new: true }
      );

      //Update MaterialGroup totalPrice, Mo and NoMo
      const materialGroups = await MaterialGroup.find({
        auxMaterials: args.id
      }).populate("auxMaterials");
      // console.log("==========populated")
      // console.log(materialGroups)

      for (const materialGroup of materialGroups) {
        let Mo = 0;
        let noMo = 0;
        let totalPrice = 0;
        for (const auxMaterial of materialGroup.auxMaterials) {
          //Update DataLoader Cache
          auxMaterialLoader.clear(auxMaterial._id.toString());

          //Update Price
          totalPrice += auxMaterial.totalPrice;
          if (auxMaterial.materialKey.slice(0, 2) === "MO")
            Mo += auxMaterial.totalPrice;
          else noMo += auxMaterial.totalPrice;
        }
        materialGroup.totalPrice = totalPrice;
        materialGroup.Mo = Mo;
        materialGroup.noMo = noMo;
        // console.log(`=====index of materialgroup ${index}`)
        // console.log(materialGroup.auxMaterials)

        await materialGroup.save();
      }

      return { ...auxMaterial._doc };
    } catch (err) {
      throw err;
    }
  },

  deleteAuxMaterial: async args => {
    try {
      //Delete AuxMaterial
      const auxMaterial = await AuxMaterial.findByIdAndDelete(args.id);

      //Delete AuxMaterial from MaterialGroup
      const materialGroup = await MaterialGroup.findOne({
        auxMaterials: args.id
      });
      const auxMaterialIndex = materialGroup.auxMaterials.findIndex(
        auxMaterial => auxMaterial == args.id
      );
      materialGroup.auxMaterials.splice(auxMaterialIndex, 1);
      materialGroup.totalPrice =
        materialGroup.totalPrice - auxMaterial.totalPrice;
      await materialGroup.save();

      return { ...auxMaterial._doc };
    } catch (err) {
      throw err;
    }
  }
};
