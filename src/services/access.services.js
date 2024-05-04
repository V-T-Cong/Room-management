const db = require('../db/models/index');

const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenServices = require('./keyToken.services');
const { CreateTokenPair } = require('../auth/authUtil');
const { getInfoData } = require('../utils');
const { BadRequestError, ConflictRequestError } = require('../core/error.response');


class AccessService {
    static signUp = async ({ firstName, lastName, gender, email, password, phonenumber, isActivate }) => {
        // try {
            // check Email is exists
            const HoldUser =  await db.User.findOne({ where: { email } });
            if (HoldUser) {
                throw new BadRequestError('Error: User already registered!');
            }
    
            const passwordhash = await bcrypt.hash(password, 10);
    
            const NewUser = await db.User.create({
                firstName,
                lastName,
                gender,
                email,
                password: passwordhash,
                phonenumber,
                isActivate
            });
    
            if (NewUser) {

                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
    
                console.log({ privateKey, publicKey });
                
                // save collection keyStore
                const KeyStore = await KeyTokenServices.CreateKeyToken({
                    UserId: NewUser.id,
                    publicKey,
                    privateKey
                });
    
                if(!KeyStore) {
                    return {
                        code: 'xxxx',
                        message: 'KeyStore error'
                    }
                }
                
                const tokens = await CreateTokenPair({ UserId: NewUser.id, email }, publicKey, privateKey);
                console.log(`Created Token Success::`, tokens);
    
                return {
                    code: 201,
                    metadata: {
                        User: getInfoData({ fields: ['id', 'name', 'email'], Object: NewUser}),
                        tokens
                    }
                }
            }
    
            return {
                code: 200,
                metadata: null
            }
        // } catch (error) {
        //     return {
        //         code: 'xxx',
        //         message: error.message,
        //         status: 'error'
        //     }
        // }
    }
}

module.exports = AccessService