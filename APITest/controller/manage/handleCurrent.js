const jwt = require("jsonwebtoken");
const { secretKey } = require("../../token/constant.js");
const { read } = require("../../model/model.js")("account");

module.exports = (account, pwd) => {
  return new Promise((res, rej) => {
    read(-1, 10, { account_id: account }).then(data => {
      if (data.length > 0) {
        const { account_pwd, account_type } = data[0];
        if (account_pwd === pwd) {
          const tokenObj = {
            accout,
            type: account_type,
            typeName: account_type ? "课程负责人" : "超级管理员",
            system: "manage"
          };
          const account_token =
            "Bearer " +
            jwt.sign(tokenObj, secretKey, {
              expiresIn: 60 * 60 * 24
            });
          res({ code: 0, message: "登录成功！", token: account_token });
        } else {
          rej({ code: 1, message: "登录失败，请检查用户名或密码！" });
        }
      } else {
        rej({ code: 1, message: "登录失败，该账户未注册！" });
      }
    });
  });
};
