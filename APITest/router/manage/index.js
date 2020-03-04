const express = require("express");
const router = express.Router();
const login = require("./login.js");
const account = require("./account.js");
const currentAccount = require("./currentAccount.js");

module.exports = function() {
  router.use("/login", login());
  router.use("/account", account());
  router.use("/currentAccount", currentAccount());
  return router;
};
