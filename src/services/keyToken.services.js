const db = require('../db/models/index')

class KeyTokenServices {
    static CreateKeyToken = async({UserId, publicKey, privateKey}) => {

        try {
            // const PublickeyString = publicKey.toString();
            
            const Tokens = await db.Keytoken.create({
                UserId: UserId,
                publickey: publicKey,
                privatekey: privateKey
            });

            return Tokens ? Tokens.publickey : null;

        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenServices;