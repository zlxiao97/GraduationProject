const { read: readCourse } = require("../../../model/model.js")("course");
const { read: readLesson } = require("../../../model/model.js")("lesson");
const { read: readRecord } = require("../../../model/model.js")("record");
const { read: readStudent } = require("../../../model/model.js")("student");

module.exports = (current, pageSize, course_name, lesson_name, stu_code) => {
  return (async (current, pageSize, course_name, lesson_name, stu_code) => {
    const courses = await readCourse(-1, 10, { course_name });
    if (courses && courses.length > 0) {
      const { course_id } = courses[0];
      var lessons = [];
      if (lesson_name !== "") {
        lessons = await readLesson(-1, 10, { course_id, lesson_name });
      } else {
        lessons = await readLesson(-1, 10, { course_id });
      }
      let records = await Promise.all(
        lessons.map(async item => {
          const { lesson_id, lesson_name, start_time, end_time } = item;
          let rcds = await readRecord(-1, 10, { lesson_id });
          rcds = await Promise.all(
            rcds.map(async i => {
              const { stu_id } = i;
              const stus = await readStudent(-1, 10, { stu_id });
              const { stu_code, stu_name } = stus[0];
              return { ...i, stu_code, stu_name };
            })
          );
          return rcds.map(i => ({ ...i, lesson_name, start_time, end_time }));
        })
      );
      records = records.flat();
      if (stu_code !== "") {
        records = records.filter(item => item.stu_code === stu_code);
      }
      const total = records.length;
      const data = records.slice((current - 1) * pageSize, current * pageSize);
      return {
        total,
        success: true,
        data
      };
    } else {
      return {
        total: 0,
        success: true,
        data: []
      };
    }
  })(current, pageSize, course_name, lesson_name, "" + stu_code);
};
