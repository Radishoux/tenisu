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

  var countries = {
    // USA:
    // {
    //   win: 4,
    //   loose : 2
    // }
  };

  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var country = player.country.code;
    var games = player.data.last;

    if (!countries[country]) {
      countries[country] = {
        win: 0,
        loose: 0
      };
    }

    for (var j = 0; j < games.length; j++){
      if (games[j] == 0) {countries[country].loose++;}
      else {countries[country].win++;}
    }

  }

  for (var country in countries) {
    var countryData = countries[country];
    countryData.ratio = countryData.win / (countryData.win + countryData.loose);
  }

  var response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(countries),
  };

  if (qsp && qsp.tab && qsp.tab == "true") {
    return response;
  }

  var maxRatio = 0;
  var maxCountry;
  for (var country in countries) {
    var countryData = countries[country];
    if (countryData.ratio > maxRatio) {
      maxRatio = countryData.ratio;
      maxCountry = country;
    }
  }

  response.body = JSON.stringify({
    country: maxCountry,
    ratio: maxRatio
  });

  return response;

};
