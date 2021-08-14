"use strict";

const Sequelize = require("sequelize");
const env = "development";
const config = require(__dirname + "/../config/config.js")[env];

// model import
const User = require("./User");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;

User.init(sequelize);

module.exports = db;
