const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(fileUpload());

//Route Imports
const coffees = require('./routes/coffee');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

//API
app.use('/api/v1', coffees);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

//Middleware to handle errors
app.use(errorMiddleware);


module.exports = app