const express = require('express');
const router = express.Router();
const {asyncHandler} = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtil');
const accessController = require('../../controller/access.controller');
const isAuthenticated = require('../../middleware/authMiddleware');


router.post('/3Bros/signup', asyncHandler(accessController.signUp));
router.post('/3Bros/login', asyncHandler(accessController.login));

router.post('/cart', (req, res) => {
    if(!req.session.User) return res.sendStatus(401);
    const {body: item} = req;
    const {cart} = req.session;         
    if (cart) {
        cart.push(item);
    } else {
        req.session.cart = [item];
    }
    return res.status(201).send(item);
});

router.get('/cart', (req, res) => {
    if (!req.session.User) 
        return res.sendStatus(401);
    return res.send(req.session.cart ?? []);    
});

router.use(authentication);
router.use(isAuthenticated);

router.post('/3Bros/logout', asyncHandler(accessController.logout));
router.post('/3Bros/handlerRefreshToken', asyncHandler(accessController.handleRefreshToken));

module.exports = router 