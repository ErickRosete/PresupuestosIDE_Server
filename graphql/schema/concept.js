const ConceptSchema = {
  definition: `
    type Concept {
        _id: ID!
        conceptKey: String!,
        measurementUnit: String,
        name: String
        price: Float,
        Mo:Float,
        noMo:Float,
        auxMaterialGroups: [AuxMaterialGroup]
    }

    input ConceptInput{
        conceptKey: String!,
        measurementUnit: String,
        name: String
        price: Float,
        Mo:Float,
        noMo:Float,
        auxMaterialGroups: [ID]
    }
    `,

  query: `
    concepts: [Concept!]!
    concept(id: ID!): Concept!
    conceptByKey(conceptKey: String!): Concept!
    `,

  mutation: `
    createConcept(conceptInput: ConceptInput!): Concept
    updateConcept(id: ID!, conceptInput: ConceptInput!): Concept                     
    deleteConcept(id: ID!): Concept 
    createConceptCopy(id: ID!, conceptInput: ConceptInput!): Concept
    `
};

module.exports = ConceptSchema;
