const { read, delete: Delete } = require("../../../model/model.js")("account");

module.exports = (account_id, account) => {
  return (async account_id => {
    const users = await read(-1, 10, { account_id: account });
    const { account_type } = users[0];
    if (account_type === "0") {
      const { affectedRows } = await Delete({ account_id });
      return {
        success: true,
        message: affectedRows > 0 ? "删除成功" : "删除失败"
      };
    } else {
      throw { success: false, message: "您无权删除账号" };
    }
  })(account_id);
};
