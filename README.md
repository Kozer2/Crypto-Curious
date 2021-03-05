# Crypto Curious
## Team Members
- Jean McMahon
- Daniel Rogahn
- Ben Hemann

This project was envisioned to allow a user to search for different crypto's and have it display back to them their current price. It allows a user to input an amount of crypto as if they own it, to see what they could sell it all for. It will then allow a user to save whichever crypto they want to a Database and they can then view which crypto they saved when and what USD amount they could have sold it for. 
Our stretch goals included converting the USD price to other currencies so users from around the world could utilize our website. 

This website uses a Crypto Exchange API to pull coin data when the user searches for a given coin symbol. 

### Problem Domain
Our problem domain was displaying up to 5 cryptocurriencies and display the amount each is worth in USD.

### Libraries 
- express
- pg
- dotenv
- superagent
- node




### Frameworks
- github
- Heroku
- postgres





Version 1.0.0



Wireframes 

Homepage
![image](https://user-images.githubusercontent.com/35902487/110150042-5fc84100-7da4-11eb-8373-32ba23e1d849.png)

About-Us Page
![image](https://user-images.githubusercontent.com/35902487/110150125-79698880-7da4-11eb-8eee-347f19961ac8.png)

Saved Page
![image](https://user-images.githubusercontent.com/35902487/110150159-85ede100-7da4-11eb-99ae-17509776f466.png)



API: https://api.binance.com/api/v3/ticker/
Example Response:
{
    symbol: 'ETHUSDT',
    price: '1495.04000000',
    amount: '5000',
    bought: 3.344392123287671  
}

Database Schema 

CREATE TABLE IF NOT EXISTS crypto_currency (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  symbol_name1 VARCHAR(255),
  usd_price1 DOUBLE PRECISION,
  symbol_name2 VARCHAR(255),
  usd_price2 DOUBLE PRECISION,
  symbol_name3 VARCHAR(255),
  usd_price3 DOUBLE PRECISION,
  symbol_name4 VARCHAR(255),
  usd_price4 DOUBLE PRECISION,
  symbol_name5 VARCHAR(255),
  usd_price5 DOUBLE PRECISION,
  time_date_stamp TIMESTAMP,
  description TEXT
);



