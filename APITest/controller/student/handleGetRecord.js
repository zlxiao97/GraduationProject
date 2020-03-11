const moment = require("moment");
const { read: readRecord } = require("../../model/model.js")("record");
const { read: readLesson } = require("../../model/model.js")("lesson");
const { read: readCourse } = require("../../model/model.js")("course");

const status = {
  "0": "出勤",
  "1": "缺勤"
};

module.exports = (stu_id, begin, end) => {
  return (async (stu_id, begin, end) => {
    if (moment(begin).isAfter(end)) {
      return {
        total: 0,
        success: true,
        data: []
      };
    }
    const records = await readRecord(-1, 10, { stu_id });
    const rcLessons = await Promise.all(
      records.map(async item => {
        const { lesson_id, attendance_status } = item;
        const lessons = await readLesson(-1, 10, { lesson_id });
        if (lessons && lessons.length > 0) {
          const { course_id, start_time, end_time } = lessons[0];
          const courses = await readCourse(-1, 10, { course_id });
          if (courses && courses.length > 0) {
            const { course_name } = courses[0];
            return {
              attendance_status,
              status: status[attendance_status],
              course_name,
              start_time,
              end_time
            };
          }
        }
        return {};
      })
    );
    const data = rcLessons.filter(item => {
      const { start_time, end_time } = item;
      let isInRange = false;
      if (moment(start_time).isAfter(begin) && moment(end_time).isBefore(end)) {
        isInRange = true;
      }
      return isInRange;
    });
    return {
      total: data.length,
      success: true,
      data
    };
  })(stu_id, +begin, +end);
};
