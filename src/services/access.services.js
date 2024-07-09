const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const users = require('../db/models/User')
const { getInfoData } = require('../utils');
const keytokens = require('../db/models/KeyTokens');
const KeyTokenServices = require('./keyToken.services');
const { createTokenPair, verifyJWT } = require('../auth/authUtil');
const { BadRequestError, AuthFailureError, ForbiddenError} = require('../core/error.response');

// Services
const { findByEmail } = require('./user.services');
const StripeServices = require('./stripe.services');


class AccessService {

    static handleRefreshToken = async (refreshToken) => {
        //  Check token has been used
        const foundToken = await KeyTokenServices.findByRefreshTokenUsed(refreshToken);
        console.log('FoundToken:: ', foundToken);
        //  if it used 
        if(foundToken) {
            //  decode to watch which is the token is using
            const {user_id, email} = await verifyJWT(refreshToken, foundToken.privatekey);
            console.log({user_id, email});
            await KeyTokenServices.deleteKeyById(user_id);
            throw new ForbiddenError('Something wrong happen !! Please reLogin')
        }

        const holderToken = await KeyTokenServices.findByRefreshToken(refreshToken);
        if(!holderToken) throw new AuthFailureError('User not registered');

        const {user_id, email} = await verifyJWT(refreshToken, holderToken.private_key);
        console.log('[2]--', {user_id, email});

        const foundUser = await findByEmail({email});
        if(!foundUser) throw new AuthFailureError('User not registered');

        const tokens = await createTokenPair({ user_id: foundUser.id, email }, holderToken.public_key, holderToken.private_key);

        await keytokens.update({
            refresh_tokens: tokens.refreshToken,
            refresh_tokens_used: [refreshToken.toString()],
        },
        {
            where: {user_id: user_id}
        })

        return {
            user: {user_id, email},
            tokens
        }
    }

    

    // LOGOUT
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

        // console.log('User::', foundUser);
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
        const tokens = await createTokenPair({ user_id: foundUser.id, email }, publicKey, privateKey);

        await KeyTokenServices.createKeyToken({
            UserId: foundUser.id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken
        });

        return {
            User: getInfoData({ fields: ['id', 'first_name', 'email'], Object: foundUser }),
            tokens
        }
    }


    // SIGNUP
    static signUp = async ({ firstName, lastName, gender, email, password, phoneNumber, isActivate }) => {
        try {
            // check Email is exists
            const HoldUser =  await users.findOne({ where: { email } });
            console.log('Hold User:: ',HoldUser);
            if (HoldUser) {
                throw new BadRequestError('Error: User already registered!');
            }
    
            const passwordHash = await bcrypt.hash(password, 10);
            console.log("Password:: ", passwordHash);

            const stripeCustomerId = await StripeServices.createStripeCustomerId(email, firstName, lastName, phoneNumber);
    
            const NewUser = await users.create({
                customer_id: stripeCustomerId,
                first_name: firstName,
                last_name: lastName,
                gender: gender,
                email: email,
                password: passwordHash,
                phone_number: phoneNumber,
                is_activate: isActivate
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

                const tokens = await createTokenPair({ user_id: NewUser.id, email }, publicKey, privateKey);
                console.log(`Created Token Success::`, tokens);

                // save collection keyStore
                const KeyStore = await KeyTokenServices.createKeyToken({
                    UserId: NewUser.id,
                    publicKey,
                    privateKey,
                    refreshToken: tokens.refreshToken
                });

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
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;