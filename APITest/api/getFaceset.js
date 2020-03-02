var https = require("https");
var qs = require("querystring");
const { origin_host, baseURL } = require("../config/config.js");

module.exports = function(req, key) {
  const param = qs.stringify({
    access_token: key.accessToken
  });
  const options = {
    hostname: origin_host,
    path: `${baseURL}/faceset/face/getlist?` + param,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    user_id: req.body["user_id"],
    group_id: req.body["group_id"]
  });
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      var data = "";
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", e => {
      reject(e);
    });
    req.write(body);
    req.end();
  });
};
