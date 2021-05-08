const express = require('express');
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

//MIDDLEWARE
app.use(express.static(__dirname + '../client/public'));
app.use(cors({ origin, credentials: true })); //allow cross-origin resource sharing FROM origin ONLY, and accept credentials
app.use(cookieParser()); //to parse cookie
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

app.listen(PORT, () => {
	console.log(`sever is listening on PORT ${PORT}`);
});
