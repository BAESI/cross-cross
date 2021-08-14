const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: 1,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: true,
        },
        point: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        profileImage: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: "profile-default.png",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
