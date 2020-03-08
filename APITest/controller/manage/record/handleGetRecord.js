const { read: readCourse } = require("../../../model/model.js")("course");
const { read: readLesson } = require("../../../model/model.js")("lesson");
const { read: readRecord } = require("../../../model/model.js")("record");
const { read: readStudent } = require("../../../model/model.js")("student");

module.exports = (current, pageSize, course_name, lesson_name, stu_code) => {
  if (lesson_name !== "") {
    return (async (current, pageSize, lesson_name, stu_code) => {
      const lessons = await readLesson(-1, 10, { lesson_name });
      const { lesson_id, start_time, end_time } = lessons[0];
      let records = await readRecord(-1, 10, { lesson_id });
      records = await Promise.all(
        records.map(async i => {
          const { stu_id } = i;
          const stus = await readStudent(-1, 10, { stu_id });
          const { stu_code, stu_name } = stus[0];
          return {
            ...i,
            stu_code,
            stu_name,
            start_time,
            end_time,
            lesson_name
          };
        })
      );
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
    })(current, pageSize, lesson_name, "" + stu_code);
  } else {
    return (async (current, pageSize, course_name, stu_code) => {
      const courses = await readCourse(-1, 10, { course_name });
      const { course_id } = courses[0];
      const lessons = await readLesson(-1, 10, { course_id });
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
    })(current, pageSize, course_name, "" + stu_code);
  }
};
