const generateSelectSQL = require("../utils/generateSelectSQL.js");
const generateInsertSQL = require("../utils/generateInsertSQL.js");
const generateUpdateSQL = require("../utils/generateUpdateSQL.js");
const generateDeleteSQL = require("../utils/generateDeleteSQL.js");
const generateCountSQL = require("../utils/generateCountSQL.js");
const connect = require("./connect.js");

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
    console.log(SQL);
    return new Promise((res, rej) => {
      connect(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  },

  create(obj) {
    const SQL = generateInsertSQL(TABLE_NAME, obj);
    console.log(SQL);
    return new Promise((res, rej) => {
      connect(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  },

  update(obj, condition) {
    const SQL = generateUpdateSQL(TABLE_NAME, obj, condition);
    console.log(SQL);
    return new Promise((res, rej) => {
      connect(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  },

  delete(condition) {
    const SQL = generateDeleteSQL(TABLE_NAME, condition);
    console.log(SQL);
    return new Promise((res, rej) => {
      connect(SQL, function(error, results) {
        if (error) rej(error);
        res(results);
      });
    });
  },

  getTotal(condition) {
    const SQL = generateCountSQL(TABLE_NAME, condition);
    console.log(SQL);
    return new Promise((res, rej) => {
      connect(SQL, function(error, results) {
        if (error) rej(error);
        const totals = results;
        if (totals && totals.length > 0) {
          const total = totals[0]["COUNT(*)"];
          res(total);
        } else {
          rej({ message: "获取总条数失败" });
        }
      });
    });
  }
});
