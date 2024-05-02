const db = require('../db/models/index');

const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenServices = require('./keyToken.services');
const { CreateTokenPair } = require('../auth/authUtil');
const { getInfoData } = require('../utils');


class AccessService {
    static signup = async ({ firstName, lastName, gender, email, password, phonenumber, isActivate }) => {
        try {
            const HoldUser =  await db.User.findOne({ where: { email } });
    
            if (HoldUser) {
                return {
                    code: 'xxx',
                    message: 'Email already used'
                }
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
                // create privatekey and publickey
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,

                //     // public Key CryptoGraphy Standards 
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // });

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
                
                // console.log('PublicKeyString::', PublicKeyString);
                // const publicKeyObject = crypto.createPublicKey(PublicKeyString);
                // console.log('publicKeyObject', publicKeyObject);

                // created token pair
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
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService