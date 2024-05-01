const  {User}  = require('../db/models');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenServices = require('./keyToken.services');
const { CreateTokenPair } = require('../auth/authUtil');
const { format } = require('path');


class AccessService {
    static signup = async ({ firstName, lastName, gender, email, password, phonenumber, isActivate }) => {
        try {
            const HoldUser =  await User.findOne({ where: { email } });
    
            if (HoldUser) {
                return {
                    code: 'xxx',
                    message: 'Email already used'
                }
            }
    
            const passwordhash = await bcrypt.hash(password, 10);
    
            const NewUser = await User.create({
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
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,

                    // public Key CryptoGraphy Standards 
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });
    
                console.log({ privateKey, publicKey });
                
                // save collection keyStore
                const PublicKeyString = await KeyTokenServices.CreateKeyToken({
                    UserId: NewUser.id,
                    publicKey
                });
    
                if(!PublicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'PublicKeyString error'
                    }
                }
                
                console.log('PublicKeyString::', PublicKeyString);
                const publicKeyObject = crypto.createPublicKey(PublicKeyString);

                console.log('publicKeyObject', publicKeyObject);
                // created token pair
                const tokens = await CreateTokenPair({ UserId: NewUser.id, email }, publicKeyObject, privateKey);
                console.log(`Created Token Success::`, tokens);
    
                return {
                    code: 201,
                    metadata: {
                        User: NewUser,
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