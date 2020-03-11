const { update } = require("../../model/model.js")("student");

module.exports = (stu_id, stu_pwd) => {
  return (async (stu_id, stu_pwd) => {
    const { affectedRows } = await update(
      {
        stu_pwd
      },
      {
        stu_id
      }
    );
    return {
      success: true,
      message: affectedRows > 0 ? "修改成功！" : "修改失败！"
    };
  })(stu_id, stu_pwd);
};
