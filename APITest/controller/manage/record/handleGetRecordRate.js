const { read: readCourse } = require("../../../model/model.js")("course");
const { read: readLesson } = require("../../../model/model.js")("lesson");
const { read: readRecord } = require("../../../model/model.js")("record");

module.exports = course_name => {
  return (async course_name => {
    const courses = await readCourse(-1, 10, { course_name });
    const { course_id } = courses[0];
    const lessons = await readLesson(-1, 10, { course_id });
    const rates = await Promise.all(
      lessons.map(async item => {
        const { lesson_id, lesson_name } = item;
        const records = await readRecord(-1, 10, { lesson_id });
        const { length: atNum } = records.filter(
          r => +r.attendance_status === 0
        );
        const { length: abNum } = records.filter(
          r => +r.attendance_status === 1
        );
        return {
          lesson_id,
          lesson_name,
          atNum,
          abNum
        };
      })
    );
    return {
      success: true,
      data: rates
    };
  })(course_name);
};
