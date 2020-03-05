const { read } = require("../../../model/model.js")("course");

module.exports = (current, pageSize, account_id) => {
  return (async (current, pageSize, account_id) => {
    const data = await read(current, pageSize, { account_id });
    return {
      code: 0,
      data
    };
  })(current, pageSize, account_id);
};
