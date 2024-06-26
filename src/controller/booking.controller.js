const BookingServies = require('../services/booking.services');
const { OK, CREATED, SuccessResponse } = require("../core/success.response");

class BookingController {
    
    createBooking = async(req, res, next) => {
        new SuccessResponse({
            message: 'Create booking successful!',
            metadata: await BookingServies.createBooking(req.body)
        }).send(res)
    }

}

module.exports = new BookingController()