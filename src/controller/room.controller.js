const RoomServices = require('../services/room.services');
const {SuccessResponse} = require('../core/success.response');
const TypeService = require('../services/type.services');

class RoomController {

    createRoomType = async(req, res, next) => {
        new SuccessResponse({
            message: 'Create room type success!',
            metadata: await TypeService.createRoomType(req.body)
        }).send(res);
    }

    updateRoomType = async(req, res, next) => {
        new SuccessResponse({
            message: 'Update room type success!',
            metadata: await TypeService.updateRoomType(req.body)
        }).send(res)
    }

    deleteRoomType = async(req, res, next) => {
        new SuccessResponse({
            message: 'Delete room type success!',
            metadata: await TypeService.deleteRoomType(req.body)
        }).send(res)
    }

    createRoom = async(req, res, next) => {
        new SuccessResponse({
            message: 'Create room success!',
            metadata: await RoomServices.createRoom(req.body)
        }).send(res)
    }
}


module.exports = new RoomController()