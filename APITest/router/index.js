const faceset = require("./faceset.js");
const login = require("./login.js");

module.exports = function(app, key) {
  app.use("/faceset", faceset(key));
  app.use("/login", login());
};
