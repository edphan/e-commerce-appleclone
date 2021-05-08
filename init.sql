CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  dob DATE,
  email TEXT,
  password VARCHAR(200)
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  number INTEGER,
  street_name VARCHAR(40),
  apt_unit INTEGER,
  city VARCHAR(30),
  state VARCHAR(30),
  zipcode VARCHAR(10),
  country VARCHAR(20)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50),
  name VARCHAR(50),
  price MONEY,
  description TEXT,
  image TEXT,
  subcategory VARCHAR(50)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER,
  product_name VARCHAR(50),
  product_image TEXT
);