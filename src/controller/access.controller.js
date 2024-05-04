const { OK, CREATED } = require("../core/success.response");
const user = require("../db/models/user");
const AccessService = require("../services/access.services");


class AccessController {

    signUp = async(req, res, next) => {
        new CREATED({
            message: 'Registered success!',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10
            }
        }).send(res);

    }

}

module.exports = new AccessController()