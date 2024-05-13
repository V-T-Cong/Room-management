const users = require('../db/models/User');

const findByEmail = async ({ email, attributes = ['id', 'email', 'password', 'first_name'] }) => {
    return await users.findOne({
        where: { email },
        attributes,
        raw: true // Return plain JavaScript objects instead of Sequelize instances
    });
}

module.exports = { findByEmail };