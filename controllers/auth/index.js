const { Router } = require("express");
const router = Router();
const ctrl = require("./auth.ctrl");
const passport = require("passport");
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

/**
 * @route GET /auth/login
 * @description 로그인
 */
router.get("/login", ctrl.get_login);

/**
 * @route POST /auth/join
 * @description 로그인 유저 확인
 */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  ctrl.post_login
);

/**
 * @route GET /auth/logout
 * @description 로그아웃 후 로그인페이지로 이동
 */
router.get("/logout", ctrl.get_logout);

module.exports = router;
