const materialSchema = {
    definition: `
    type Material {
        _id: ID!
        materialKey: String!,
        measurementUnit: String,
        name: String
        quantity: Int,
        unitPrice: Int,
        totalPrice: Int,
        fromExcel: Boolean
    }

    input MaterialInput{
        materialKey: String!,
        measurementUnit: String,
        name: String
        quantity: Int,
        unitPrice: Int,
        totalPrice: Int,
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