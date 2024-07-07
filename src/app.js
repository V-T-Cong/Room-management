require('dotenv').config({ path: '.env' });

const morgan = require('morgan');
const express = require('express');
const {default:helmet} = require('helmet');
const compression = require('compression');
const sessionMiddleware = require('./middleware/session');

const app = express();

//init middlewares
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                'form-action': ["'self'", 'https://checkout.stripe.com'],
            },
        },
    })
);
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(sessionMiddleware);
app.use(express.urlencoded({
    extended: true,
}));

app.set('view engine', 'ejs');

const {countConnect, checkOverload} = require('./helpers/checkConnectNew');
countConnect();
// checkOverload();


// init routes 
app.use('', require('./routes'))


// handling error
app.use((res, req, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    });
});

module.exports = app;