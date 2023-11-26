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

  var stats = {
    // R.NAD:
    // {
    //   weight: 85000,
    //   height : 185,
    //   imc: 24.8
    // }
    average: {
      weight: 0,
      height: 0,
      points: 0,
      age: 0,

      imc: 0,
    }
  };

  for (var i = 0; i < players.length; i++) {
    var player = players[i];

    stats[player.shortname] = {
      weight: player.data.weight,
      height: player.data.height,
      points: player.data.points,
      age: player.data.age,

      imc: (player.data.weight / (player.data.height * player.data.height))*10,
    };

    stats.average.weight += player.data.weight;
    stats.average.height += player.data.height;
    stats.average.points += player.data.points;
    stats.average.age += player.data.age;

    stats.average.imc += (player.data.weight / (player.data.height * player.data.height))*10;
  }

  stats.average.weight /= players.length;
  stats.average.height /= players.length;
  stats.average.points /= players.length;
  stats.average.age /= players.length;

  stats.average.imc /= players.length;

  var response = {
    statusCode: 200,
    headers : {
      "Access-Control-Allow-Origin" : "*"
    },
    body: "",
  };

  if (qsp && qsp.tab && qsp.tab == "true") {
    response.body = JSON.stringify(stats);
    return response;
  }

  var toret = {};

  if (qsp && qsp.weight && qsp.weight == "true") {
    toret.weight = stats.average.weight;
  }

  if (qsp && qsp.height && qsp.height == "true") {
    toret.height = stats.average.height;
  }

  if (qsp && qsp.points && qsp.points == "true") {
    toret.points = stats.average.points;
  }

  if (qsp && qsp.age && qsp.age == "true") {
    toret.age = stats.average.age;
  }

  if (qsp && qsp.imc && qsp.imc == "true") {
    toret.imc = stats.average.imc;
  }

  if (qsp && qsp.all && qsp.all == "true"){
    toret = stats.average;
  }

  if (!qsp?.weight && !qsp?.height && !qsp?.points && !qsp?.age && !qsp?.imc)
  {
    toret = stats.average;
  }

  response.body = JSON.stringify(toret);

  return response;
};

