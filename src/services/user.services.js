const Users = require('../db/models/User');

const findByEmail = async ({ email, attributes = ['id', 'email', 'password', 'first_name'] }) => {
    return await Users.findOne({
        where: { email },
        attributes,
        raw: true // Return plain JavaScript objects instead of Sequelize instances
    });
}

module.exports = { findByEmail };