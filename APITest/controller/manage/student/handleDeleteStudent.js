const { delete: Delete } = require("../../../model/model.js")("student");

module.exports = stu_id => {
  return (async stu_id => {
    const { affectedRows } = await Delete({
      stu_id
    });
    return {
      code: 0,
      message: affectedRows > 0 ? "删除成功！" : "删除失败！"
    };
  })(stu_id);
};
