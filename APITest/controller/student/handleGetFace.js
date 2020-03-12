const fs = require("fs");
const path = require("path");
const { upload_directory } = require("../../config/config.js");
const { read } = require("../../model/model.js")("student");

module.exports = stu_id => {
  return (async stu_id => {
    const students = await read(-1, 10, { stu_id });
    if (students && students.length > 0) {
      const { stu_img: imgName } = students[0];
      const filePath = path.resolve(upload_directory, imgName);
      const bitmap = fs.readFileSync(filePath);
      const stu_base64 = Buffer.from(bitmap, "binary").toString("base64");
      return {
        success: true,
        data: { stu_base64 }
      };
    }
    return {
      success: true,
      data: {}
    };
  })(stu_id);
};
