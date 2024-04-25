const PostgreSQL = require('pg');
const os = require('os')
const _SECONDS = 5000

// count connect
const countConnect = () => {
    const numConnection = PostgreSQL.Connection.length;
    console.log(`Number of connection:: ${numConnection}`);
}

//check overload of the system
const checkOverload = () => {
    setInterval( () => {
        const numConnection = PostgreSQL.Connection.length;
        const numCores = os.cpus().length;
        const memoryUSage = process.memoryUsage().rss;
        // Example maximum number of connections based on number of cores
        const maxConnection = numCores*5;

        console.log(`Activate connection: ${numConnection}`);
        console.log(`Memory usage: ${memoryUSage/1024/1024} MB`);

        if(numConnection > maxConnection) {
            console.log(`Connection overload detected!`);
        }
    }, _SECONDS);
};

module.exports = { countConnect, checkOverload };