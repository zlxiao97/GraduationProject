var https = require('https');
var qs = require('querystring');
const hostname = 'aip.baidubce.com'
const ak = 'xm9GwV9tu5NXYXcnVa09PAKj';
const sk = 'YKkDfv9dgxNq13GR0drAjRdokSsGfuGn';


module.exports = function () {
    const authParam = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': ak,
        'client_secret': sk
    });
    return new Promise((resolve, reject) => {
        https.get(
            {
                hostname: hostname,
                path: '/oauth/2.0/token?' + authParam,
                agent: false
            },
            function (res) {
                var data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
                    data = JSON.parse(data);
                    resolve(data);
                });
            }
        ).on("error", (e) => {
            reject(e);
        });
    });
}