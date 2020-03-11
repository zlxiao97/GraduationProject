const handleLogin = require("../../controller/student/handleLogin.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", function(req, res) {
    if (req.body) {
      const { account, pwd } = req.body;
      if (account && pwd) {
        handleLogin(account, pwd)
          .then(respones => {
            res.send(respones);
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        res.send({
          success: false,
          message: "登录失败，请输入合法的用户名和密码！"
        });
      }
    }
  });
  return router;
};
