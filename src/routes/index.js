const express = require('express');
const router = express.Router();
const { apiKey, checkPermission } = require('../auth/CheckAuth');

// check apikey
// router.use(apiKey);
// check permission
// router.use(checkPermission('0000'))

// access
router.use('/v1/api', require('./access'));
router.use('/v2/api', require('./room'))

module.exports = router;    