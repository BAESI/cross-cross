const model = require("../../models");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

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
    const profileImage = req.file ? req.file.filename : user.profileImage;
    const uploadDir = path.join(__dirname, "../../assets/image");
    // 비밀번호가 일치해야 프로필 수정이 가능하다.
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      const existNickName = await model.User.findOne({ where: { nickName } });
      if (!existNickName) {
        // 사진파일이 업로드되고 프로필사진이 아니라면 기존 프로필사진을 storage에서 제거한다.
        if (req.file && user.profileImage !== "profile-default.png") {
          fs.unlinkSync(uploadDir + "/" + user.profileImage);
        }
        const editedUser = await model.User.update({ nickname, profileImage }, { where: { id: req.user.id } });
        // 완료시에 edit.pug 페이지로 이동함
        return res.send('<script>alert("프로필 수정을 완료하였습니다."); location.href="/user/edit";</script>', editedUser);
      } else {
        if (req.file) {
          // 파일이 들어오고 중복검사에 실패하면 다시 삭제시킨다.
          fs.unlinkSync(req.file.path);
        }
        return res.send('<script>alert("이미 존재하는 닉네임입니다.");</script>');
      }
    } else {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.send('<script>alert("비밀번호가 일치하지 않습니다.");</script>');
    }
  } catch (e) {
    return next(e);
  }
};

exports.put_user_edit_image = async (req, res, next) => {
  const uploadDir = path.join(__dirname, "../../assets/image");
  try {
    const user = await model.User.findOne({ where: { userId: req.user.id }, attributes: ["profileImage"] });
    if (user.profileImage != "profile-default.png") {
      // 현재 회원의 프로필이미지가 기본이미지가 아니라면 변경진행
      fs.unlinkSync(uploadDir + "/" + user.profileImage);
      await model.User.update({ profileImage: "profile-default.png" }, { where: { userId: req.user.id } });
      return res.send('<script>alert("프로필이미지를 기본이미지로 변경하였습니다..");</script>');
    } else {
      return res.send('<script>alert("현재 등록된 프로필이미지가 없습니다.");</script>');
    }
  } catch (e) {
    return next(e);
  }
};
