CREATE TABLE IF NOT EXISTS crypto_currency (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  symbol_name1 VARCHAR(255),
  usd_price1 VARCHAR(255),
  symbol_name2 VARCHAR(255),
  usd_price2 VARCHAR(255),
  symbol_name3 VARCHAR(255),
  usd_price3 VARCHAR(255),
  symbol_name4 VARCHAR(255),
  usd_price4 VARCHAR(255),
  symbol_name5 VARCHAR(255),
  usd_price5 VARCHAR(255),
  time_date_stamp VARCHAR(25),
  description TEXT
);