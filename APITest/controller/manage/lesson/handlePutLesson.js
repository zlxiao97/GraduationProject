const { update } = require("../../../model/model.js")("lesson");

module.exports = (
  lesson_id,
  lesson_name,
  start_time,
  end_time,
  lat,
  lng,
  range_radius
) => {
  return (async (
    lesson_id,
    lesson_name,
    start_time,
    end_time,
    lat,
    lng,
    range_radius
  ) => {
    const { affectedRows } = await update(
      {
        lesson_name,
        start_time,
        end_time,
        lat,
        lng,
        range_radius
      },
      {
        lesson_id
      }
    );
    return {
      code: 0,
      message: affectedRows > 0 ? "编辑成功！" : "编辑失败！"
    };
  })(lesson_id, lesson_name, start_time, end_time, lat, lng, range_radius);
};
