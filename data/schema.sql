DROP TABLE IF EXISTS crypto_currency;
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