const materialSchema = {
    definition: `
    type Material {
        _id: ID!
        materialKey: String,
        measurementUnit: String,
        name: String
        quantity: Float,
        unitPrice: Float,
        totalPrice: Float,
        fromExcel: Boolean
    }

    input MaterialInput{
        materialKey: String,
        measurementUnit: String,
        name: String
        quantity: Float,
        unitPrice: Float,
        totalPrice: Float,
        fromExcel: Boolean
    }
    `,

    query: `
    materials: [Material!]!
    material(id: ID!): Material!
    materialByKey(materialKey: String!): Material!
    `,

    mutation: `
    createMaterial(materialInput: MaterialInput!): Material
    updateMaterial(id: ID!, materialInput: MaterialInput!): Material
    deleteMaterial(id: ID!): Material
    `,
};

module.exports = materialSchema;