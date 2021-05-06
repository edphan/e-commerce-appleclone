const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const productsRouter = require('./routes/products');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const testRouter = require('./routes/test');
require('dotenv').config();
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); //allow cross-origin resource sharing FROM origin ONLY, and accept credentials
app.use(cookieParser()); //to parse cookie
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/products', productsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/test', testRouter);

app.get('/', (req, res) => {
	res.send({ message: 'successfully connect to server' });
});

app.listen(PORT, () => {
	console.log(`sever is listening on PORT ${PORT}`);
});
