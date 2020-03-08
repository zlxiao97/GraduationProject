const { read, getTotal } = require("../../../model/model.js")("student");

module.exports = (current, pageSize, stu_code = "") => {
  if (stu_code !== "") {
    return (async (current, pageSize, stu_code) => {
      const data = await read(current, pageSize, { stu_code });
      const total = await getTotal({ stu_code });
      return {
        total,
        success: true,
        data
      };
    })(current, pageSize, stu_code);
  } else {
    return (async (current, pageSize) => {
      const data = await read(current, pageSize);
      const total = await getTotal();
      return {
        total,
        success: true,
        data
      };
    })(current, pageSize);
  }
};
