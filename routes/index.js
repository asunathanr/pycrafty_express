var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/public/index.html');
});

// Catches copy_text and writes requested text to python file.
router.post('/copy_text', function (req, res) {
  const fs = require('fs');
  fs.writeFile("./public/test.py", req.body.codeArea, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("wrote file");
  });
  res.send("Howdy pardner");
});

module.exports = router;
