// FILE: index.js
// AUTHORS: Richie Burch, Nathan Robertson
// PURPOSE: Detects various GET and POST requests and performs appropriate actions on them.


const fs = require('fs');
const os = require('os');
const express = require('express');
const validator = require('express-validator');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('/public/index.html');
});


const ILLEGAL_FILENAME_CHARS = /[:\\|?*]+/;
const MAX_FILE_LENGTH = 100;
const WINDOWS = "win32";
// Writes requested code to python file in mcpipy directory.
// If the input field is empty a default file called "script.py" is used.
// https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
// List of sanitizers: https://github.com/validatorjs/validator.js#sanitizers
// TODO: Ensure file name is sanitized before trying to save it
router.post(
    '/copy_text',
    [
        validator.check('fileName')
            // SANITIZERS
            .trim()
            .escape()
            .stripLow()
            // TODO: make regex recognize ..py and ...py and so on
            .customSanitizer((value, {req}) => value.replace(/(\.[\w]*)$/, ""))
            .customSanitizer((value, {req, location, path}) => {
                return String(value).length === 0 ? "script" : value;
            })
            // VALIDATORS
            .custom((value, {req}) => os.platform() === WINDOWS)
            .withMessage("This page only supports Windows based operating systems.")
            .isLength({min: 1, max:MAX_FILE_LENGTH})
            .custom((value, {req}) => value.match(ILLEGAL_FILENAME_CHARS) === null)
            .withMessage("?, :, \\, |, ?, and * cannot be used in file names.")
    ],
    function (req, res) {
        let errors = validator.validationResult(req);
        let file_path = getFilePath(req.body.fileName);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        fs.writeFile(file_path, req.body.codeArea, function (err) {
            if (!err) {
                console.log("wrote file at " + file_path);
                res.status(200).json({file_name: req.body.fileName});
            } else {
                console.log(err);
                res.status(422).json({"errors": [{msg: "Could not write file"}]});
            }
        });

});


/**
 * getFilePath: Returns correct file path for .minecraft/mcpipy folder
 * Sources:
 * https://minecraft.gamepedia.com/.minecraft
 */

function getFilePath(fileName) {
    return os.userInfo().homedir + "\\AppData\\Roaming\\.minecraft\\mcpipy\\" + fileName + ".py";
}


module.exports = router;
