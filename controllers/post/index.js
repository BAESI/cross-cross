const { Router } = require("express");
const router = Router();
const ctrl = require("./post.ctrl");

/**
 * @route GET /post/calendar?month?year
 * @description 캘린더 카운트
 */
router.get("/calendar", ctrl.get_post_calendar);

/**
 * @route POST /post
 * @description 게시글 작성하기
 * @body startDate, endDate, startPoint, endPoint, airline, price, luggageWeight
 */
router.post("/", ctrl.post_post);

module.exports = router;
