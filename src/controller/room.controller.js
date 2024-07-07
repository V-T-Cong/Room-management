const RoomServices = require('../services/room.services');
const {SuccessResponse} = require('../core/success.response');
const TypeService = require('../services/type.services');

class RoomController {

    //  CONTROLLERS FOR ROOM TYPES
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

    // CONTROLLER FOR ROOMS
    createRoom = async(req, res, next) => {
        new SuccessResponse({
            message: 'Create room success!',
            metadata: await RoomServices.createRoom(req.body)
        }).send(res)
    }

    deleteRoom = async(req, res, next) => {
        new SuccessResponse({
            message: 'Remove room success!',
            metadata: await RoomServices.deleteRoom(req.body)
        }).send(res);
    }

    findRoom = async(req, res, next) => {
        new SuccessResponse({
            message: 'Find room success!',
            metadata: await RoomServices.findRoom(req.body)
        }).send(res);
    }

    checkRoomActivate = async(req, res, next) => {
        new SuccessResponse({
            message: 'Room number status!',
            metadata: await RoomServices.checkRoomActivate(req.body)
        }).send(res);
    }
}


module.exports = new RoomController()