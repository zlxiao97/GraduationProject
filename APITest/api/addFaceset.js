const https = require("https");
const qs = require("querystring");
const { origin_host, baseURL } = require("../config/config.js");

module.exports = function(req, key) {
  const param = qs.stringify({
    access_token: key.accessToken
  });
  const options = {
    hostname: origin_host,
    path: `${baseURL}/faceset/user/add?` + param,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    image: req.body.image,
    image_type: req.body["image_type"],
    group_id: req.body["group_id"],
    user_id: req.body["user_id"],
    user_info: req.body["user_info"]
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
