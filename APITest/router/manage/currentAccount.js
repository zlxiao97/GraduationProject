const handleCurrent = require("../../controller/manage/handleCurrent.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", function(req, res) {
    if (req.user) {
      const { account, system } = req.user;
      if (system === "manage") {
        handleCurrent(account, system)
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
