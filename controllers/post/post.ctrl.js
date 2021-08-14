const model = require("../../models");
const now = new Date();
const Op = require("sequelize").Op;

exports.get_post_calendar = async (req, res, next) => {
  // month를 특별히 선택하지 않으면 현재 날짜 => 처음 이 페이지에 들어왔을 때
  const month = req.query.month ? Number(req.query.month) : now.getMonth() + 1;
  const year = req.query.year ? Number(req.query.year) : now.getFullYear();
  const MONTHSTART = new Date(year, month - 1, 2); // 해당 년월에 첫번째 날짜 ex) 1
  const MONTHEND = new Date(year, month, 1); // 해당 년월에 마지막 날짜 ex) 31
  return res.send({ MONTHSTART, MONTHEND });
};

exports.post_post_calendar_select = async (req, res, next) => {
  const { startDate, startPoint, endPoint } = req.body;
  const postFilter = Number(req.query.filter) ? "basic" : model.Post.rawAttributes.status.values;
  try {
    const DAYSTART = new Date(startDate).setHours(0);
    const DAYEND = new Date(startDate).setHours(23, 59, 59);
    const selectedPosts = await model.Post.findAll({
      where: {
        startDate: { [Op.gte]: DAYSTART, [Op.lte]: DAYEND },
        startPoint,
        endPoint,
        status: postFilter,
      },
      include: { model: model.User },
    });
    const posts = [];
    for (let i = 0; i < selectedPosts.length; i++) {
      let post = {
        id: selectedPosts[i].id,
        startDate: selectedPosts[i].startDate,
        endDate: selectedPosts[i].endDate,
        startPoint: selectedPosts[i].startPoint,
        endPoint: selectedPosts[i].endPoint,
        airline: selectedPosts[i].airline,
        price: selectedPosts[i].price,
        status: selectedPosts[i].status,
        brokerNickname: selectedPosts[i].User.nickname,
      };
      posts.push(post);
    }
    return res.send({ posts });
  } catch (e) {
    return next(e);
  }
};

exports.get_post_write = async (req, res, next) => {
  return res.render("write.pug", {
    pageTitle: "write",
  });
};

exports.post_post_write = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  if (startDate > endDate) {
    return res.send('<script>alert("예상출발시간은 예상도착시간보다 항상 이전이어야합니다.");</script>');
  }
  req.body.brokerId = req.user.id;
  const post = await model.Post.create(req.body);
  return res.send('<script>alert("글 작성에 성공하였습니다.");location.href="/post/calendar";</script>');
};

exports.get_post = async (req, res, next) => {
  return res.render("core.pug", {
    pageTitle: "core",
  });
};
