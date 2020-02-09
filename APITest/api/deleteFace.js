var https = require('https');
var qs = require('querystring');
const hostname = 'aip.baidubce.com';

module.exports = function (req,key) {
    const param = qs.stringify({
        'access_token': key.accessToken
    });
    const options = {
        hostname: hostname,
        path: '/rest/2.0/face/v3/faceset/face/delete?' + param,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        'user_id': req.body['user_id'],
        'group_id': req.body['group_id'],
        'face_token': req.body['face_token']
    });
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            var data = "";
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve(data);
            });
          });
          
          req.on('error', (e) => {
            reject(e);
          });
          req.write(body);
          req.end();
    });
}