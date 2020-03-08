const handleGetRecord = require("../../controller/manage/record/handleGetRecord.js");
const handlePutRecord = require("../../controller/manage/record/handlePutRecord.js");
const handleGetRecordRate = require("../../controller/manage/record/handleGetRecordRate.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        let {
          current,
          pageSize,
          course_name,
          lesson_name,
          stu_code
        } = req.query;
        lesson_name = lesson_name || "";
        stu_code = stu_code || "";
        handleGetRecord(current, pageSize, course_name, lesson_name, stu_code)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send({ success: false, message: err.message });
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    }
  });
  router.get("/rate", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        let { course_name } = req.query;
        handleGetRecordRate(course_name)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send({ success: false, message: err.message });
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    }
  });
  router.put("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        let { attendance_id, attendance_status } = req.body;
        handlePutRecord(attendance_id, attendance_status)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send({ success: false, message: err.message });
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    }
  });
  return router;
};
