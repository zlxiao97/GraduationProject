const { update } = require("../../../model/model.js")("student");
module.exports = (stu_id, stu_code, stu_name, stu_pwd) => {
  return (async (stu_id, stu_code, stu_name, stu_pwd) => {
    const { affectedRows } = await update(
      {
        stu_code,
        stu_name,
        stu_pwd
      },
      {
        stu_id
      }
    );
    return {
      success: true,
      message: affectedRows > 0 ? "编辑成功！" : "编辑失败！"
    };
  })(stu_id, stu_code, stu_name, stu_pwd);
};
