exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.send('<script>alert("로그인하신 뒤 다시 이용해주세요."); location.href="/auth/login";</script>');
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) next();
  } else {
    return res.send('<script>alert("접근 권한이 없습니다.");');
  }
};
