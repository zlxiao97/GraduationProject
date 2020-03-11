const handleUpdateSetting = require("../../controller/student/handleUpdateSetting.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.put("/", function(req, res) {
    if (req.user) {
      const { system } = req.user;
      if (system === "student") {
        const { stu_id, remind_time } = req.body;
        handleUpdateSetting(stu_id, remind_time)
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
