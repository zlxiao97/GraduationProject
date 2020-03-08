const { update } = require("../../../model/model.js")("course");

module.exports = (course_id, course_name) => {
  return (async (course_id, course_name) => {
    const { affectedRows } = await update(
      {
        course_name
      },
      {
        course_id
      }
    );
    return {
      success: true,
      message: affectedRows > 0 ? "编辑成功！" : "编辑失败！"
    };
  })(course_id, course_name);
};
