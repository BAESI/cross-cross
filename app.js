const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

dotenv.config();

const { sequelize } = require("./models");
const passportConfig = require("./passport");

// app set
const app = express();
app.set("port", process.env.PORT || 4001);
passportConfig();

// sequelize init
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("정상적으로 데이터베이스에 연결되었습니다.");
  })
  .catch((err) => {
    console.error(err);
  });

// session middleware
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: { httpOnly: true, secure: false },
};
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
// middleware setting
app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());

// router
app.use("/favicon.ico", (req, res) => {
  res.status(204);
});

const middleware = require("./middlewares/auth");

const authRouter = require("./controllers/auth");
const userRouter = require("./controllers/user");
const postRouter = require("./controllers/post");
app.use("/auth", authRouter);
app.use("/user", middleware.isAuthenticated, userRouter);
app.use("/post", middleware.isAuthenticated, postRouter);

// 404
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ success: false, message: err.message });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버를 시작합니다!");
});
