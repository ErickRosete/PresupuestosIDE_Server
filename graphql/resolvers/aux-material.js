const AuxMaterial = require("../../models/aux-material");
const { transformAuxMaterial } = require("./merge");

module.exports = {
    auxMaterials: async () => {
        try {
            const auxMaterials = await AuxMaterial.find();
            return auxMaterials.map(auxMaterial => {
                return transformAuxMaterial(auxMaterial);
            });
        } catch (err) {
            throw err;
        }
    },

    auxMaterial: async args => {
        try {
            const auxMaterial = await AuxMaterial.findById(args.id);
            return transformAuxMaterial(auxMaterial);
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
            return transformAuxMaterial(result);
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
            return transformAuxMaterial(result);
        } catch (err) {
            throw err;
        }
    },

    deleteAuxMaterial: async args => {
        try {
            const auxMaterial = await AuxMaterial.findByIdAndDelete(args.id);
            return transformAuxMaterial(auxMaterial);
        } catch (err) {
            throw err;
        }
    }
};
