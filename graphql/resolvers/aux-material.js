const AuxMaterial = require("../../models/aux-material");
const MaterialGroup = require("../../models/material-group");

const { transformAuxMaterial } = require("./merge");

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
        const auxMaterial = AuxMaterial({
            ...args.auxMaterialInput
        });

        try {
            const result = await auxMaterial.save();
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    },

    updateAuxMaterial: async args => {
        try {
            const result = await AuxMaterial.findOneAndUpdate(
                { _id: args.id },
                { ...args.auxMaterialInput },
                { new: true }
            )
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    },

    deleteAuxMaterial: async args => {
        try {
            //Delete AuxMaterial from MaterialGroup
            const materialGroup = await MaterialGroup.find({ auxMaterials: args.id });
            const auxMaterialIndex = materialGroup.auxMaterials.findIndex((auxMaterial) => auxMaterial == args.id);
            materialGroup.auxMaterials.splice(auxMaterialIndex, 1);
            await materialGroup.save();

            //Delete AuxMaterial
            const auxMaterial = await AuxMaterial.findByIdAndDelete(args.id);
            return { ...auxMaterial._doc };
        } catch (err) {
            throw err;
        }
    }
};
