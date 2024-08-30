const express = require('express');
const router = express.Router();
const path = require('path');
const { apiKey, checkPermission } = require('../auth/CheckAuth');

//// check apikey
// router.use(apiKey);
// check permission
// router.use(checkPermission('0000'))

// access
router.use('/v1/api/access', require('./access'));
router.use('/v1/api/room', require('./room'));
router.use('/v1/api/cart', require('./cart'));
router.use('/v1/api/checkout', require('./checkout'));


module.exports = router;    