const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());


//Route Imports
const coffees = require('./routes/coffee');
const auth = require('./routes/auth');

//API
app.use('/api/v1', coffees);
app.use('/api/v1', auth);


//Middleware to handle errors
app.use(errorMiddleware);


module.exports = app