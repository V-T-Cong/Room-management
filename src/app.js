const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

//init middlewares
app.use(morgan('combined'))
app.use(helmet())
app.use(compression())


app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "jfsdalkfjsadklj",
    });
});

module.exports = app;