const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const CheckoutServices = require('../services/checkout.services');

class CheckoutController {
    checkout = async (req, res, next) => {
        try {
            console.log("Request Body: ", req.body);

            // Basic validation for request body
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Invalid request, request body is missing or empty." });
            }

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
