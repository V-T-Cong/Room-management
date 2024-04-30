const {default:helmet} = require('helmet');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

//init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// init database
require('./db/init.postgres')
// const { checkOverload } = require('./helper/checkConnect')
// checkOverload()

// init routes 
app.use('', require('./routes'))

module.exports = app;