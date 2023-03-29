const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({ //middleware. Use the schema and ui.
    schema,
    graphiql: true
}));

app.listen(8080,()=> {
    console.log("server online");
});