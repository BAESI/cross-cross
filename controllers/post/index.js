const { Router } = require("express");
const router = Router();
const ctrl = require("./post.ctrl");

/**
 * @route GET /post
 * @description demo 버전
 */
router.get("/", ctrl.get_post);

/**
 * @route GET /post/calendar?month&year
 * @description 캘린더 해당 년월 첫날짜와 마지막날짜 불러오기
 */
router.get("/calendar", ctrl.get_post_calendar);

/**
 * @route POST /post/calendar/select?filter
 * @description 조건에 맞는 게시글 리스트들 조회
 * @body startDate, startPoint, endPoint
 */
router.post("/calendar/select", ctrl.post_post_calendar_select);

/**
 * @route GET /post/write
 * @description 게시글 작성페이지
 * @body startDate, endDate, startPoint, endPoint, airline, price, luggageWeight
 */
router.get("/write", ctrl.get_post_write);

/**
 * @route POST /post/write
 * @description 게시글 작성하기
 * @body startDate, endDate, startPoint, endPoint, airline, price, luggageWeight
 */
router.post("/write", ctrl.post_post_write);

module.exports = router;
