const handleGetCourse = require("../../controller/manage/course/handleGetCourse.js");
const handlePostCourse = require("../../controller/manage/course/handlePostCourse.js");
const handlePutCourse = require("../../controller/manage/course/handlePutCourse.js");
const handleDeleteCourse = require("../../controller/manage/course/handleDeleteCourse.js");
const handleGetLessonByCourse = require("../../controller/manage/course/handleGetLessonByCourse.js");

const uuid = require("../../utils/uuid.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { current, pageSize, account_id } = req.query;
        handleGetCourse(current, pageSize, account_id)
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
        const { account_id, course_name } = req.body;
        const course_id = `course${uuid()}`;
        handlePostCourse(course_id, account_id, course_name)
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
        const { course_id, course_name } = req.body;
        handlePutCourse(course_id, course_name)
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
        const { course_id } = req.body;
        handleDeleteCourse(course_id)
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

  router.get("/lesson", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { course_id } = req.query;
        handleGetLessonByCourse(course_id)
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
