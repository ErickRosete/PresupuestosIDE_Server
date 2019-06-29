const materialGroupSchema = {
    definition: `
    type MaterialGroup {
        _id: ID!
        materialGroupKey: String!,
        measurementUnit: String,
        name: String
        quantity: Int,
        unitPrice: Int,
        totalPrice: Int,
        auxMaterials: [AuxMaterial]
    }

    input MaterialGroupInput{
        materialGroupKey: String!,
        measurementUnit: String,
        name: String
        quantity: Int,
        unitPrice: Int,
        totalPrice: Int,
        auxMaterials: [ID]
    }
    `,

    query: `
    materialGroups: [Material!]!
    materialGroup(id: ID!): Material!
    materialGroupByKey(materialGroupKey: String!): MaterialGroup!
    `,

    mutation: `
    createMaterialGroup(materialGroupInput: MaterialGroupInput!): MaterialGroup
    updateMaterialGroup(id: ID!, materialGroupInput: MaterialGroupInput!): MaterialGroup                     
    deleteMaterialGroup(id: ID!): MaterialGroup 
    `,
};

module.exports = materialGroupSchema;