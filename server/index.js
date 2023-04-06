const express = require("express");
// const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const PORT = 6969;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");
const connectDB = require("./config/db");
const FeedbackDB = require("./config/feedbackdb");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
const db = connectDB;
const dbfeedback = FeedbackDB;
app.get("/users", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).limit(50).toArray();
  // console.log("results", results);

  res.send(results).status(200);
});
app.get("/feedback", async (req, res) => {
  let collection = await dbfeedback.collection("user-feedbacks");
  let results = await collection.find({}).limit(50).toArray();
  console.log("results", results);

  res.send(results).status(200);
});
// db.collection("user").insertOne({ name: "Asad", occupation: "developer" });

app.listen(PORT, () => {
  console.log("Server running");
});
