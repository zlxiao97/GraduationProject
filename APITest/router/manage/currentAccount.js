const handleCurrent = require("../../controller/manage/handleCurrent.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", function(req, res) {
    if (req.body) {
      const { account, pwd } = req.body;
      if (account && pwd) {
        handleCurrent(account, pwd)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        res.send({ code: 1, message: "登录失败，请输入合法的用户名和密码！" });
      }
    }
  });
  return router;
};
