const { Client } = require('pg');
const {db:{USERNAME, HOST, PORT, PASSWORD, DBNAME}} = require('../config/configPostgres')
const { countConnect } = require('../helper/checkConnect');

const connectionString = `postgres://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DBNAME}`;

const client = new Client({
    connectionString: connectionString,
    max: 50,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000 
});


class DataBase {
    constructor() {
        this.connect()
    }

    // connect
    connect(type = 'pg') {
        client.connect()
        .then(() => {
            console.log('Connected to PostgreSQL', countConnect());
        })
        .catch(err => {
            console.error('Error connecting to PostgreSQL:', err);
        });
    }

    static getInstance() {
        if (!DataBase.instance) {
            DataBase.instance = new DataBase();
        }

        return DataBase.instance;
    }
}

const instancePostgreSQL = DataBase.getInstance();
module.exports = instancePostgreSQL;
