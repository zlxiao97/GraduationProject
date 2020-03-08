const { read } = require("../../model/model.js")("account");

module.exports = (account, system) => {
  return new Promise((res, rej) => {
    read(-1, 10, { account_id: account }).then(data => {
      if (data.length > 0) {
        const { account_type, account_name } = data[0];
        const permission = {
          canAddAccount: account_type === "0" ? true : false
        };
        res({
          success: true,
          data: {
            account,
            role: account_type === "0" ? "超级管理员" : "课程负责人",
            name: account_name,
            system,
            permission
          }
        });
      } else {
        rej({ success: false, message: "您无权访问该页面" });
      }
    });
  });
};
