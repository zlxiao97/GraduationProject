const handleGetStudentList = require("../../controller/manage/studentlist/handleGetStudentList.js");
const handlePostStudentList = require("../../controller/manage/studentlist/handlePostStudentList.js");
const handleDeleteStudentList = require("../../controller/manage/studentlist/handleDeleteStudentList.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { current, pageSize, course_id } = req.query;
        handleGetStudentList(current, pageSize, course_id)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send({ code: 1, message: err.message });
          });
      } else {
        res.send({ code: 1, message: "您无权访问本系统" });
      }
    }
  });
  router.post("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { course_id, stu_id } = req.body;
        handlePostStudentList(course_id, stu_id)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send({ code: 1, message: err.message });
          });
      } else {
        res.send({ code: 1, message: "您无权访问本系统" });
      }
    }
  });
  router.delete("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { s2c_id } = req.body;
        handleDeleteStudentList(s2c_id)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send({ code: 1, message: err.message });
          });
      } else {
        res.send({ code: 1, message: "您无权访问本系统" });
      }
    }
  });
  return router;
};
