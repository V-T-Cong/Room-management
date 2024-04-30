const user = require("../db/models/user");
const AccessService = require("../services/access.services");


class AccessController {

    signUp = async(req, res, next) => {
        try {
            console.log('[P]::signup::', req.body);
            return res.status(201).json(await AccessService.signup(req.body));
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AccessController()