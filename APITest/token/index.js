const expressJwt = require("express-jwt");
const { secretKey } = require("./constant.js");

const jwtAuth = expressJwt({ secret: secretKey }).unless({
  path: ["/manage/login"]
});

module.exports = jwtAuth;
