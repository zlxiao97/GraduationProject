const faceset = require("./faceset.js");


module.exports = function(app,key){
    app.use('/faceset',faceset(key));
};