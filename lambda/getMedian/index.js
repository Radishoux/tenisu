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

  // Get an instance of our database
  const players = await db.collection("players").find({}).toArray();

  // order player by height

  players.sort(function(a, b) {
    return a.data.height - b.data.height;
  });

  var response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(players),
  };

  if (qsp && qsp.tab && qsp.tab == "true") {
    return response;
  }

  response.body = JSON.stringify(players[Math.floor(players.length/2)]);

  return response;
};

