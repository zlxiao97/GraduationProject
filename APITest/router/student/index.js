const express = require("express");
const router = express.Router();
const faceset = require("./faceset.js");

module.exports = function(key) {
  router.use("/faceset", faceset(key));
  return router;
};
