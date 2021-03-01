CREATE TABLE IF NOT EXISTS crypto_currency (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  crypto_name VARCHAR(255),
  usd_price VARCHAR(255),
  time_date_stamp VARCHAR(255),
  description TEXT
);