const express = require("express");
const router = express.Router();
const login = require("./login.js");
const currentAccount = require("./currentAccount.js");

module.exports = function() {
  router.use("/login", login());
  router.use("/currentAccount", currentAccount());
  return router;
};
