'use strict';

//Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');


const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const superagent = require('superagent'); //<<--will go in module



// Database Setup


//Application Setup
const PORT = process.env.PORT || 3001 || 3002 || 3003;
// const apiKey = process.env.CRYPTO_KEY;
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
function aboutUsPage(req, res) {
  res.render('pages/aboutUs.ejs');
}
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER up on PORT : ${PORT}`));
  })
  .catch(console.error);

// Our Dependencies - modules

//server paths
// app.get('/apitest', apiFunction);


// Post for API form
app.post('/search', onFormSubmit);



// function for form submission
function onFormSubmit(req, res) {
  const userName = req.body.userName;
  const cryptoSymbol1 = req.body.symbol1.toUpperCase();
  const cryptoSymbol2 = req.body.symbol2.toUpperCase();
  const cryptoSymbol3 = req.body.symbol3.toUpperCase();
  const cryptoSymbol4 = req.body.symbol4.toUpperCase();
  const cryptoSymbol5 = req.body.symbol5.toUpperCase();
  const cryptoAmounts = [req.body.usdAmount1, req.body.usdAmount2, req.body.usdAmount3, req.body.usdAmount4, req.body.usdAmount5];



  let checkPrice = cryptoSymbol => superagent
    .get(`https://api.binance.com/api/v3/ticker/price?symbol=${cryptoSymbol}USDT`)
    .then(response => response.body);
  Promise.all([
    checkPrice(cryptoSymbol1), checkPrice(cryptoSymbol2), checkPrice(cryptoSymbol3), checkPrice(cryptoSymbol4), checkPrice(cryptoSymbol5)
  ]).then(results => {
    let symbols = results.map((result, i) => {
      let amount = cryptoAmounts[i];
      console.log('amount', amount);
      console.log('symbols', result.symbol);
      console.log('Price', result.price);
      return {
        symbol: result.symbol,
        price: result.price,
        bought: amount / result.price
      };
    });
    console.log('symbols', symbols);
    const query = 'INSERT INTO crypto_currency (user_name, symbol_name1, usd_price1, symbol_name2, usd_price2, symbol_name3, usd_price3, symbol_name4, usd_price4, symbol_name5, usd_price5, time_date_stamp) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
    const sqlArray = [userName,
      cryptoSymbol1, symbols[0].price,
      cryptoSymbol2, symbols[1].price,
      cryptoSymbol3, symbols[2].price,
      cryptoSymbol4, symbols[3].price,
      cryptoSymbol5, symbols[4].price,
      new Date()];

    return client.query(query, sqlArray)
      .then(() => {
        res.render('pages/crypto/cryptoResults.ejs', { symbols });
      }
      )
      .catch(error => {
        console.log('***ERROR:', error);
        res.status(500).send(error);
      });

  })
    .catch(error => {
      console.log('***ERROR:', error);

      res.status(500).send('Error, Coin symbol was not correct.');
    });



  // console.log('url', url);
  // superagent.get(url)
  //   //.query(queryParams)
  //   .then(returned => {
  //     console.log('body', returned.body);
  //     const symbolObj = {
  //       symbol: cryptoSymbol,
  //       price: returned.body.price,
  //       amount: cryptoAmount

  //   };
  //   symbolObj.boughtAmount = symbolObj.amount / symbolObj.price;
  //   res.render('pages/crypto/cryptoResults.ejs', { symbolObj: symbolObj });
  //   console.log(symbolObj);
  // }).catch(error => {
  //   // console.log('***ERROR:', error);
  //   res.status(500).send('Error, Coin symbol was not correct.');

  // });
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
