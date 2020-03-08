const handleGetLesson = require("../../controller/manage/lesson/handleGetLesson.js");
const handlePostLesson = require("../../controller/manage/lesson/handlePostLesson.js");
const handlePutLesson = require("../../controller/manage/lesson/handlePutLesson.js");
const handleDeleteLesson = require("../../controller/manage/lesson/handleDeleteLesson.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { current, pageSize, course_id } = req.query;
        handleGetLesson(current, pageSize, course_id)
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
  router.post("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const {
          course_id,
          lesson_name,
          start_time,
          end_time,
          lat,
          lng,
          range_radius
        } = req.body;
        handlePostLesson(
          course_id,
          lesson_name,
          start_time,
          end_time,
          lat,
          lng,
          range_radius
        )
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
        const {
          lesson_id,
          lesson_name,
          start_time,
          end_time,
          lat,
          lng,
          range_radius
        } = req.body;
        handlePutLesson(
          lesson_id,
          lesson_name,
          start_time,
          end_time,
          lat,
          lng,
          range_radius
        )
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
  router.delete("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { lesson_id } = req.body;
        handleDeleteLesson(lesson_id)
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
