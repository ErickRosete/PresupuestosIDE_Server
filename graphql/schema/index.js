const { buildSchema } = require("graphql");

const materialGroup = require("./material-group");
const auxMaterial = require("./aux-material");
const material = require("./material");
const concept = require("./concept")

module.exports = buildSchema(`
    ${material.definition}
    ${materialGroup.definition}
    ${auxMaterial.definition}
    ${concept.definition}
    

    type RootQuery {
        ${material.query}
        ${materialGroup.query}
        ${auxMaterial.query}
        ${concept.query}
    }

    type RootMutation {
        ${material.mutation}
        ${materialGroup.mutation}
        ${auxMaterial.mutation}
        ${concept.mutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
