const { buildSchema } = require("graphql");

const product = require("./product");

module.exports = buildSchema(`
    ${product.definition}

    type RootQuery {
        ${product.query}   
    }

    type RootMutation {
        ${product.mutation}    
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
