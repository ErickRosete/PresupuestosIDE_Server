const { buildSchema } = require("graphql");

const materialGroup = require("./material-group");
const material = require("./material");
const concept = require("./concept")

module.exports = buildSchema(`
    ${material.definition}
    ${materialGroup.definition}
    ${concept.definition}

    type RootQuery {
        ${material.query}
        ${materialGroup.query}
        ${concept.query}
    }

    type RootMutation {
        ${material.mutation}
        ${materialGroup.mutation}
        ${concept.mutation}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
