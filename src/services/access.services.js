const { User } = require('../db/models');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenServices = require('./keyToken.services');
const { CreateTokenPair } = require('../auth/authUtil');


class AccessService {
    static signup = async ({ firstName, lastName, gender, email, password, phoneNumber, isActivate }) => {
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
                phoneNumber,
                isActivate
            });
    
            if (NewUser) {
                // create privatekey and publickey
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                });
    
                console.log({ privateKey, publicKey });
    
                const PublicKeyString = await KeyTokenServices.CreateKeyToken({
                    UserId: NewUser._id,
                    publicKey
                });
    
                if(!PublicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'PublicKeyString error'
                    }
                }
    
                // created token pair
                const tokens = await CreateTokenPair({ UserId: NewUser._id, email }, publicKey, privateKey);
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