const handleGetAccount = require("../../controller/manage/account/handleGetAccount.js");
const handlePostAccount = require("../../controller/manage/account/handlePostAccount");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", function(req, res) {
    if (req.user) {
      const { account, system } = req.user;
      if (system === "manage") {
        const { current, pageSize } = req.query;
        handleGetAccount(current, pageSize, account)
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
      const { account, system } = req.user;
      if (system === "manage") {
        const { account_id, account_pwd, account_name } = req.body;
        handlePostAccount(account_id, account_pwd, account_name, account)
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
