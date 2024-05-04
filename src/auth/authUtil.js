const JWT = require('jsonwebtoken')

const CreateTokenPair = async( PayLoad, publicKey, privateKey) => {
    try {
        // accessToken
        const AccessToken = await JWT.sign(PayLoad, publicKey, {
            expiresIn: '2 days'
        });

        const RefreshToken = await JWT.sign(PayLoad, privateKey, {
            expiresIn: '7 days'
        });

        JWT.verify(AccessToken, publicKey, (err, decode) => {
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