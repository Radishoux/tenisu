//  rudyquinternet  u9xINp4Hwxr2niWY
// mongodb+srv://rudyquinternet:u9xINp4Hwxr2niWY@tenisu.mvrq0sv.mongodb.net/

const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://rudyquinternet:u9xINp4Hwxr2niWY@tenisu.mvrq0sv.mongodb.net/";

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(uri);

  // Specify which database we want to use
  const db = await client.db("tenisu");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  var qsp = event.queryStringParameters

  const db = await connectToDatabase();
  if (qsp && qsp.id) {
    const players = await db.collection("players").find({id: parseInt(qsp.id)}).limit(20).toArray();

    const response = {
      statusCode: 200,
      body: JSON.stringify(players),
    };
    if (players.length == 0) {
      response.statusCode = 404;
      response.body = "Not found";
    }
    return response;
  }

  // Get an instance of our database
  const players = await db.collection("players").find({}).limit(20).toArray();

  // order by data.rank
  players.sort(function(a, b) {
    return a.data.rank - b.data.rank;
  });

  var toret;
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(players),
  };
  return response;
};
