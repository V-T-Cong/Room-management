const { Op } = require('sequelize');
const keytokens = require('../db/models/KeyTokens');

class KeyTokenServices {
    static createKeyToken = async({UserId, publicKey, privateKey, refreshToken}) => {

        try {

            // if(!refreshToken) {

                // const PublickeyString = publicKey.toString();
                
                // const Tokens = await db.keytokens.create({
                //     UserId: UserId,
                //     publickey: publicKey,
                //     privatekey: privateKey
                // });
    
                // return Tokens ? Tokens.publickey : null;
            // }

            let tokens = await keytokens.findOne({where: {user_id: UserId}});

            if (tokens) {
                // If a key token exists, update its fields
                tokens = await keytokens.update({
                    public_key: publicKey,
                    private_key: privateKey,
                    refresh_tokens: refreshToken,
                    refresh_tokens_used: [],
                }, 
                {
                    where: {user_id: UserId}
                }
            );
            } else {
                // If no key token exists, create a new one
                tokens = await keytokens.create({
                    user_id: UserId,
                    public_key: publicKey,
                    private_key: privateKey,
                    refresh_tokens: refreshToken,
                    refresh_tokens_used: [],
                });
            }

            console.log('tokens create::',tokens);

            return tokens ? tokens.public_key : null;

        } catch (error) {
            console.log('createKeyToken error',error);
            throw error;
        }
    }

    static findByUserId = async(userId) => {
        return await keytokens.findOne({
        where: {user_id: userId},
        raw: true});
    }

    static removekeyById = async(userId) => {
        return await keytokens.destroy({where: {user_id: userId}});
    }
    
    static findByRefreshToken = async(refreshToken) => {
        return await keytokens.findOne({where: {refresh_tokens: refreshToken}});
    }

    static findByRefreshTokenUsed = async(refreshToken) => {
        return await keytokens.findOne({where: {refresh_tokens_used: {[Op.contains]: [refreshToken] }}});
    }

    static deleteKeyById = async(userId) => {
        return await keytokens.destroy({where: {user_id: userId}});
    }
}

module.exports = KeyTokenServices;