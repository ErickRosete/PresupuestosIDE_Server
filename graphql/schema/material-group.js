const materialGroupSchema = {
    definition: `
    type MaterialGroup {
        _id: ID!
        materialGroupKey: String!,
        measurementUnit: String,
        name: String
        quantity: Float,
        unitPrice: Float,
        totalPrice: Float,
        Mo: Float,
        noMo: Float,
        auxMaterials: [AuxMaterial]
    }

    input MaterialGroupInput{
        materialGroupKey: String!,
        measurementUnit: String,
        name: String
        quantity: Float,
        unitPrice: Float,
        totalPrice: Float,    
        Mo: Float,
        noMo: Float,
        auxMaterials: [ID]
    }
    `,

    query: `
    materialGroups: [MaterialGroup!]!
    materialGroup(id: ID!): MaterialGroup!
    materialGroupByKey(materialGroupKey: String!): MaterialGroup!
    `,

    mutation: `
    createMaterialGroup(materialGroupInput: MaterialGroupInput!): MaterialGroup
    createMaterialGroupCopy(id: ID!, materialGroupInput: MaterialGroupInput!): MaterialGroup
    updateMaterialGroup(id: ID!, materialGroupInput: MaterialGroupInput!): MaterialGroup
    updateMaterialGroupFromDB(id: ID!): MaterialGroup                     
    deleteMaterialGroup(id: ID!): MaterialGroup 
    `,
};

module.exports = materialGroupSchema;