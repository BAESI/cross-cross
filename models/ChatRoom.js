const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        lastChatDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        lastChatContent: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChatRoom",
        tableName: "chatRooms",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.ChatRoom.belongsTo(db.Post, { foreignKey: "postId", sourceKey: "id" });
    db.ChatRoom.belongsTo(db.User, { foreignKey: "setterId", sourceKey: "id" });
    db.ChatRoom.hasMany(db.ChatMessage, { foreignKey: "chatRoomId", sourceKey: "id" });
  }
};
