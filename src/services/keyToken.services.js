const KeyTokenModel = require('../db/models/keytokens')

class KeyTokenServices {
    static CreateKeyToken = async({UserId, PublicKey}) => {

        try {
            const PublickeyString = PublicKey.toString();
            const Tokens = await KeyTokenModel.create({
                UserId: UserId,
                publickey: PublickeyString,
            });
            return Tokens ? PublickeyString: null;

        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenServices;