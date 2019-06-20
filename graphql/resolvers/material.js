const Material = require("../../models/material");

module.exports = {
    materials: async () => {
        try {
            const materials = await Material.find();
            return materials.map(material => {
                return { ...material._doc };
            });
        } catch (err) {
            throw err;
        }
    },

    material: async args => {
        try {
            const material = await Material.findById(args.id);
            return { ...material._doc };
        } catch (err) {
            throw err;
        }
    },

    materialByKey: async args => {
        try {
            const material = await Material.findOne({ materialKey: args.materialKey });
            return { ...material._doc };
        } catch (err) {
            throw err;
        }
    },

    createMaterial: async args => {
        const material = Material({
            ...args.materialInput
        });

        try {
            const result = await material.save();
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    },

    updateMaterial: async args => {
        try {
            const result = await Material.findOneAndUpdate(
                { _id: args.id },
                { ...args.materialInput },
                { new: true }
            )
            return { ...result._doc };
        } catch (err) {
            throw err;
        }
    },

    deleteMaterial: async args => {
        try {
            const material = await Material.findByIdAndDelete(args.id);
            return { ...material._doc };
        } catch (err) {
            throw err;
        }
    }
};
