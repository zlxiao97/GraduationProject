const { read, getTotal } = require("../../../model/model.js")("lesson");

module.exports = (current, pageSize, course_id) => {
  return (async (current, pageSize, course_id) => {
    const data = await read(current, pageSize, { course_id });
    const totle = await getTotal({ course_id });
    return {
      totle,
      success: true,
      data
    };
  })(current, pageSize, course_id);
};
