const { create } = require("../../../model/model.js")("lesson");
const uuid = require("../../../utils/uuid.js");

module.exports = (
  course_id,
  lesson_name,
  start_time,
  end_time,
  lat,
  lng,
  range_radius
) => {
  return (async (
    course_id,
    lesson_name,
    start_time,
    end_time,
    lat,
    lng,
    range_radius
  ) => {
    const lesson_id = `lesson${uuid()}`;
    const { affectedRows } = await create({
      lesson_id,
      course_id,
      lesson_name,
      start_time,
      end_time,
      lat,
      lng,
      range_radius
    });
    return {
      code: 0,
      message: affectedRows > 0 ? "创建成功！" : "创建失败！"
    };
  })(course_id, lesson_name, start_time, end_time, lat, lng, range_radius);
};
