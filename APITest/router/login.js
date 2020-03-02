const express = require("express");
const bodyParser = require("body-parser");
const handleLogin = require("../controller/handleLogin.js");
const router = express.Router();

module.exports = () => {
  router.post("/", bodyParser.json(), function(req, res) {
    if (req.body) {
      handleLogin(req, res);
    }
  });
  return router;
};
