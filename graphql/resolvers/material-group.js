const MaterialGroup = require("../../models/material-group");
const Material = require("../../models/material");
const AuxMaterial = require("../../models/aux-material");
const { transformMaterialGroup } = require("./merge");
var mongoose = require('mongoose');
var Promise = require('bluebird');

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

    createMaterialGroupCopy: async args => {
        try {
            console.log(args)
            const materialGroupRef = await MaterialGroup.findById(args.id).populate('auxMaterials');

            //Generate AuxMaterials copies
            // const auxMaterials = materialGroupRef.auxMaterials.map(async (auxMaterial) => {
            //     const newAuxMaterial = AuxMaterial({
            //         ...auxMaterial._doc,
            //         _id: mongoose.Types.ObjectId()
            //     });
            //     const result = await newAuxMaterial.save();
            //     return result._id;
            // });
            const auxMaterials = await Promise.map(materialGroupRef.auxMaterials, async (auxMaterial) => {
                const newAuxMaterial = AuxMaterial({
                        ...auxMaterial._doc,
                        _id: mongoose.Types.ObjectId()
                    });
                    const result = await newAuxMaterial.save();
                    return result._id;
            })

            console.log(auxMaterials)
           

            //Save MaterialGroup
            const materialGroup = MaterialGroup({
                ...materialGroupRef._doc,
                ...args.materialGroupInput,
                auxMaterials,
                _id: mongoose.Types.ObjectId()
            });
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
            const materialGroup = await MaterialGroup.findById(args.id);
            let i = materialGroup.auxMaterials.length;
            while (i > 0) {
                let auxMaterial = await auxMaterial.findById(materialGroup.auxMaterials[i]);
                const material = await Material.findOne({ materialKey: auxMaterial.materialKey });
                //Search for material in DB if it doesn't exist delete from MaterialGroup
                if (!material) {
                    materialGroup.auxMaterials.splice(i, 1);
                } else {
                    //if it exists update values
                    auxMaterial = {
                        ...auxMaterial._doc,
                        ...material._doc,
                        totalQuantity: material.quantity,
                        _id: auxMaterial._id
                    };
                    await auxMaterial.save();
                }
            }
            return transformMaterialGroup(result)

        } catch (err) {
            throw err;
        }
    },

    deleteMaterialGroup: async args => {
        try {
            //Delete MaterialGroup
            const materialGroup = await MaterialGroup.findByIdAndDelete(args.id);
            //Delete inner AuxMaterials
            await AuxMaterial.deleteMany({ _id: { $in: materialGroup.auxMaterials } });

            return transformMaterialGroup(materialGroup);
        } catch (err) {
            throw err;
        }
    }
};
