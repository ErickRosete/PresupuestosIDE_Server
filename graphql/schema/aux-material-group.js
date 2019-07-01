const auxMaterialGroupSchema = {
  definition: `
    type AuxMaterialGroup {
        _id: ID!
        materialGroup: ID!,
        quantity: Float,
        unitPrice: Float,
        totalPrice: Float,
    }

    input AuxMaterialGroupInput{
        materialGroup: ID!,
        quantity: Float,
        unitPrice: Float,
        totalPrice: Float,
    }
    `,

  query: `
    auxMaterialGroups: [AuxMaterialGroup!]!
    auxMaterialGroup(id: ID!): AuxMaterialGroup!
    `,

  mutation: `
    createAuxMaterialGroup(AuxMaterialGroupInput: AuxMaterialGroupInput!): AuxMaterialGroup
    updateAuxMaterialGroup(id: ID!, auxMaterialGroupInput: AuxMaterialGroupInput!): AuxMaterialGroup
    deleteAuxMaterialGroup(id: ID!): AuxMaterialGroup 
    `
};

module.exports = auxMaterialGroupSchema;
