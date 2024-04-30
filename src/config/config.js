require('dotenv').config({ path: '../../.env' });


module.exports = {
	development: {
		username: process.env.DEV_DB_USERNAME || 'postgres',
		password: process.env.DEV_DB_PASSWORD || 'mypostgres',
		database: process.env.DEV_DB_DBNAME || 'Room_Management',
		host: process.env.DEV_DB_HOST || 'localhost',
		port: process.env.DEV_DB_PORT || 5432,
		dialect: "postgres",
		define: { 
			freezeTableName: true,
		},
	},
	test: {
		username: "root",
		password: null,
		database: "database_test",
		host: "127.0.0.1",
		dialect: "",
	},
	production: {
		username: process.env.PRO_DB_USERNAME,
		password: process.env.PRO_DB_PASSWORD,
		database: process.env.PRO_DB_DBNAME,
		host: process.env.PRO_DB_HOST,
		port: process.env.PRO_DB_PORT,
		dialect: "postgres",
	},
};