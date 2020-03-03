const { read, update } = require("../model/model.js")("account");
const uuid = require("../utils/uuid.js");

module.exports = (req, res) => {
  const { account, pwd } = req.body;
  if (account && pwd) {
    read(-1, 10, { account_id: account }).then(data => {
      if (data.length > 0) {
        const { account_pwd } = data[0];
        if (account_pwd === pwd) {
          const account_token = "" + uuid();
          update({ account_token }, { account_id: account }).then(r =>
            res.send({ code: 0, message: "登录成功！", token: account_token })
          );
        } else {
          res.send({ code: 1, message: "登录失败，请重新输入！" });
        }
      } else {
        res.send({ code: 1, message: "登录失败，请重新输入！" });
      }
    });
  } else {
    res.send({ code: 1, message: "登录失败，请重新输入！" });
  }
};
