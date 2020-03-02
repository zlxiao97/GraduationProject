const generateSelectSQL = require("../utils/generateSelectSQL.js");
const connection = require("./connect.js")();
const TABLE_NAME = "account";
module.exports = {
  read(current, pageSize, condition) {
    const SQL = generateSelectSQL(TABLE_NAME, current, pageSize, condition);
    return new Promise((res, rej) => {
      connection.query(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  },
  create() {},
  update() {},
  delete() {}
};
