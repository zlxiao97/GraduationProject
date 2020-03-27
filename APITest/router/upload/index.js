const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", function(req, res) {
    res.send({
      status: "done"
    });
  });
  return router;
};
