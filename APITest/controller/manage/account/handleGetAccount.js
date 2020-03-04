const { read } = require("../../../model/model.js")("account");

module.exports = (current, pageSize, account) => {
  return (async (current, pageSize) => {
    const users = await read(-1, 10, { account_id: account });
    const { account_type } = users[0];
    if (account_type === "0") {
      const data = await read(current, pageSize);
      return {
        code: 0,
        data
      };
    } else {
      return { code: 0, data: [] };
    }
  })(current, pageSize);
};
