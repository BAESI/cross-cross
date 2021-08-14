const model = require("../../models");
const Op = require("sequelize").Op;

exports.get_chat_rooms = async (req, res, next) => {
  try {
    const posts = await model.Post.findAll({
      where: { brokerId: req.user.id },
      attributes: ["id"],
    });
    const postId = posts.map((post) => post.id);
    const chatRooms = await model.ChatRoom.findAll({
      where: {
        [Op.or]: [{ setterId: req.user.id }, { postId: { [Op.in]: postId } }],
        include: { model: model.Post, attributes: ["brokerId"] },
        attributes: ["id", "lastChat", "lastChatDate", "setterId"],
        order: [["lastChatDate", "DESC"]],
      },
    });
    const myChatRooms = [];
    for (let i = 0; i < chatRooms.length; i++) {
      let chatRoom = {
        id: chatRooms[i].id,
        lastChat: chatRooms[i].lastChat,
        lastChatDate: chatRooms[i].lastChatDate,
        sellerId: chatRooms[i].Post.brokerId,
        setterId: chatRooms[i].setterId,
        partner: chatRooms[i].setterId === req.user.id ? chatRooms[i].Post.brokerId : chatRooms[i].setterId,
      };
      myChatRooms.push(chatRoom);
    }
    return res.render("chatRooms.pug", { myChatRooms });
  } catch (e) {
    return next(e);
  }
};

exports.get_chat_room = async (req, res, next) => {
  const { chatRoomId } = req.params;
  try {
    const chatRoomMessages = await model.ChatMessage.findAll({
      where: { chatRoomId },
      order: [["createdAt", "ASC"]],
      include: { model: model.User, attributes: ["nickname", "profileImage"] },
    });
    const chatMessages = [];
    for (let i = 0; chatRoomMessages.length; i++) {
      let chatMessage = {
        id: chatRoomMessages[i].id,
        content: chatRoomMessages[i].content,
        messageImage: chatRoomMessages[i].messageImage,
        createdAt: chatRoomMessages[i].createdAt,
        senderNickname: chatRoomMessages[i].User.nickname,
        senderProfileImage: chatRoomMessages[i].User.senderProfileImage,
      };
      chatMessages.push(chatMessage);
    }
    return res.render("chatRoom.pug", { chatMessages });
  } catch (e) {
    return next(e);
  }
};

exports.post_chat_image = async (req, res, next) => {
  // params나 query는 string으로 들어온다. => 형변환 필요
  const { chatRoomId } = req.params;
  try {
    if (!req.file) {
      return res.send('<script>alert("파일이 없어 전송에 실패하였습니다.");</script>');
    }
    const messageImage = req.file.location;
    const message = await model.ChatMessage.create({ chatRoomId: chatRoomId, senderId: req.user.id, messageImage });
    // 사진을 전송합니다. 받은 데이터는 emit("imageMessage")를 통해 보내주세요.
    return res.send({ message });
  } catch (e) {
    return next(e);
  }
};
