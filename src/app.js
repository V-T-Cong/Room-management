const {default:helmet} = require('helmet');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();


//init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())


// init database
require('./db/init.postgres')
// const { checkOverload } = require('./helper/checkConnect')
// checkOverload()

// init routes 
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "Hello express",
    });
});

module.exports = app;