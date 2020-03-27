var mysql = require("mysql");
const {
  host,
  user,
  password,
  database,
  port
} = require("../config/database.js");

module.exports = (SQL, cb) => {
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database,
    port
  });
  connection.connect();
  if (SQL) connection.query(SQL, cb);
  connection.end;
};
