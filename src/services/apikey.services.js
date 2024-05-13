const apikeys = require('../db/models/ApiKeys');
const crypto = require('crypto');


const findById = async(key) => {
    try {

        // create new API key
        const newKey = await apikeys.create({
            key: crypto.randomBytes(64).toString('hex'),
            status: true,
            permissions: ['0000']
        });
        console.log(newKey);

        // Find the newly created key in the database
        const objKey = await apikeys.findOne({ where: { key, status: true} });
        return objKey;
    } catch (error) {
        console.error('Error creating and saving new API key:', error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}

module.exports = { findById } 