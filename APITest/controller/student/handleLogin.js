const jwt = require("jsonwebtoken");
const { secretKey } = require("../../token/constant.js");
const { read } = require("../../model/model.js")("student");
const { token_expire_time } = require("../../config/config.js");

module.exports = (account, pwd) => {
  return new Promise((res, rej) => {
    read(-1, 10, { stu_code: account }).then(data => {
      if (data.length > 0) {
        const { stu_pwd } = data[0];
        if (stu_pwd === pwd) {
          const tokenObj = {
            account,
            system: "student"
          };
          const account_token =
            "Bearer " +
            jwt.sign(tokenObj, secretKey, {
              expiresIn: token_expire_time
            });
          res({ success: true, message: "登录成功！", token: account_token });
        } else {
          rej({ success: false, message: "登录失败，请检查用户名或密码！" });
        }
      } else {
        rej({
          success: false,
          message: "登录失败，该账号未被创建，请联系学校管理员！"
        });
      }
    });
  });
};
