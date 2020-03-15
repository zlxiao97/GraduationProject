const { read } = require("../../../model/model.js")("course");

module.exports = account => {
  return (async account => {
    const courses = await read(-1, 10, { account_id: account });
    const data = courses.map(item => {
      const { course_name, course_id } = item;
      return {
        course_id,
        course_name
      };
    });
    return {
      success: true,
      data
    };
  })(account);
};
