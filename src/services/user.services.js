const db = require('../db/models/index');

const findByEmail = async ({ email, attributes = ['id', 'email', 'password', 'firstName'] }) => {
    return await db.users.findOne({
        where: { email },
        attributes,
        raw: true // Return plain JavaScript objects instead of Sequelize instances
    });
}

module.exports = { findByEmail };