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

  var imcs = {
    // R.NAD:
    // {
    //   weight: 85000,
    //   height : 185,
    //   imc: 24.8
    // }
    average: {
      weight: 0,
      height: 0,
      imc: 0,
    }
  };

  for (var i = 0; i < players.length; i++) {
    var player = players[i];

    imcs[player.shortname] = {
      weight: player.data.weight,
      height: player.data.height,
      imc: (player.data.weight / (player.data.height * player.data.height))*10,
    };

    imcs.average.weight += player.data.weight;
    imcs.average.height += player.data.height;
    imcs.average.imc += (player.data.weight / (player.data.height * player.data.height))*10;
  }

  imcs.average.weight /= players.length;
  imcs.average.height /= players.length;
  imcs.average.imc /= players.length;

  // TODO implement
  var response = {
    statusCode: 200,
    body: JSON.stringify(imcs),
  };

  if (qsp && qsp.tab && qsp.tab == "true") {
    return response;
  }

  response.body = JSON.stringify(imcs.average);

  return response;
};

