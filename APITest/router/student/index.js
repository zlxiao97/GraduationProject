const express = require("express");
const router = express.Router();
const faceset = require("./faceset.js");
const login = require("./login.js");
const currentAccount = require("./currentAccount.js");
const updatePwd = require("./updatePwd.js");
const updateStuInfo = require("./updateStuInfo.js");
const lesson = require("./lesson.js");
const record = require("./record.js");
const setting = require("./setting.js");

module.exports = function(key) {
  router.use("/faceset", faceset(key));
  router.use("/login", login());
  router.use("/currentAccount", currentAccount());
  router.use("/updatePwd", updatePwd());
  router.use("/updateStuInfo", updateStuInfo());
  router.use("/lesson", lesson());
  router.use("/record", record());
  router.use("/setting", setting());
  return router;
};
