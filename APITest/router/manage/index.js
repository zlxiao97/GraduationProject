const express = require("express");
const router = express.Router();
const login = require("./login.js");
const account = require("./account.js");
const course = require("./course.js");
const lesson = require("./lesson.js");
const currentAccount = require("./currentAccount.js");

module.exports = function() {
  router.use("/login", login());
  router.use("/currentAccount", currentAccount());
  router.use("/account", account());
  router.use("/course", course());
  router.use("/lesson", lesson());
  return router;
};
