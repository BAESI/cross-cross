const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: "사진",
        },
        messageImage: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChatMessage",
        tableName: "chatMessages",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.ChatMessage.belongsTo(db.ChatRoom, { foreignKey: "chatRoomId", sourceKey: "id" });
    db.ChatMessage.belongsTo(db.User, { foreignKey: "senderId", sourceKey: "id" });
  }
};
