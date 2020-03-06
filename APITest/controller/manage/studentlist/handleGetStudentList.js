const { read: readRelation } = require("../../../model/model.js")(
  "student2course"
);
const { read: readStudent } = require("../../../model/model.js")("student");

module.exports = (current, pageSize, course_id) => {
  return (async (current, pageSize, course_id) => {
    const relations = await readRelation(current, pageSize, { course_id });
    const data = await Promise.all(
      relations.map(async item => {
        const { stu_id } = item;
        const students = await readStudent(-1, 10, { stu_id });
        return students[0];
      })
    );
    return {
      code: 0,
      data
    };
  })(current, pageSize, course_id);
};
