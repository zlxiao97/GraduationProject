const handleGetStudent = require("../../controller/manage/student/handleGetStudent.js");
const handlePostStudent = require("../../controller/manage/student/handlePostStudent.js");
const handlePutStudentImg = require("../../controller/manage/student/handlePutStudentImg.js");
const handlePutStudent = require("../../controller/manage/student/handlePutStudent.js");
const handleDeleteStudent = require("../../controller/manage/student/handleDeleteStudent.js");
const express = require("express");
const multer = require("multer");
const {
  upload_directory,
  img_name,
  school
} = require("../../config/config.js");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, upload_directory),
  filename: (req, file, cb) => {
    const fileFormat = file.originalname.split(".");
    const ext = fileFormat[fileFormat.length - 1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
});
const upload = multer({ limits: { fieldSize: "10MB" }, storage });

module.exports = () => {
  router.get("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { current, pageSize, stu_code } = req.query;
        handleGetStudent(current, pageSize, stu_code)
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

  router.post("/", upload.single(img_name), function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const stu_img = req.file;
        const { stu_code, stu_pwd, stu_name } = req.body;
        handlePostStudent(stu_code, stu_pwd, stu_name, stu_img)
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

  router.put("/uploads", upload.single(img_name), function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const stu_img = req.file;
        const { stu_id } = req.body;
        handlePutStudentImg(stu_id, stu_img)
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

  router.put("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "manage") {
        const { stu_id, stu_code, stu_name, stu_pwd } = req.body;
        handlePutStudent(stu_id, stu_code, stu_name, stu_pwd)
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
        const { stu_id } = req.body;
        handleDeleteStudent(stu_id)
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
