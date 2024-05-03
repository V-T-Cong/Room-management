const { findById } = require('../services/apikey.services')


const apiKey = async(req, res, next) => {
    try {
        // fin the way to get 
        const key = req.headers.api_key;
        console.log(key);
        if(!key) {
            return res.status(403).json({
                message: 'Forbiden Error'
            });
        }

        // check objKey
        const objkey = await findById(key);
        if(!objkey) {
            return res.status(403).json({
                message: 'Forbiden Error'
            });
        }
        req.objkey = objkey;
        return next();

    } catch (error) {
        
    }
}

const checkPermission = (permission) => {
    return (req, res, next) => {
        if(!req.objkey.permissions) {
            return res.status(403).json({
                message: 'Permission denied!',
            })
        }

        console.log('Permission::', req.objkey.permissions);
        const validPermission = req.objkey.permissions.includes(permission);
        if(!validPermission) {
            return res.status(403).json({
                message: 'Permission denied!'
            });
        }

        return next();
    }
}

module.exports = { apiKey, checkPermission } 