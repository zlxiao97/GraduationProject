const { update } = require("../../model/model.js")("student");

module.exports = (stu_id, stu_name, stu_school, stu_phoneno) => {
  return (async (stu_id, stu_name, stu_school, stu_phoneno) => {
    const { affectedRows } = await update(
      {
        stu_phoneno,
        stu_name,
        stu_school
      },
      {
        stu_id
      }
    );
    return {
      success: true,
      message: affectedRows > 0 ? "修改成功！" : "修改失败！"
    };
  })(stu_id, stu_name, stu_school, stu_phoneno);
};
