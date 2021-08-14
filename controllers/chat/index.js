const { Router } = require("express");
const router = Router();
const ctrl = require("./chat.ctrl");
const multer = require("../../multer");

/**
 * @route GET /chat/rooms
 * @description 내 채팅목록 보기
 */
router.get("/rooms", ctrl.get_chat_rooms);

/**
 * @route GET /chat/room/:chatRoomId
 * @description 채팅내용 확인하기
 */
router.get("/room/:chatRoomId", ctrl.get_chat_room);

/**
 * @description 채팅 이미지 전송
 * @routes POST /chat/image/:chatRoomId
 */
router.post("/room/image/:chatRoomId", multer.messageUpload.single("image"), ctrl.post_chat_image);

module.exports = router;
