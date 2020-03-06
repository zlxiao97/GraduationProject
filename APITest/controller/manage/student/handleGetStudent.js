const { read } = require("../../../model/model.js")("student");

module.exports = (current, pageSize, stu_code = "") => {
  if (stu_code !== "") {
    return (async (current, pageSize, stu_code) => {
      const data = await read(current, pageSize, { stu_code });
      return {
        code: 0,
        data
      };
    })(current, pageSize, stu_code);
  } else {
    return (async (current, pageSize) => {
      const data = await read(current, pageSize);
      return {
        code: 0,
        data
      };
    })(current, pageSize);
  }
};
