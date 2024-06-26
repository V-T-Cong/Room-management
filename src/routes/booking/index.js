const express = require('express');
const router = express.Router();
const {asyncHandler} = require('../../helpers/asyncHandler');
const BookingController = require('../../controller/booking.controller');


router.post('/createbooking', asyncHandler(BookingController.createBooking));

module.exports = router