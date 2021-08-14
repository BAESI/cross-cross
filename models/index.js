"use strict";

const Sequelize = require("sequelize");
const env = "development";
const config = require(__dirname + "/../config/config.js")[env];

// model import
const User = require("./User");
const Post = require("./Post");
const ChatRoom = require("./ChatRoom");
const ChatMessage = require("./ChatMessage");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.ChatRoom = ChatRoom;
db.ChatMessage = ChatMessage;

User.init(sequelize);
Post.init(sequelize);
ChatRoom.init(sequelize);
ChatMessage.init(sequelize);

User.associate(db);
Post.associate(db);
ChatRoom.associate(db);
ChatMessage.associate(db);

module.exports = db;
