const JWT = require('jsonwebtoken')

const CreateTokenPair = async( PayLoad, PublicKey, PrivateKey) => {
    try {
        // accessToken
        const AccessToken = await JWT.sign(PayLoad, PrivateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        });

        const RefreshToken = await JWT.sign(PayLoad, PrivateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        });

        JWT.verify(AccessToken, PublicKey, (err, decode) => {
            if(err) {
                console.error('error verify::', err);
            }
            else {
                console.log('decode verify::', decode);
            }
        })

        return {AccessToken, RefreshToken}
    } catch (error) {
        
    }
}

module.exports = {CreateTokenPair}