const { update } = require("../../model/model.js")("student");

module.exports = (stu_phoneno, stu_pwd) => {
  return (async (stu_phoneno, stu_pwd) => {
    const { affectedRows } = await update(
      {
        stu_pwd,
      },
      {
        stu_phoneno,
      }
    );
    return {
      success: true,
      message: affectedRows > 0 ? "修改成功！" : "修改失败！",
    };
  })(stu_phoneno, stu_pwd);
};
