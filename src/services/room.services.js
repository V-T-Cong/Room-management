const { read } = require('fs');
const { BadRequestError } = require('../core/error.response');
const Room = require('../db/models/Room');
const Price = require('../db/models/price');
const StripeServices = require('./stripe.services');

class RoomServices {

    static async createRoom({ roomName, roomNumber, roomFloor, roomType, roomSize, roomPrice, description, roomImage }) {
        // Input validation
        if (!roomType) {
            throw new BadRequestError('Each room must have a type!');
        }

        if (!roomName) {
            throw new BadRequestError('Each room must have a name!');
        }

        if (!roomNumber) {
            throw new BadRequestError('Each room must have a number!');
        }

        // Check if a room with the same room number already exists
        const holdRoom = await Room.findOne({ where: { room_number: roomNumber } });
        if (holdRoom) {
            throw new BadRequestError('Room already exists!');
        }

        const roomStripeId = await StripeServices.createStripeProductId(roomName, description);
        const pricePriceId = await StripeServices.createStripePriceId(roomPrice, roomStripeId.id);

        // Create the new room with the provided details
        const newRoom = await Room.create({
            stripe_product_id: roomStripeId.id,
            room_name: roomName,
            room_number: roomNumber,
            room_floor: roomFloor,
            room_type: roomType,
            room_size: roomSize,
            description: description,
            // room_image: roomImage,
        });

        const newPrice = await Price.create({
            stripe_price_id: pricePriceId.id,
            room_id: newRoom.room_id,
            unit_amount: roomPrice,
            currency: 'vnd'
        });

        // Return the created room details and a success message
        return {
            code: 201,
            metadata: {
                message: 'Room successfully created!',
                room: newRoom,
                price: newPrice
            }
        };
    }

    static async updateRoom({ roomNumber, roomName, roomFloor, roomType, roomSize, roomPrice, description, roomImage }) {
        try {
            // Check if the room number is provided
            if (!roomNumber) {
                throw new BadRequestError('Room number must be provided for update!');
            }
            // Check if the room exists
            const existingRoom = await Room.findOne({ where: { room_number: roomNumber } });
            if (!existingRoom) {
                throw new NotFoundError('Room not found!');
            }
            // Update the room details
            const updatedRoom = await existingRoom.update({
                room_name: roomName || existingRoom.room_name,
                room_floor: roomFloor || existingRoom.room_floor,
                room_type: roomType || existingRoom.room_type,
                room_size: roomSize || existingRoom.room_size,
                room_price: roomPrice || existingRoom.room_price,
                description: description || existingRoom.description,
                room_image: roomImage || existingRoom.room_image,
            });
            // Return the updated room details and a success message
            return {
                code: 200,
                metadata: {
                    message: 'Room successfully updated!',
                    room: updatedRoom
                }
            };
        } catch (error) {
            // Handle different types of errors
            if (error instanceof BadRequestError) {
                return {
                    code: 400,
                    metadata: {
                        message: error.message
                    }
                };
            } else if (error instanceof NotFoundError) {
                return {
                    code: 404,
                    metadata: {
                        message: error.message
                    }
                };
            } else {
                // Log the error and return a generic error message
                console.error('Error updating room:', error);
                return {
                    code: 500,
                    metadata: {
                        message: 'An unexpected error occurred. Please try again later.'
                    }
                };
            }
        }
    }

    static async deleteRoom({ roomNumber }) {
        // Find the room by room number
        const existingRoom = await Room.findOne({ where: { room_number: roomNumber } });
        
        if (!existingRoom) {
            return {
                code: 404,
                metadata: {
                    message: 'Room not found!'
                }
            };
        }
    
        // Delete the room
        await Room.destroy({ where: { room_number: roomNumber }});
    
        // Return a success response
        return {
            code: 200,
            metadata: {
                message: 'Room successfully deleted!'
            }
        };
    }

    static findRoom = async(roomNumber) => {
        const roomFind = await Room.findOne({where: {room_number: roomNumber.roomNumber}});
        if (!roomFind) {
            throw new BadRequestError('Room not found!');
        }
        return roomFind;
    }

    static checkRoomActivate = async(roomNumber) => {
        if (!roomNumber.roomNumber) {
            throw new BadRequestError('Room number must be provided!');
        }

        const room = await Room.findOne({
            where: { room_number: roomNumber.roomNumber },
            raw: true
        });

        if (!room) {
            throw new NotFoundError('Room not found!');
        }

        return room.is_avaiable;
    }
}


module.exports = RoomServices;