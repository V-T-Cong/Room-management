const Room = require('../db/models/Room');
const Price = require('../db/models/price');

class CheckoutServices {
    static checkOutPayment = async(data) => {
        const roomNumberId = data.room_id;
        console.log("roomNumberId::", roomNumberId);
        const room = await Room.findAll({ 
            where: {room_id: roomNumberId},
            include: [
                {
                    model: Price,
                    as: 'prices',
                    required: false
                }
            ]
        });
        return room;
    }
}

module.exports = CheckoutServices;