const CartServices = require("../services/cart.services");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");


class CartController {

    viewCart = async(req, res, next) => {
        new SuccessResponse({
            message: 'Cart data!',
            metadata: await CartServices.viewCart(req.body),
        }).send(res);
    }

    removeCart = async(req, res, next) => {
        new SuccessResponse({
            message: 'remove successfull!',
            message: await CartServices.removeCart(req.body)
        }).send(res);
    }

    addToCart = async(req, res, next) => {
        new CREATED({
            message: 'add to cart success!',    
            metadata: await CartServices.addToCart(req.body)
        }).send(res);
    }
}

module.exports = new CartController();