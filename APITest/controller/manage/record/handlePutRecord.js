const { update } = require("../../../model/model.js")("record");

module.exports = (attendance_id, attendance_status) => {
  return (async (attendance_id, attendance_status) => {
    const { affectedRows } = await update(
      {
        attendance_status
      },
      {
        attendance_id
      }
    );
    return {
      success: true,
      message: affectedRows > 0 ? "审批成功！" : "审批失败！"
    };
  })(attendance_id, attendance_status);
};
