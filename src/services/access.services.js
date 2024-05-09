const db = require('../db/models/index');

const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenServices = require('./keyToken.services');
const { createTokenPair } = require('../auth/authUtil');
const { getInfoData } = require('../utils');
const { BadRequestError, ConflictRequestError, AuthFailureError } = require('../core/error.response');

// Services
const { findByEmail } = require('./user.services');


class AccessService {

    static logout = async(keyStore) => {
        const delKey = await KeyTokenServices.removekeyById(keyStore.id);
        console.log({delKey});
        return delKey
    }


    // LOGIN
    static login = async({email, password, refreshToken = null}) => {

        // 1. Find User in database
        const foundUser = await findByEmail({email});
        if(!foundUser) throw new BadRequestError("User hasn't been registed");

        console.log('User::', foundUser);
        // 2. Check password
        const match = bcrypt.compare(password, foundUser.password);
        if(!match) throw new AuthFailureError('Authentication error');

        // 3. create privateKey and publicKey
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        // 4. generate tokens
        const tokens = await createTokenPair({ UserId: foundUser.id, email }, publicKey, privateKey);

        await KeyTokenServices.createKeyToken({
            UserId: foundUser.id,
            privateKey,
            publicKey,
            refreshToken: tokens.refreshToken,
        });

        return {
            User: getInfoData({ fields: ['id', 'firstName', 'email'], Object: foundUser }),
            tokens
        }
    }


    // SIGNUP
    static signUp = async ({ firstName, lastName, gender, email, password, phonenumber, isActivate }) => {
        // try {
            // check Email is exists
            const HoldUser =  await db.users.findOne({ where: { email } });
            if (HoldUser) {
                throw new BadRequestError('Error: User already registered!');
            }
    
            const passwordhash = await bcrypt.hash(password, 10);
    
            const NewUser = await db.users.create({
                firstName,
                lastName,
                gender,
                email,
                password: passwordhash,
                phonenumber,
                isActivate
            });
    
            if (NewUser) {

                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 2048,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem'
                    }
                });
    
                console.log({ privateKey, publicKey });

                const tokens = await createTokenPair({ UserId: NewUser.id, email }, publicKey, privateKey);
                console.log(`Created Token Success::`, tokens);

                // save collection keyStore
                const KeyStore = await KeyTokenServices.createKeyToken({
                    UserId: NewUser.id,
                    publicKey,
                    privateKey,
                    refreshToken: tokens.refreshToken
                });
    
                console.log('New KeyStore::',KeyStore);

                if(!KeyStore) {
                    return {
                        code: 'xxxx',
                        message: 'KeyStore error'
                    }
                }
                
    
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