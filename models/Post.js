const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        startDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        startPoint: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        endPoint: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        airline: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        luggageWeight: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
          // basic: 글만 작성됨
          // reserve: 예약완료된 상태
          // end: 수령완료
          // close: 예약이 안된상태에서 출발시간이 지난 상태
          type: Sequelize.ENUM("basic", "reserve", "end", "close"),
          allowNull: false,
          defaultValue: "basic",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "brokerId", targetKey: "id" });
    db.Post.hasMany(db.ChatRoom, { foreignKey: "postId", sourceKey: "id" });
  }
};
