const { create } = require("../../model/model.js")("record");
const uuid = require("../../utils/uuid.js");
module.exports = (
  lesson_id,
  stu_id,
  attendance_status,
  attendance_time,
  attendance_lat,
  attendance_lng
) => {
  return (async (
    lesson_id,
    stu_id,
    attendance_status,
    attendance_time,
    attendance_lat,
    attendance_lng
  ) => {
    const { affectedRows } = await create({
      attendance_id: uuid(),
      lesson_id,
      stu_id,
      attendance_status,
      attendance_time,
      attendance_lat,
      attendance_lng
    });
    return {
      success: true,
      message: affectedRows > 0 ? "考勤成功！" : "考勤失败！"
    };
  })(
    lesson_id,
    stu_id,
    attendance_status,
    attendance_time,
    attendance_lat,
    attendance_lng
  );
};
