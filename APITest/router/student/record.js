const handleGetRecord = require("../../controller/student/handleGetRecord.js");
const handleCreateRecord = require("../../controller/student/handleCreateRecord.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "student") {
        const { stu_id, begin, end } = req.query;
        handleGetRecord(stu_id, begin, end)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    }
  });

  router.post("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "student") {
        const {
          lesson_id,
          stu_id,
          attendance_status,
          attendance_time,
          attendance_lat,
          attendance_lng
        } = req.body;
        handleCreateRecord(
          lesson_id,
          stu_id,
          attendance_status,
          attendance_time,
          attendance_lat,
          attendance_lng
        )
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    }
  });
  return router;
};
