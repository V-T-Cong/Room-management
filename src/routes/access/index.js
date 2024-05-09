const express = require('express');
const accessController = require('../../controller/access.controller');
const router = express.Router();
const {asyncHandler} = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtil');


router.post('/3Bros/signup', asyncHandler(accessController.signUp));
router.post('/3Bros/login', asyncHandler(accessController.login));

router.use(authentication)
router.post('/3Bros/logout', asyncHandler(accessController.logout));

module.exports = router