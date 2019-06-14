const productSchema = {
    definition: `
    type Product {
        _id: ID!
        name: String!
        totalQuantity: Int!,
        currentQuantity: Int,
        imageLinks: [String]
        shortDescription: String
        details: String
        description: String
        videoLink: String
        codes: [String]
    }

    input ProductInput{
        name: String
        totalQuantity: Int,
        currentQuantity: Int,
        imageLinks: [String]
        shortDescription: String
        details: String
        description: String
        videoLink: String
        codes: [String]
        deleted: Boolean
    }
    `,
    
    query: `
    products: [Product!]!
    product(id: ID!): Product!
    productByCode(code: String!): Product!
    subcategoryProducts(id: ID!): [Product!]!
    `,

    mutation: `
    createProduct(productInput: ProductInput!): Product
    updateProduct(id: ID!, productInput: ProductInput!): Product
    deleteProduct(id: ID!): Product
    `,
};

module.exports = productSchema;