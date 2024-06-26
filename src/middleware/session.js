require('dotenv').config({ path: '../../.env' });

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const sessionPool = require('pg').Pool;


const sessionDBaccess = new sessionPool({
    user: process.env.DEV_DB_USERNAME || 'postgres',
	host: process.env.DEV_DB_HOST || 'localhost',   
	database: process.env.DEV_DB_DBNAME || 'Room_Management',
	password: process.env.DEV_DB_PASSWORD || 'mypostgres',
	port: process.env.DEV_DB_PORT || 5432
})


// install session
module.exports = session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge:60000 * 60
    },
    store: new pgSession({
        pool: sessionDBaccess,
        tableName: 'sessions'
    }),
});