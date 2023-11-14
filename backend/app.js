
const express = require('express');
const app = express();

app.use(express.json());


//Route Imports
const coffees = require('./routes/coffee');

//API
app.use('/api/v1', coffees);

module.exports = app