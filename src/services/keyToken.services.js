const { raw } = require('express');
const db = require('../db/models/index');

class KeyTokenServices {
    static createKeyToken = async({UserId, publicKey, privateKey, refreshToken}) => {

        try {

            if(!refreshToken) {

                // const PublickeyString = publicKey.toString();
                
                // const Tokens = await db.keytokens.create({
                //     UserId: UserId,
                //     publickey: publicKey,
                //     privatekey: privateKey
                // });
    
                // return Tokens ? Tokens.publickey : null;
            }

            let tokens = await db.keytokens.findOne({where: {UserId: UserId}});

            if (tokens) {
                // If a key token exists, update its fields
                tokens = await db.keytokens.update({
                    publickey: publicKey,
                    privatekey: privateKey,
                    refreshTokensUsed: [],
                    refreshToken: refreshToken
                }, {
                    where: {UserId: UserId}
                }
            );
            } else {
                // If no key token exists, create a new one
                tokens = await db.keytokens.create({
                    UserId: UserId,
                    publickey: publicKey,
                    privatekey: privateKey,
                    refreshTokensUsed: [],
                    refreshToken: refreshToken
                });
            }

            console.log('tokens create::',tokens);

            return tokens ? tokens.publickey : null;

        } catch (error) {
            console.log('createKeyToken error',error);
            throw error;
        }
    }

    static findByUserId = async(UserId) => {
        return await db.keytokens.findOne({
        where: {UserId: UserId},
        raw: true});
    }

    static removekeyById = async(UserId) => {
        return await db.keytokens.destroy({where: {UserId: UserId}});
    }
}

module.exports = KeyTokenServices;