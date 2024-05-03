const express = require('express');
const { apiKey, checkPermission } = require('../auth/CheckAuth');
const router = express.Router();

// check apikey
router.use(apiKey);
// check permission
router.use(checkPermission('0000'))

// access
router.use('/v1/api', require('./access'));

module.exports = router;