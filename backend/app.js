const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const errorMiddleware = require('./middlewares/errors');

//Setting up config file
dotenv.config({path: 'backend/config/config.env'})

app.use(express.json({limit:'50mb'}));

app.use(express.urlencoded({limit: "50mb", extended: true }));
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