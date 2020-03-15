const { read } = require("../../../model/model.js")("lesson");

module.exports = course_id => {
  return (async course_id => {
    const lessons = await read(-1, 10, { course_id });
    const data = lessons.map(item => {
      const { lesson_id, course_id, lesson_name } = item;
      return {
        lesson_id,
        course_id,
        lesson_name
      };
    });
    return {
      success: true,
      data
    };
  })(course_id);
};
