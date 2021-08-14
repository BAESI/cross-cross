const { Router } = require("express");
const router = Router();
const ctrl = require("./user.ctrl");
const multer = require("../../multer");
/**
 * @route GET /user
 * @description 마이프로필 조회
 */
router.get("/", ctrl.get_user);

/**
 * @route GET /user/edit
 * @description 마이프로필 수정하기 페이지
 */
router.get("/edit", ctrl.get_user_edit);

/**
 * @route POST /user/edit
 * @description 마이프로필 수정완료
 * @body nickname, password
 * @file image
 */
router.post("/edit", multer.profileUpload.single("image"), ctrl.post_user_edit);

/**
 * @route PUT /user/edit/image
 * @description 프로필 이미지 기본이미지로 변경
 */
router.put("/edit/image", ctrl.put_user_edit_image);

module.exports = router;
