const jwt = require("jsonwebtoken");
const { secretKey } = require("../../token/constant.js");
const { read } = require("../../model/model.js")("account");
const { token_expire_time } = require("../../config/config.js");

module.exports = (account, pwd) => {
  return new Promise((res, rej) => {
    read(-1, 10, { account_id: account }).then(data => {
      if (data.length > 0) {
        const { account_pwd, account_type } = data[0];
        if (account_pwd === pwd) {
          const tokenObj = {
            account,
            system: "manage"
          };
          const account_token =
            "Bearer " +
            jwt.sign(tokenObj, secretKey, {
              expiresIn: token_expire_time
            });
          res({
            success: true,
            message: "登录成功！",
            token: account_token,
            role: account_type
          });
        } else {
          rej({ success: false, message: "登录失败，请检查用户名或密码！" });
        }
      } else {
        rej({ success: false, message: "登录失败，该账户未注册！" });
      }
    });
  });
};
