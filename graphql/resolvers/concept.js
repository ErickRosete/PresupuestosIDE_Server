const Concept = require("../../models/concept");
const AuxMaterialGroup = require("../../models/aux-material-group")
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
            const conceptRef = await Concept.findById(args.id).populate('auxMaterialGroups');

            const auxMaterialGroups = await Promise.all(conceptRef.auxMaterialGroups.map(async auxMaterialGroup => {
                const newAuxMaterialGroup = AuxMaterialGroup({
                    ...auxMaterialGroup._doc,
                    _id: mongoose.Types.ObjectId()
                });
                const result = await newAuxMaterialGroup.save();
                return result._id;
            }));

            //Save Concept
            const concept = Concept({
                ...conceptRef._doc,
                ...args.conceptInput,
                auxMaterialGroups,
                _id: mongoose.Types.ObjectId()
            });
            const result = await concept.save();
            return transformConcept(result);
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
