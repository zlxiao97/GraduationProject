const { read } = require("../model/account.js");

module.exports = (req, res) => {
  const { current, pageSize, condition } = req.body;
  read(current, pageSize, condition).then(data => {
    res.send(data);
  });
};
