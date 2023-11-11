
const express = require('express');
const app = express();

app.use(express.json());


//Route Imports
const coffees = require('./routes/coffee');

//API
app.use('/api/vi', coffees);

module.exports = app