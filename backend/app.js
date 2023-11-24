const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

//Route Imports
const coffees = require('./routes/coffee');
const auth = require('./routes/auth');
const order = require('./routes/order');

//API
app.use('/api/v1', coffees);
app.use('/api/v1', auth);
app.use('/api/v1', order);

//Middleware to handle errors
app.use(errorMiddleware);


module.exports = app