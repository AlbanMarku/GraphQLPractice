const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({ //middleware. Use the schema and ui.
    schema,
    graphiql: true
}));

const dbURI = "mongodb+srv://albanshqiptar:alban4321@inventorycluster.v0kg7cq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000);
    console.log('Connected to db!');
  })
  .catch((err) => console.log(err));

console.log(`API server is listening on port 8080`);



