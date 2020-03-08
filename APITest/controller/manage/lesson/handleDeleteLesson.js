const { delete: Delete } = require("../../../model/model.js")("lesson");

module.exports = lesson_id => {
  return (async lesson_id => {
    const { affectedRows } = await Delete({
      lesson_id
    });
    return {
      success: true,
      message: affectedRows > 0 ? "删除成功！" : "删除失败！"
    };
  })(lesson_id);
};
