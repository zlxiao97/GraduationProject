const { update } = require("../../model/model.js")("student");

module.exports = (stu_id, remind_time) => {
  return (async (stu_id, remind_time) => {
    const { affectedRows } = await update(
      {
        remind_time
      },
      {
        stu_id
      }
    );
    return {
      success: true,
      message: affectedRows > 0 ? "设置成功！" : "设置失败！"
    };
  })(stu_id, remind_time);
};
