const BookingServies = require('../services/booking.services');
const { OK, CREATED, SuccessResponse } = require("../core/success.response");

class BookingController {
    
    // createBooking = async(req, res, next) => {
    //     try {
    //         const newBooking = new 
    //         new SuccessResponse({
    //             message: 'Create booking successful!',
    //             metadata: await BookingServies.createBooking(req.body)
    //         }).send(res)
    //     } catch (error) {
            
    //     }
    // }

}

module.exports = new BookingController()