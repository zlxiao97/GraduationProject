/*
 * @Author: your name
 * @Date: 2020-02-01 13:23:09
 * @LastEditTime: 2020-03-04 14:14:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \SinotransUIOptimizationd:\project\vscode\GraduationProject\APITest\app.js
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = 3000;
const KEY = require("./utils/init.js");
const router = require("./router/index.js");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  else next();
});

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb"
  })
);

app.use("/", router(KEY));

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
