const auxMaterialGroupSchema = {
    definition: `
    type AuxMaterial {
        quantity: Int,
        material: Material
    },

    input AuxMaterialInput{
        quantity: Int,
        material: ID!,
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

module.exports = auxMaterialGroupSchema;