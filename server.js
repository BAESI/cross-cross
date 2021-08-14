const app = require("./app");

// app
const server = app.listen(app.get("port"), () => {
  console.log("🚀🚀🚀 " + app.get("port") + "번 포트에서 서버를 시작합니다! 🚀🚀🚀");
});

const io = require("socket.io")(server);

io.use((socket, next) => {
  app.sessionMiddleWare(socket.requset, socket.requset.res, next);
});

const connection = require("./socket");
connection(io);
