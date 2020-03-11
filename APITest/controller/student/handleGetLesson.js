const { read: readCourseIdByStuId } = require("../../model/model.js")(
  "student2course"
);
const { read: readLesson } = require("../../model/model.js")("lesson");

module.exports = stu_id => {
  return (async stu_id => {
    const courseIds = await readCourseIdByStuId(-1, 10, { stu_id });
    const lessons = await Promise.all(
      courseIds.map(async ({ course_id }) => {
        return await readLesson(-1, 10, { course_id });
      })
    );
    const data = lessons.flat();
    return {
      total: data.length,
      success: true,
      data
    };
  })(stu_id);
};
