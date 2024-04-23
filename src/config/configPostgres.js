const dotenv = require('dotenv');
// Load environment variables from the specified .env file
dotenv.config({ path: `../../.env` });

const development = {
    app: {
        PORT: process.env.DEV_APP_PORT ||3000
    },
    db: {
        HOST: process.env.DEV_DB_HORT || 'localhost',
        PORT: process.env.DEV_DB_PORT || 5432,
        USERNAME: process.env.DEV_DB_USERNAME || 'postgres',
        PASSWORD: process.env.DEV_DB_PASSWORD || 'mypostgres',
        DBNAME: process.env.DEV_DB_DBNAME || 'Room_Management',
    }
};

const production = {
    app: {
        PORT: process.env.PRO_APP_PORT || 3000
    },
    db: {
        HOST: process.env.PRO_DB_HORT || 'localhost',
        PORT: process.env.PRO_DB_PORT || 5432,
        USERNAME: process.env.PRO_DB_USERNAME || 'postgres',
        PASSWORD: process.env.PRO_DB_PASSWORD || 'mypostgres',
        DBNAME: process.env.PRO_DB_DBNAME || 'Room_Management',
    }
};

const config = {development, production};
const env = process.env.NODE_ENV || 'development'
module.exports = config[env]
