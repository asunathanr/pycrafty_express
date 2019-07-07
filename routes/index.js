// FILE: index.js
// AUTHORS: Richie Burch, Nathan Robertson
// PURPOSE: Detects various GET and POST requests and performs appropriate actions on them.

const fs = require('fs');
const os = require('os');
const express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/public/index.html');
});


router.post('/importAction', function (req, res) {
  res.send("Import was clicked");
});


router.post('/exportAction', function (req, res) {
  let file_path = "test.xml";
  fs.writeFile(file_path, req.body.xmlBlockData, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});


// Catches copy_text and writes requested text to python file in mcpipy directory.
router.post('/copy_text', function (req, res) {
  let file_path = os.userInfo().homedir + "\\AppData\\Roaming\\.minecraft\\mcpipy\\gen_script.py";
  fs.writeFile(file_path, req.body.codeArea, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("wrote file at " + file_path);
  });
  res.redirect("/");
});

module.exports = router;
