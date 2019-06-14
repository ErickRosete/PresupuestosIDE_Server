const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const bodyParser = require("body-parser");
const externalRequest = require("./middleware/external-requests");

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(externalRequest);

app.use(
    "/graphql",
    expressGraphQL({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
        }@cluster0-cij3w.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
        , { useNewUrlParser: true })
    .then(() => {
        app.listen(port);
        console.log("App running on port " + port)
    })
    .catch(err => { console.log("error general"); console.log(err) });