var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/public/index.html');
});

// Catches copy_text and writes requested text to python file in mcpipy directory.
router.post('/copy_text', function (req, res) {
  const fs = require('fs');
  const os = require('os');
  let file_path = os.userInfo().homedir + "\\AppData\\Roaming\\.minecraft\\mcpipy\\gen_script.py";
  fs.writeFile(file_path, req.body.codeArea, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("wrote file");
  });
  // TODO: Figure out how to send user back to Blockly page
  res.send("Howdy pardner");
});

module.exports = router;
