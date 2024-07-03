const { use } = require("bcrypt/promises");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.services");



class AccessController {

    handleRefreshToken = async(req, res, next) => {
        new SuccessResponse({
            message: 'Get token success!',
            metadata: await AccessService.handleRefreshToken(req.body.refreshToken)
        }).send(res);
    }

    logout = async(req, res, next) => {
        try {
            console.log('req.Keystore', req.keyStore);
            const logoutResult = await AccessService.logout(req.keyStore);
            req.session.destroy();

            new SuccessResponse({
                message: 'Logout success!',
                metadata: logoutResult
            }).send(res);
        } catch (error) {
            next(error);
        }
    } 

    login = async (req, res, next) => {
        try {
            const loginResult = await AccessService.login(req.body);
            const user = loginResult.User;

            // Store user information in session
            req.session.User = {
                id: user.id,
                email: user.email,
                firstName: user.first_name
            };

            console.log('Sessions::', req.session);
            // Save the session
            req.session.save(err => {
                if (err) {
                    return res.status(500).send('Error saving session');
                }
                console.log(`Logged in! Your session ID is ${req.session.id}`);
                new SuccessResponse({
                    metadata: loginResult,
                }).send(res);
            });
        } catch (error) {
            next(error);
        }
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

module.exports = new AccessController();