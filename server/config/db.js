const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://Mahnoor:MongoDb-3282@cluster.poufqwo.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let conn;

try {
  conn = client.connect();

  // listDatabases(client);
  // Make the appropriate DB calls
  var db = client.db("users");
  // var dbfeedback = client.db("Feedback");
} catch (e) {
  console.error(e);
}

module.exports = db;
// module.exports = dbfeedback;
