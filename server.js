'use strict';

//Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');

//const cors = require('cors');

//const pg = require('pg');
//const client = new pg.Client(process.env.DATABASE_URL);
const superagent = require('superagent'); //<<--will go in module


// Database Setup


//Application Setup
const PORT = process.env.PORT || 3001 || 3002 || 3003;
console.log('Crypto Server is running on port: ', PORT);
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', homeRoute);

function homeRoute(req, res) {
  res.render('index.ejs');
}

// client.connect()
//   .then(() => {
app.listen(PORT, () => console.log(`SERVER up on PORT : ${PORT}`));
//   })
//   .catch(console.error);

// Our Dependencies - modules

//server paths
app.get('/apitest', apiTest);


function apiTest(req, res) {
  console.log('path triggered');
  const apiKey = process.env.CRYPTO_KEY;
  const url = "https://api.binance.com/api/v3/ticker/24hr?symbol=LTCBTC"
  const queryParams = {
    key: apiKey, quantity: 1, price: 0.1, recvWindow: 5000, timestamp: 1499827319559
  };
  superagent.get(url)
    //.query(queryParams)
    .then(returned => {
      console.log('***the body:', returned.body);
    }).catch(error => {
      console.log("***ERROR:", error);
      res.status(500).send('Error In Query');

    })
}



// function errorHandler(error, request, response) {
//   console.error(error);
//   response.status(500).json({
//     error: true,
//     message: error.message,
//   });
// }

// function notFoundHandler(request, response) {
//   response.status(404).json({
//     notFound: true,
//   });
// }

