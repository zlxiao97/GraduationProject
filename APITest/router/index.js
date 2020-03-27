const express = require("express");
const router = express.Router();
const tokens = require("../token/index");
const manage = require("./manage/index.js");
const upload = require("./upload/index.js");
const student = require("./student/index.js");

module.exports = function(key) {
  router.use(tokens);
  router.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send({
        success: false,
        message: "您无权访问本系统"
      });
    }
  });
  router.use("/student", student(key));
  router.use("/manage", manage());
  router.use("/upload", upload());
  return router;
};
