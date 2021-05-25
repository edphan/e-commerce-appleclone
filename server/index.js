const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const productsRouter = require('./routes/products');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const macRouter = require('./routes/mac');
const iphoneRouter = require('./routes/iphone');
const ipadRouter = require('./routes/ipad');
const othersRouter = require('./routes/others');
const testRouter = require('./routes/test');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const orderRouter = require('./routes/order');
require('dotenv').config();
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// This is your real test secret API key.
const stripe = require('stripe')('sk_test_51ItQyDLKmuKf5Y8NeeR6LiMdi1XbCrGJKXfEZ0EexdgBagV0N37A8kk0iiVtQFuYqWM7DMlyFF3HyBEEGbkAX64N0022plp1MU');

//MIDDLEWARE
app.use(cors({ origin: true, credentials: true })); //allow cross-origin resource sharing FROM origin ONLY, and accept credentials
app.use(cookieParser()); //to parse cookie
app.use(express.static('.'));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use('/products', productsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/mac', macRouter);
app.use('/iphone', iphoneRouter);
app.use('/ipad', ipadRouter);
app.use('/others', othersRouter);
app.use('/profile', profileRouter);
app.use('/order', orderRouter);
app.use('/test', testRouter);

const calculateOrderAmount = (items) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 1400;
};

// STRIPE PAYMENTINTENT
app.post('/create-payment-intent', async (req, res) => {
	const { items } = req.body;
	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: 'usd',
	});
	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + '/../client/build'));
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.listen(PORT, () => {
	console.log(`sever is listening on PORT ${PORT}`);
});
