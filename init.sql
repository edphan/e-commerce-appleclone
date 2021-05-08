CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  dob DATE,
  email TEXT,
  password VARCHAR(200)
);

CREATE TABLE addresses (
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

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Mac', 'MacBook Air', 999, 'Power. Its in the Air.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-segment?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1573580916082', 'MacBook Air');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Mac', 'MacBook Pro 13"', 1299, 'All systems Pro.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-pro-segment-2019?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1573580916135', 'MacBook Pro');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Mac', 'iMac 24"', 1299, 'Say hello to the new iMac.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/imac-segment?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1570232081431', 'iMac');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Mac', 'iMac Pro', 2399, 'Ready for big things.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/imac-pro-segment?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1570231926191', 'iMac');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Mac', 'Mac mini', 699, 'New guts. More glory.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-mini-segment?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1539466285370', 'Mac mini');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPhone', 'iPhone 12 Pro', 999, 'Its a leap year.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021661000', 'iPhone 12');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPhone', 'iPhone 12', 799, 'Blast past fast.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-white-select-2020?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604343705000', 'iPhone 12');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPhone', 'iPhone 12 mini', 699, 'Blast past fast.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-green-select-2020?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604343706000', 'iPhone 12');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPhone', 'iPhone SE', 399, 'Lots to love. Less to spend.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-red-select-2020?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1586574260319', 'iPhone SE');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPhone', 'iPhone 11', 599, 'The still great iPhone.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-yellow-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1568141245782', 'iPhone 11');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPhone', 'iPhone Xr', 499, 'One of the best.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-blue-select-201809?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1565209264208', 'iPhone Xr');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPad', 'iPad Pro 11"', 799, 'Supercharged by the M1 chip.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-cell-spacegray-202104?wid=940&hei=1112&fmt=p-jpg&qlt=80&.v=1617124703000', 'iPad Pro');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPad', 'iPad Pro 12.9"', 1099, 'Supercharged by the M1 chip.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-cell-spacegray-202104?wid=940&hei=1112&fmt=p-jpg&qlt=80&.v=1617126613000', 'iPad Pro');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPad', 'iPad Air', 599, 'Yes it does that. And then some.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-spacegray-202009?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1598650646000', 'iPad Air');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('iPad', 'iPad Mini', 399, 'Mini just got mightier.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-gold-201911?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1573825318739', 'iPad Mini');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Others', 'Apple Watch Series 6', 399, 'The future of heath is on your wrist.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/apple-watch-series-5-segment-201909?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1567038391208', 'Apple Watch');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Others', 'Apple TV 4K', 179, 'A higher definition of TV.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/segment-hero-apple-tv4k-201709?wid=400&hei=300&fmt=png-alpha&.v=1504891668090', 'Apple TV');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Others', 'AirPods Pro', 249, 'Magic runs in the family.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1591634795000', 'Accessories');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Others', 'Apple Pencile', 129, 'Dream it up. Jot it down.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-apple-pencil-2nd-202009?wid=560&hei=528&fmt=p-jpg&qlt=80&.v=1599253577000', 'Accessories');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Others', 'AirTag', 29, 'Lose your knack for losing things.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=890&hei=740&fmt=jpeg&qlt=80&.v=1617761672000', 'Accessories');

INSERT INTO products(category, name, price, description, image, subcategory)
VALUES('Mac', 'MacBook Pro 16"', 2799, 'The best for the brightest.', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-pro-segment-2019?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1573580916135', 'MacBook Pro');

INSERT INTO orders(user_id)
VALUES(1);

INSERT INTO orders(user_id)
VALUES(1);

INSERT INTO orders(user_id)
VALUES(2);

INSERT INTO orders(user_id)
VALUES(2);

INSERT INTO users(name, dob, email, password)
VALUES('test', '2021-04-28', 'test@gmail.com', '$2a$10$livGQ6szRCPSI3NkP6M6qOaHu266Wgm6VxLW4GqiXNpfOUMUeKFHu');

INSERT INTO users(name, dob, email, password)
VALUES('Sam', '2980-04-06', 'sam@shire.com', '$2a$10$WtogQBrnngvZViippgNMx.ZGJ1osgAdaVcb3YXiD16WQJtHZNqrp2');

INSERT INTO addresses(user_id, number, street_name, city, state, zipcode, country)
VALUES(1, 3146, 'Doctors Drive', 'Los Angeles', 'California', 90017, 'USA');

INSERT INTO addresses(user_id, street_name, city, state, country)
VALUES(2, 'Bag End', 'Hobbiton', 'The Shire', 'Middle Earth');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(1, 1, 2, 'MacBook Air', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-segment?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1573580916082');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(1, 13, 1, 'iPad Pro 11"', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-cell-spacegray-202104?wid=940&hei=1112&fmt=p-jpg&qlt=80&.v=1617124703000');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(2, 3, 3, 'iMac 24"', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/imac-segment?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1570232081431');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(2, 7, 2, 'iPhone 12 Pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021661000');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(2, 6, 4, 'Mac mini', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-mini-segment?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1539466285370');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(3, 17, 2, 'Apple Watch Series 6', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/apple-watch-series-5-segment-201909?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1567038391208');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(3, 18, 3, 'Apple TV 4K', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/segment-hero-apple-tv4k-201709?wid=400&hei=300&fmt=png-alpha&.v=1504891668090');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(4, 5, 2, 'Mac Pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-pro-2019-gallery6?wid=4000&hei=3072&fmt=jpeg&qlt=80&.v=1572644163911');

INSERT INTO order_products(order_id, product_id, quantity, product_name, product_image)
VALUES(4, 22, 4, 'MacBook Pro 16"', 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-pro-segment-2019?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1573580916135');










