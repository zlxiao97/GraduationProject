const generateSelectSQL = require("../utils/generateSelectSQL.js");
const generateInsertSQL = require("../utils/generateInsertSQL.js");
const generateUpdateSQL = require("../utils/generateUpdateSQL.js");
const generateDeleteSQL = require("../utils/generateDeleteSQL.js");
const connection = require("./connect.js")();

module.exports = TABLE_NAME => ({
  /**
   * @description: 查询
   * @param {number}current 当前页，传-1代表查询所有数据
   * @param {number}pageSize 页大小，current为-1时传入非空值
   * @param {Object}condition 查询条件
   * @return {Promise} 包含了查到的数组
   * @returnDemo :[{"account_id": "admin","account_pwd": "admin",...},...]
   */
  read(current, pageSize, condition) {
    const SQL = generateSelectSQL(TABLE_NAME, current, pageSize, condition);
    return new Promise((res, rej) => {
      connection.query(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  },

  create(obj) {
    const SQL = generateInsertSQL(TABLE_NAME, obj);
    return new Promise((res, rej) => {
      connection.query(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  },

  update(obj, condition) {
    const SQL = generateUpdateSQL(TABLE_NAME, obj, condition);
    return new Promise((res, rej) => {
      connection.query(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  },

  delete(condition) {
    const SQL = generateDeleteSQL(TABLE_NAME, condition);
    return new Promise((res, rej) => {
      connection.query(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  }
});
