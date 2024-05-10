const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const user = require("../db/models/user");
const AccessService = require("../services/access.services");


class AccessController {

    handlerRefreshToken = async(req, res, next) => {
        new SuccessResponse({
            message: 'Get token success!',
            metadata: await AccessService.handlerRefreshToken(req.body.refreshToken)
        }).send(res);
    }

    logout = async(req, res, next) => {
        console.log('req.Keystore', req.keyStore);

        new SuccessResponse({
            message: 'Logout success!',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res);
    } 

    login = async(req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res);
    }

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