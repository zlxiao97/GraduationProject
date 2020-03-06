const { read } = require("../../../model/model.js")("student");
const { school } = require("../../../config/config.js");

module.exports = (current, pageSize, stu_code = "") => {
  if (stu_code !== "") {
    return (async (current, pageSize, stu_id) => {
      const data = await read(current, pageSize, { stu_id });
      return {
        code: 0,
        data
      };
    })(current, pageSize, school + stu_code);
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
