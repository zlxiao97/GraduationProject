const auth = require("../api/authenticate.js");
const KEY = {};


auth().then((data)=>{
    KEY.sessionKey = data["session_key"];
    KEY.accessToken = data["access_token"];
    console.log('init: ' + JSON.stringify(KEY));
}).catch((err)=>{
    console.log('Error: '+err);
});

module.exports = KEY;
