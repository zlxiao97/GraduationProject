const handleGetAccount = require("../../controller/manage/account/handleGetAccount.js");
const handlePostAccount = require("../../controller/manage/account/handlePostAccount");
const handleDeleteAccount = require("../../controller/manage/account/handleDeleteAccount");
const handlePutAccount = require("../../controller/manage/account/handlePutAccount");
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
            res.send({ success: false, message: err.message });
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
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
            res.send({ success: false, message: err.message });
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    }
  });
  router.put("/", function(req, res) {
    if (req.user) {
      const { account, system } = req.user;
      if (system === "manage") {
        const { account_id, account_pwd, account_name } = req.body;
        handlePutAccount(account_id, account_pwd, account_name, account)
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
      const { account, system } = req.user;
      if (system === "manage") {
        const { account_id } = req.body;
        handleDeleteAccount(account_id, account)
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
