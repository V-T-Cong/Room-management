const express = require('express');
const router = express.Router();
const {asyncHandler} = require('../../helpers/asyncHandler');
const RoomController = require('../../controller/room.controller');


router.post('/createRoomType', asyncHandler(RoomController.createRoomType));
router.post('/updateRoomType', asyncHandler(RoomController.updateRoomType));
router.post('/deleteRoomType', asyncHandler(RoomController.deleteRoomType));

router.post('/createRoom', asyncHandler(RoomController.createRoom));
router.post('/deleteRoom', asyncHandler(RoomController.deleteRoom));
router.post('/findRoom', asyncHandler(RoomController.findRoom));
router.post('/checkRoomActivate', asyncHandler(RoomController.checkRoomActivate));

module.exports = router