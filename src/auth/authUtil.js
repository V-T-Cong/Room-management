const JWT = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.services');
const e = require('express');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const createTokenPair = async( PayLoad, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(PayLoad, privateKey, {
            expiresIn: '2 days',
            algorithm: 'RS256'
        });

        const refreshToken = await JWT.sign(PayLoad, privateKey, {
            expiresIn: '7 days',
            algorithm: 'RS256'
        });

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if(err) {
                console.error('error verify::', err);
            }
            else {
                console.log('decode verify::', decode);
            }
        })

        return {accessToken, refreshToken}

    } catch (error) {
        console.log('createTokenPair::',error);
    }
}

const authentication = asyncHandler(async(req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if(!userId) throw new AuthFailureError('Invalid Request');


    const keyStore = await findByUserId(userId);
    if(!keyStore) throw new NotFoundError('Not Found keyStore');

    // console.log('KeyStore::',keyStore);
    // console.log('keyStore Publickey::', keyStore.public_key);

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if(!accessToken) throw new AuthFailureError('Invalid Request');

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.public_key)
        if (userId != decodeUser.user_id) throw new AuthFailureError('Invalid UserId');
        req.keyStore = keyStore;
        return next()
    } catch (error) { 
        console.log('error authen', error);
        throw error
    }
})

const verifyJWT = async(token, keySecret) => {
    return await JWT.verify(token, keySecret)
}

module.exports = {createTokenPair, authentication, verifyJWT}