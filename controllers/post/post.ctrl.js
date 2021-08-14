const model = require("../../models");
const now = new Date();
const Op = require("sequelize").Op;

exports.get_post_calendar = async (req, res, next) => {
  // month를 특별히 선택하지 않으면 현재 날짜 => 처음 이 페이지에 들어왔을 때
  const month = req.query.month ? Number(req.query.month) : now.getMonth() + 1;
  const year = req.query.year ? Number(req.query.year) : now.getFullYear();

  const MONTHSTART = new Date(year, month, 1); // 해당 년월에 첫번째 날짜 ex) 1
  const MONTHEND = new Date(year, month, 0); // 해당 년월에 마지막 날짜 ex) 31
  const post = await model.Post.findAll({
    where: {
      startDate: {
        [Op.gt]: MONTHSTART,
        [Op.lt]: MONTHEND,
      },
    },
  });
  // TODO: post가 어떻게 나오는지 찍어보고 날짜별로 카운트 넣어줌
};

exports.post_post = async (req, res, next) => {
  const { startDate, endDate } = req.body;
  if (startDate > endDate) {
    return res.send('<script>alert("예상출발시간은 예상도착시간보다 항상 이전이어야합니다.");</script>');
  }
  req.body.brokerId = req.user.id;
  const post = await model.Post.create(req.body);
  return res.render("post/write.pug", post);
};
