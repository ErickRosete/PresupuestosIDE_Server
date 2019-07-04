const Concept = require("../../models/concept");
const { transformConcept } = require("./merge");

module.exports = {
    concepts: async () => {
        try {
            const concepts = await Concept.find();
            return concepts.map(concept => {
                return transformConcept(concept);
            });
        } catch (err) {
            throw err;
        }
    },

    concept: async args => {
        try {
            const concept = await Concept.findById(args.id);
            return transformConcept(concept);
        } catch (err) {
            throw err;
        }
    },

    conceptByKey: async args => {
        try {
            const concept = await Concept.findOne({ conceptKey: args.conceptKey });
            return transformConcept(concept);
        } catch (err) {
            throw err;
        }
    },

    createConcept: async args => {
        const concept = Concept({
            ...args.conceptInput
        });

        try {
            const result = await concept.save();
            return transformConcept(result);
        } catch (err) {
            throw err;
        }
    },

    updateConcept: async args => {
        try {
            const result = await Concept.findOneAndUpdate(
                { _id: args.id },
                { ...args.conceptInput },
                { new: true }
            )
            return transformConcept(result);
        } catch (err) {
            throw err;
        }
    },
    createConceptCopy: async args => {
        try {
            console.log(args)
            
            // const materialGroupRef = await MaterialGroup.findById(args.id).populate('auxMaterials');

            // const auxMaterials = await Promise.map(materialGroupRef.auxMaterials, async (auxMaterial) => {
            //     const newAuxMaterial = AuxMaterial({
            //             ...auxMaterial._doc,
            //             _id: mongoose.Types.ObjectId()
            //         });
            //         const result = await newAuxMaterial.save();
            //         return result._id;
            // })

            // console.log(auxMaterials)
            // //Save MaterialGroup
            // const materialGroup = MaterialGroup({
            //     ...materialGroupRef._doc,
            //     ...args.materialGroupInput,
            //     auxMaterials,
            //     _id: mongoose.Types.ObjectId()
            // });
            // const result = await materialGroup.save();
            // return transformMaterialGroup(result);
        } catch (err) {
            throw err;
        }
    },

    deleteConcept: async args => {
        try {
            const concept = await Concept.findByIdAndDelete(args.id);
            return transformConcept(concept);
        } catch (err) {
            throw err;
        }
    }
};
