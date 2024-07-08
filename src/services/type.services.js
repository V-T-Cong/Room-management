const { BadRequestError } = require('../core/error.response');
const Room = require('../db/models/Room');
const RoomType = require('../db/models/Type');
const { getInfoData } = require('../utils');

class TypeServices {

    static async createRoomType({roomType, description}) {
        const holdType = await RoomType.findOne({where: {room_type: roomType}});
        if (holdType) {
            throw new BadRequestError('Room type already existed!')
        }
        const newRoomType = await RoomType.create({
            room_type: roomType,
            description: description
        })
        if(!newRoomType) {
            return {
                code: 'xxxx',
                message: 'Create type error'
            }
        }
        return {
            code: 201,
            metadata: {
                Type: getInfoData({fields:['id', 'room_type', 'description'], Object:newRoomType })
            }
        }
    }

    static async updateRoomType({roomType, description}) {
        const holdType = await RoomType.findOne({where: {room_type: roomType}});
        if (!holdType) {
            throw new BadRequestError("Room type doesn't exist in database");
        }
        // Update room type
        const updatedRoomType = await RoomType.findOne({ where: { room_type: roomType } });

        return {
        code: 200,
        metadata: {
            Type: getInfoData({ fields: ['id', 'room_type', 'description'], Object: updatedRoomType })
            }
        }
    }

    static async deleteRoomType({ roomType }) {
        // Find the room type by its identifier
        const holdType = await RoomType.findOne({ where: { room_type: roomType } });

        console.log('Hold Type:: ',holdType);
        if (!holdType) {
            throw new BadRequestError("Room type doesn't exist in database");
        }
    
        // Delete the room type
        const delRoomTypeCount = await RoomType.destroy({ where: { room_type: roomType } });
    
        return {
            code: 200,
            metadata: {
                message: `Deleted ${delRoomTypeCount} room type(s).`
            }
        }
    }

}

module.exports = TypeServices