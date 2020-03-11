const { read } = require("../../model/model.js")("student");

module.exports = (account, system) => {
  return new Promise((res, rej) => {
    read(-1, 10, { stu_code: account }).then(data => {
      if (data.length > 0) {
        const {
          stu_id,
          stu_name,
          stu_face_isreg,
          remind_time,
          stu_code,
          stu_img,
          stu_phoneno,
          stu_school,
          stu_avatar
        } = data[0];
        res({
          success: true,
          data: {
            id: stu_id,
            account,
            name: stu_name,
            system,
            stu_face_isreg,
            remind_time,
            stu_code,
            stu_img,
            stu_phoneno,
            stu_school,
            stu_avatar
          }
        });
      } else {
        rej({ success: false, message: "您无权访问该页面" });
      }
    });
  });
};
