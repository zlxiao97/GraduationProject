const { create } = require("../../../model/model.js")("course");

module.exports = (course_id, account_id, course_name) => {
  return (async (course_id, account_id, course_name) => {
    const { affectedRows } = await create({
      course_id,
      account_id,
      course_name
    });
    return {
      success: true,
      message: affectedRows > 0 ? "创建成功！" : "创建失败！"
    };
  })(course_id, account_id, course_name);
};
