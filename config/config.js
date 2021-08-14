const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  // localhost's mysql
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    timezone: "+09:00",
    dialect: "mysql",
  },
};
