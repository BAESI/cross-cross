const { Router } = require("express");
const router = Router();
const ctrl = require("./user.ctrl");
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
 */
router.post("/edit", ctrl.post_user_edit);

module.exports = router;
