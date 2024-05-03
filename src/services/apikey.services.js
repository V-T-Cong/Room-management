const db = require('../db/models/index');
const crypto = require('crypto');


const findById = async(key) => {
    try {
        // Generate a new key
        // const newKey = await db.apiKey.create({
        //     key: crypto.randomBytes(64).toString('hex'),
        //     status: true,
        //     permissions: ['0000']
        // });
        
        // console.log('New API Key:', newKey);

        // Find the newly created key in the database
        const objKey = await db.apiKey.findOne({ where: { key, status: true} });
        return objKey;
    } catch (error) {
        console.error('Error creating and saving new API key:', error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}

module.exports = { findById } 