const { read, create } = require("../../../model/model.js")("account");

module.exports = (account_id, account_pwd, account_name, account) => {
  return (async (account_id, account_pwd, account_name) => {
    const users = await read(-1, 10, { account_id: account });
    const { account_type } = users[0];
    if (account_type === "0") {
      const { affectedRows } = await create({
        account_id,
        account_pwd,
        account_name,
        account_type: "1"
      });
      return {
        success: true,
        message: affectedRows > 0 ? "创建成功！" : "创建失败！"
      };
    } else {
      throw { success: false, message: "您无权创建账号！" };
    }
  })(account_id, account_pwd, account_name);
};
