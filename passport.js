const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const model = require("./models");

// passportConfig
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (email, password, done) => {
      try {
        // 비밀번호만 틀렸는지 존재하지 않는 이메일인지 구분
        const exUser = await model.User.findOne({ where: { email } });
        if (exUser) {
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            return done(null, exUser);
          } else {
            return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } else {
          return done(null, false, { message: "존재하지 않는 이메일입니다." });
        }
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializeUser");
  done(null, user);
});
module.exports = passport;
