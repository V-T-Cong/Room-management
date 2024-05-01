const {KeyTokenModel} = require('../db/models/keytokens')

class KeyTokenServices {
    static CreateKeyToken = async({UserId, publicKey}) => {

        try {
            const PublickeyString = publicKey.toString();
            
            const Tokens = await KeyTokenModel.create({
                UserId: UserId,
                publickey: PublickeyString,
            });

            return Tokens ? Tokens.Publickey : null;

        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenServices;