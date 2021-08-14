const { Router } = require("express");
const router = Router();
const ctrl = require("./auth.ctrl");

/**
 * @route GET /auth/join
 * @description 회원가입
 */
router.get("/join", ctrl.get_join);

/**
 * @route POST /auth/join
 * @description 회원가입 가입완료전송
 */
router.post("/join", ctrl.post_join);

module.exports = router;
