const auxMaterialGroupSchema = {
  definition: `
    type AuxMaterialGroup {
        _id: ID!
        materialGroup: MaterialGroup,
        quantity: Float,
        unitPrice: Float,
        totalPrice: Float,
        Mo:Float,
        noMo:Float
    }

    input AuxMaterialGroupInput{
        materialGroup: ID!,
        quantity: Float,
        unitPrice: Float,
        totalPrice: Float,
        Mo:Float,
        noMo:Float
    }
    `,

  query: `
    auxMaterialGroups: [AuxMaterialGroup!]!
    auxMaterialGroup(id: ID!): AuxMaterialGroup!
    `,

  mutation: `
    createAuxMaterialGroup(auxMaterialGroupInput: AuxMaterialGroupInput!): AuxMaterialGroup
    updateAuxMaterialGroup(id: ID!, auxMaterialGroupInput: AuxMaterialGroupInput!): AuxMaterialGroup
    deleteAuxMaterialGroup(id: ID!): AuxMaterialGroup 
    `
};

module.exports = auxMaterialGroupSchema;
