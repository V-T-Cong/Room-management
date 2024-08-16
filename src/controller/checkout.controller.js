const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const CheckoutServices = require('../services/checkout.services');

class CheckoutController {
    checkout = async (req, res, next) => {
        try {
            const resultCheckout = await CheckoutServices.checkOutPayment(req.body);
            new SuccessResponse({
                message: 'Checkout successful',
                metadata: resultCheckout,
            }).send(res);
        } catch (error) {
            console.error("Error during checkout: ", error);
            next(error);
        }
    }
}

module.exports = new CheckoutController();
