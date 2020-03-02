var mysql = require("mysql");
const {
  host,
  user,
  password,
  database,
  port
} = require("../config/database.js");
const connection = mysql.createConnection({
  host,
  user,
  password,
  database,
  port
});
connection.connect();
module.exports = () => {
  return connection;
};
