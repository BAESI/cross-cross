const model = require("./models");
const connection = (io) => {
  io.on("connection", (socket) => {
    disconnect(socket);
    findRoom(socket);
    enterRoom(socket);
    newRoom(socket, io);
    message(socket, io);
    imageMessage(socket, io);
  });
};
const disconnect = (socket) => {
  socket.on("disconnect", () => {
    console.log("disconnect socket");
  });
};

// 로그인 후 내 채팅목록에 들어가면 join!
const findRoom = (socket) => {
  socket.on("find", (userId) => {
    const strUserId = userId.toString();
    socket.join(strUserId);
    console.log(`${strUserId}-채팅방 불어오기에서 새로운 채팅방을 받기위해 join합니다.`);
  });
};

// 채팅방 목록에서 채팅방 하나를 들어갔을때 해당 채팅방으로 join!
const enterRoom = (socket) => {
  socket.on("enter", (chatRoomId) => {
    const strChatRoomId = chatRoomId.toString();
    socket.join(strChatRoomId);
    console.log(`${strChatRoomId}-채팅방에 join 합니다.`);
  });
};

// 채팅방 목록을 보고있으면 새로운 채팅방이 열리면 new!
const newRoom = (socket, io) => {
  socket.on("newRoom", async (chatRoomId) => {
    const chatRoom = await model.ChatRoom.findOne({ id: chatRoomId });
    const chatRoomInfo = {
      id: chatRoomId,
      lastChatDate: chatRoom.lastChatDate,
      lastChat: chatRoom.lastChat,
      setterId: chatRoom.setterId,
      postId: chatRoom.postId,
    };
    const userId = socket.request.session.passport.user.id;
    const strUserId = userId.toString();
    io.to(strUserId).emit("newRoom", chatRoomInfo);
  });
};

const message = (socket, io) => {
  socket.on("message", async (messageInfo) => {
    // 약속확정, 보상지급버튼을 클릭하면 프론트엔드에서 content를 "[system]: 약속확정을 하셨습니다.", "[system]: 심부름완료를 하셨습니다.", ...
    const { chatRoomId, content } = messageInfo;
    let lastChatContent = "";
    const chatMessage = await model.ChatMessage.create({
      content,
      chatRoomId,
      senderId: socket.request.session.passport.user.id,
    });

    // 채팅내용 미리보기이므로 10글자 이하로만 보여줄 예정
    if (content.length >= 10) {
      lastChatContent = content.slice(0, 10);
    } else {
      lastChatContent = content;
    }
    const message = {
      id: chatMessage.id,
      chatRoomId,
      content,
      senderId,
      createdAt: chatMessage.createdAt, // 보낸 날짜,시간
    };
    await model.ChatRoom.update({ lastChatDate: chatMessage.createdAt, lastChatContent }, { where: { id: chatRoomId } });
    const strChatRoomId = chatRoomId.toString(); // join으로 들어온 chatRoomId는 String이기 때문에 형변환
    io.to(strChatRoomId).emit("message", message); // 채팅방 목록과 채팅방안에서 message on으로 받음. 만약 처음 채팅방을 만드는 메세지에서 오면 socket newRoom으로 message 보내줌
  });
};

const imageMessage = (socket, io) => {
  socket.on("imageMessage", async (imageMessageInfo) => {
    const { id, chatRoomId, content, messageImage, senderId, createdAt } = imageMessageInfo;
    const image = {
      id,
      chatRoomId,
      content,
      senderId,
      createdAt,
      messageImage,
    };
    await model.ChatRoom.update({ lastChatDate: createdAt, lastChat: content }, { where: { id: chatRoomId } });
    const strChatRoomId = imageMessageInfo.chatRoomId.toString();
    io.to(strChatRoomId).emit("imageMessage", image);
  });
};

module.exports = connection;
