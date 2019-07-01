const { buildSchema } = require("graphql");

const materialGroup = require("./material-group");
const auxMaterial = require("./aux-material");
const material = require("./material");
const concept = require("./concept");
const auxMaterialGroup = require("./aux-material-group");

module.exports = buildSchema(`
    ${material.definition}
    ${materialGroup.definition}
    ${auxMaterial.definition}
    ${concept.definition}
    ${auxMaterialGroup.definition}
    
    type RootQuery {
        ${material.query}
        ${materialGroup.query}
        ${auxMaterial.query}
        ${concept.query}
        ${auxMaterialGroup.query}
    }

    type RootMutation {
        ${material.mutation}
        ${materialGroup.mutation}
        ${auxMaterial.mutation}
        ${concept.mutation}
        ${auxMaterialGroup.mutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
