const { delete: Delete } = require("../../../model/model.js")("student2course");

module.exports = s2c_id => {
  return (async s2c_id => {
    const { affectedRows } = await Delete({
      s2c_id
    });
    return {
      success: true,
      message: affectedRows > 0 ? "删除成功！" : "删除失败！"
    };
  })(s2c_id);
};
