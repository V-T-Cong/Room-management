const { BadRequestError } = require("../core/error.response");
const roomServices = require("./room.services");
const Booking = require('../db/models/Booking');
const { getInfoData } = require("../utils");


class BookingServies {
    static async createBooking({customerId, roomNumber}) {
        const checkRoomActivate = await roomServices.checkRoomActivate(roomNumber);

        console.log("Check room is activate: ", checkRoomActivate);

        if(checkRoomActivate == false) {
            throw new BadRequestError('Message: Room already used');
        }

        const roomId = roomServices.findRoom(roomNumber);
        const newBooking = await Booking.create({
            user_id: customerId,
            room_id: roomId.room_id
        });

        return {
            code: 201,
            metadata: {
                Booking: getInfoData({ fields: ['id', 'user_id', 'room_id'], Object: newBooking })
            }
        }
        
    }
}

module.exports = BookingServies