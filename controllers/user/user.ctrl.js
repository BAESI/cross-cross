const model = require("../../models");
const bcrypt = require("bcrypt");
const e = require("express");

exports.get_user = async (req, res, next) => {
  try {
    const user = await model.User.findOne({ where: { id: req.user.id } });
    return res.render("user/profile.pug", user);
  } catch (e) {
    return next(e);
  }
};

exports.get_user_edit = async (req, res, next) => {
  try {
    const user = await model.User.findOne({ where: { id: req.user.id } });
    return res.render("user/edit.pug", user);
  } catch (e) {
    return next(e);
  }
};

exports.post_user_edit = async (req, res, next) => {
  try {
    const { nickname, password } = req.body;
    const user = await model.User.findOne({ where: { id: req.user.id } });
    // 비밀번호가 일치해야 프로필 수정이 가능하다.
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      const existNickName = await model.User.findOne({ where: { nickName } });
      if (!existNickName) {
        const editedUser = await model.User.update({ nickname }, { where: { id: req.user.id } });
        // 완료시에 edit.pug 페이지로 이동함
        return res.send('<script>alert("프로필 수정을 완료하였습니다."); location.href="/user/edit";</script>', editedUser);
      } else {
        return res.send('<script>alert("이미 존재하는 닉네임입니다.");</script>');
      }
    } else {
      return res.send('<script>alert("비밀번호가 일치하지 않습니다.");</script>');
    }
  } catch (e) {
    return next(e);
  }
};
