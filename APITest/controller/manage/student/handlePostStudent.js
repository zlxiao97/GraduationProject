const { create } = require("../../../model/model.js")("student");
module.exports = (stu_id, stu_code, stu_pwd, stu_name, stu_img = "") => {
  if (stu_img !== "") {
    return (async (stu_id, stu_code, stu_pwd, stu_name, stu_img) => {
      const { affectedRows } = await create({
        stu_id,
        stu_code,
        stu_pwd,
        stu_name,
        stu_img
      });
      return {
        code: 0,
        message: affectedRows > 0 ? "创建成功！" : "创建失败！"
      };
    })(stu_id, stu_code, stu_pwd, stu_name, stu_img.filename);
  } else {
    return (async (stu_id, stu_code, stu_pwd, stu_name) => {
      const { affectedRows } = await create({
        stu_id,
        stu_code,
        stu_pwd,
        stu_name
      });
      return {
        code: 0,
        message: affectedRows > 0 ? "创建成功！" : "创建失败！"
      };
    })(stu_id, stu_code, stu_pwd, stu_name);
  }
};
