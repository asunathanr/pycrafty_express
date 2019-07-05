var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/copy_text', function (req, res) {
  const fs = require('fs');
  fs.writeFile("./public/test.txt", req.body.areaA, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("wrote file");
  });
  res.send("Howdy pardner");
});

module.exports = router;
