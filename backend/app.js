const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());


//Route Imports
const coffees = require('./routes/coffee');

//API
app.use('/api/v1', coffees);


//Middleware to handle errors
app.use(errorMiddleware);


module.exports = app