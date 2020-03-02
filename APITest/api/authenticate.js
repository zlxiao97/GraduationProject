var https = require("https");
var qs = require("querystring");
const { origin_host, ak, sk } = require("../config/config.js");

module.exports = function() {
  const param = qs.stringify({
    grant_type: "client_credentials",
    client_id: ak,
    client_secret: sk
  });
  return new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname: origin_host,
          path: "/oauth/2.0/token?" + param,
          agent: false
        },
        function(res) {
          var data = "";
          res.on("data", chunk => {
            data += chunk;
          });
          res.on("end", () => {
            data = JSON.parse(data);
            resolve(data);
          });
        }
      )
      .on("error", e => {
        reject(e);
      });
  });
};
