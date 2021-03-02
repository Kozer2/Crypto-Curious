'use strict';

//Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');


//const pg = require('pg');
//const client = new pg.Client(process.env.DATABASE_URL);
const superagent = require('superagent'); //<<--will go in module
const { request } = require('express');



// Database Setup


//Application Setup
const PORT = process.env.PORT || 3001 || 3002 || 3003;
console.log('Crypto Server is running on port: ', PORT);
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', homeRoute);
app.get('/aboutUs', aboutUsPage);

function homeRoute(req, res) {
  res.render('index.ejs');
}
function aboutUsPage(req, res){
  res.render('pages/aboutUs.ejs');
}
// client.connect()
//   .then(() => {
app.listen(PORT, () => console.log(`SERVER up on PORT : ${PORT}`));
//   })
//   .catch(console.error);

// Our Dependencies - modules

//server paths
// app.get('/apitest', apiFunction);


// Post for API form
app.post('/search', onFormSubmit);

// function for form submission
function onFormSubmit(req, res){
  const cryptoSymbol = req.body.symbol.toUpperCase();
  const cryptoAmount = req.body.usdAmount;
  console.log('symbol', cryptoSymbol);
  console.log('USD', cryptoAmount);

  const apiKey = process.env.CRYPTO_KEY;
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${cryptoSymbol}`;
  console.log('url', url);
  superagent.get(url)
  //.query(queryParams)
    .then( returned => {
      const symbolObj = {
        price: returned.body.lastPrice,
        change: returned.body.priceChangePercent,
        amount: cryptoAmount

      };
      res.render('pages/crypto/cryptoResults.ejs');
      console.log(symbolObj);
    }).catch(error => {
      // console.log('***ERROR:', error);
      res.status(500).send('Error, Coin symbol was not correct.');

    });
} // end onFormSubmit



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

