const { read } = require("../../../model/model.js")("lesson");

module.exports = (current, pageSize, course_id) => {
  return (async (current, pageSize, course_id) => {
    const data = await read(current, pageSize, { course_id });
    return {
      code: 0,
      data
    };
  })(current, pageSize, course_id);
};
