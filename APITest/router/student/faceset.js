const express = require("express");
const router = express.Router();
const add = require("../../api/addFaceset.js");
const get = require("../../api/getFaceset.js");
const del = require("../../api/deleteFace.js");
const search = require("../../api/searchByFace.js");
const match = require("../../api/match.js");

module.exports = key => {
  router.post("/add", function(req, res) {
    if (req.user) {
      if (req.user.system === "student") {
        add(req, key)
          .then(data => {
            res.json(JSON.parse(data));
          })
          .catch(err => {
            res.send(JSON.stringify(err));
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    } else {
      res.send({ success: false, message: "请求失败" });
    }
  });
  router.post("/get", function(req, res) {
    if (req.user) {
      if (req.user.system === "student") {
        get(req, key)
          .then(data => {
            res.json(JSON.parse(data));
          })
          .catch(err => {
            res.send(JSON.stringify(err));
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    } else {
      res.send({ success: false, message: "请求失败" });
    }
  });
  router.post("/delete", function(req, res) {
    if (req.user) {
      if (req.user.system === "student") {
        del(req, key)
          .then(data => {
            res.json(JSON.parse(data));
          })
          .catch(err => {
            res.send(JSON.stringify(err));
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    } else {
      res.send({ success: false, message: "请求失败" });
    }
  });
  router.post("/search", function(req, res) {
    if (req.user) {
      if (req.user.system === "student") {
        search(req, key)
          .then(data => {
            res.json(JSON.parse(data));
          })
          .catch(err => {
            res.send(JSON.stringify(err));
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    } else {
      res.send({ success: false, message: "请求失败" });
    }
  });
  router.post("/match", function(req, res) {
    if (req.user) {
      if (req.user.system === "student") {
        match(req, key)
          .then(data => {
            res.send({ success: true, data });
          })
          .catch(err => {
            res.send({ success: false, data: err });
          });
      } else {
        res.send({ success: false, message: "您无权访问本系统" });
      }
    } else {
      res.send({ success: false, message: "请求失败" });
    }
  });
  return router;
};
