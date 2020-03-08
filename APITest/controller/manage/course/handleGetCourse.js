const { read, getTotal } = require("../../../model/model.js")("course");

module.exports = (current, pageSize, account_id) => {
  return (async (current, pageSize, account_id) => {
    const data = await read(current, pageSize, { account_id });
    const total = await getTotal({ account_id });
    return {
      total,
      success: true,
      data
    };
  })(current, pageSize, account_id);
};
