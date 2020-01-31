const express = require("express");
const path = require("path");
const auth = require("./utils/auth.js");
const PORT = 3000;
var accessToken = '';
var sessionKey = '';

const app = express();

app.use(express.static(path.join(__dirname,"public")));

auth().then((data)=>{
    sessionKey = data["session_key"];
    accessToken = data["access_token"];
}).catch((err)=>{
    console.log('Error: '+err);
});

app.get('/key',(req,res)=>{
    res.send({
        accessToken,
        sessionKey
    });
});

app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`);
});