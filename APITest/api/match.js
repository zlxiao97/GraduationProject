var https = require("https");
var qs = require("querystring");
const { origin_host, baseURL } = require("../config/config.js");

module.exports = function(req, key) {
  const param = qs.stringify({
    access_token: key.accessToken
  });
  const options = {
    hostname: origin_host,
    path: `${baseURL}/match?` + param,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  const { img1, img2 } = req.body;
  const body = JSON.stringify([
    {
      image: img1.image,
      image_type: img1["image_type"],
      face_type: img1["face_type"]
      // quality_control: "NORMAL",
      // liveness_control: "NORMAL"
    },
    {
      image: img2.image,
      image_type: img2["image_type"],
      face_type: img2["face_type"]
      // quality_control: "NORMAL",
      // liveness_control: "NORMAL"
    }
  ]);
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      var data = "";
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        data = JSON.parse(data);
        const { error_code } = data;
        if (error_code == 0) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });

    req.on("error", e => {
      reject(e);
    });
    req.write(body);
    req.end();
  });
};
