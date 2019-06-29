const MaterialGroup = require("../../models/material-group");
const Material = require("../../models/material");
const { transformMaterialGroup } = require("./merge")

module.exports = {
    materialGroups: async () => {
        try {
            const materialGroups = await MaterialGroup.find();
            return materialGroups.map(materialGroup => {
                return transformMaterialGroup(materialGroup);
            });
        } catch (err) {
            throw err;
        }
    },

    materialGroup: async args => {
        try {
            const materialGroup = await MaterialGroup.findById(args.id);
            return transformMaterialGroup(materialGroup);
        } catch (err) {
            throw err;
        }
    },

    materialGroupByKey: async args => {
        try {
            const materialGroup = await MaterialGroup.findOne({ materialGroupKey: args.materialGroupKey });
            return transformMaterialGroup(materialGroup);
        } catch (err) {
            throw err;
        }
    },

    createMaterialGroup: async args => {
        const materialGroup = MaterialGroup({
            ...args.materialGroupInput
        });

        try {
            const result = await materialGroup.save();
            return transformMaterialGroup(result);
        } catch (err) {
            throw err;
        }
    },

    updateMaterialGroup: async args => {
        try {
            const result = await MaterialGroup.findOneAndUpdate(
                { _id: args.id },
                { ...args.materialGroupInput },
                { new: true }
            )
            return transformMaterialGroup(result);
        } catch (err) {
            throw err;
        }
    },

    updateMaterialGroupFromDB: async args => {
        try {
            const result = await MaterialGroup.findById(args.id).populate('auxMaterials');
            // this.materialGroup.auxMaterials.ForEach(auxMaterial => {
            //     const material = await Material.findOne({ materialKey: auxMaterial.materialKey });
            //     if(!material){

            //     }
            // })

            // populate('auxMaterials');
            return transformMaterialGroup(result)

        } catch (err) {
            throw err;
        }
    },

    deleteMaterialGroup: async args => {
        try {
            const materialGroup = await MaterialGroup.findByIdAndDelete(args.id);
            return transformMaterialGroup(materialGroup);
        } catch (err) {
            throw err;
        }
    }
};
