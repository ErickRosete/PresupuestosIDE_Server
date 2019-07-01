const ConceptSchema = {
    definition: `
    type Concept {
        _id: ID!
        conceptKey: String!,
        measurementUnit: String,
        name: String
        quantity: Int,
        unitPrice: Int,
        totalPrice: Int,
        materialGroups: [MaterialGroup]
    }

    input ConceptInput{
        conceptKey: String!,
        measurementUnit: String,
        name: String
        quantity: Int,
        unitPrice: Int,
        totalPrice: Int,
        materialGroups: [ID]
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
    `,
};

module.exports = ConceptSchema;