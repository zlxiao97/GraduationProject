const { delete: Delete } = require("../../../model/model.js")("course");

module.exports = course_id => {
  return (async course_id => {
    const { affectedRows } = await Delete({
      course_id
    });
    return {
      success: true,
      message: affectedRows > 0 ? "删除成功！" : "删除失败！"
    };
  })(course_id);
};
