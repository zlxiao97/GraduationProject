const handleGetStudent = require("../../controller/manage/student/handleGetStudent.js");
const handlePostStudent = require("../../controller/manage/student/handlePostStudent.js");
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
        handlePostStudent(
          `${school}${stu_code}`,
          stu_code,
          stu_pwd,
          stu_name,
          stu_img
        )
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
