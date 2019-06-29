const auxMaterialSchema = {
    definition: `
    type AuxMaterial {
        _id: ID!
        materialKey: String,
        name: String,
        materialQuantity: Float,
        totalQuantity: Float,
        measurementUnit: String,
        unitPrice: Float,
        totalPrice: Float,
        fromExcel: Boolean,
    },

    input AuxMaterialInput{
        materialKey: String,
        name: String
        materialQuantity: Float,
        totalQuantity: Float,
        measurementUnit: String,
        unitPrice: Float,
        totalPrice: Float,
        fromExcel: Boolean,
    }
    `,

    query: `
        auxMaterials: [AuxMaterial]
        auxMaterial(id: ID!): AuxMaterial!
        
    `,

    mutation: `
        createAuxMaterial(auxMaterialInput: AuxMaterialInput!): AuxMaterial
        updateAuxMaterial(id: ID!, auxMaterialInput: AuxMaterialInput!): AuxMaterial                     
        deleteAuxMaterial(id: ID!): AuxMaterial 
    `,
};

module.exports = auxMaterialSchema;