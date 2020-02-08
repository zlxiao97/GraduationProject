const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const PORT = 3000;
const KEY = require("./utils/init.js");
const router = require("./router/index.js");

const app = express();
app.use(bodyParser.urlencoded({
    extended:true,
    limit: "10mb"
}));

app.use(express.static(path.join(__dirname,"public")));
router(app,KEY);


app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`);
});