const os = require('os');
const sequelize = require('../config/database');

// Access connection pool
const connectionPool = sequelize.connectionManager.pool;
const _SECONDS = 5000;

const countConnect = () => {

    // Count number of connections
    const totalConnections = connectionPool.length;
    const activeConnections = connectionPool.acquired;
    const idleConnections = connectionPool.available;
    
    console.log('Total Connections:', totalConnections);
    console.log('Active Connections:', activeConnections);
    console.log('Idle Connections:', idleConnections);

}

const checkOverload = () => {
    const numCores = os.cpus().length;
    const maxConnection = numCores * 5; // Example maximum connections based on number of CPU cores

    setInterval(async () => {
        try {
            // Get total connections from the connection pool
            const numConnections = sequelize.connectionManager.pool.total;

            // Get memory usage
            const memoryUsage = process.memoryUsage().rss / 1024 / 1024; // Convert to MB

            console.log(`Active connections: ${numConnections}`);
            console.log(`Memory usage: ${memoryUsage.toFixed(2)} MB`);

            if (numConnections > maxConnection) {
                console.log(`Connection overload detected!`);
                // Implement appropriate handling logic here
            }
        } catch (error) {
            console.error('Error checking overload:', error);
        }
    }, _SECONDS);
};


module.exports = {countConnect, checkOverload}