const app = require("./app");

// app
const server = app.listen(app.get("port"), () => {
  console.log("πππ " + app.get("port") + "λ² ν¬νΈμμ μλ²λ₯Ό μμν©λλ€! πππ");
});

const io = require("socket.io")(server);

io.use((socket, next) => {
  app.sessionMiddleWare(socket.requset, socket.requset.res, next);
});

const connection = require("./socket");
connection(io);
