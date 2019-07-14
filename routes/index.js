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

// FROM: https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };



// Writes requested code to python file in mcpipy directory.
// If the input field is empty a default file called "script.py" is used.
// Only Windows file paths are supported.
// https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
// Validator/Sanitizer documentation: https://express-validator.github.io/docs/index.html
// TODO: Ensure file name is sanitized before trying to save it
// TODO: Create unit tests for this post request with mocha and chai
const ILLEGAL_FILENAME_CHARS = /[:\\|?*]+/;
const MAX_FILE_LENGTH = 100;
const WINDOWS = "win32";
const ERROR_STATUS_CODE = 422;
const SUCCESS_STATUS_CODE = 200;
router.post(
    '/copy_text',
    [
        validator.check('fileName')
            // SANITIZERS
            .trim()
            .escape()
            .stripLow()
            // TODO: make regex recognize ..py and ...py and so on
            .customSanitizer((value, {}) => value.replace(/(\.[\w]*)$/, ""))
            .customSanitizer((value, {}) => {
                return String(value).length === 0 ? "script" : value;
            })

            // VALIDATORS
            .custom((_, {}) => os.platform() === WINDOWS)
            .withMessage("This page only supports Windows based operating systems.")
            .isLength({min: 1, max:MAX_FILE_LENGTH})
            .withMessage("File names must be 100 characters or less.")
            .custom((value, {}) => value.match(ILLEGAL_FILENAME_CHARS) === null)
            .withMessage("?, :, \\, |, and * cannot be used in file names.")
    ],
    asyncMiddleware(function (req, res, next) {
            let errors = validator.validationResult(req);
            let file_path = getFilePath(req.body.fileName);
            if (!errors.isEmpty()) {
                return res.status(ERROR_STATUS_CODE).json({errors: errors.array()});
            }
            fs.writeFile(file_path, req.body.codeArea, function (err) {
                if (!err) {
                    res.status(SUCCESS_STATUS_CODE).json({file_name: String(req.body.fileName) + ".py"});
                } else {
                    res.status(ERROR_STATUS_CODE).json({"errors": [{msg: "Could not write file"}]});
                }
            });

        })
);




/**
 * getFilePath: Returns correct file path for .minecraft/mcpipy folder
 * Sources:
 * https://minecraft.gamepedia.com/.minecraft
 */
function getFilePath(fileName) {
    return os.userInfo().homedir + "\\AppData\\Roaming\\.minecraft\\mcpipy\\" + fileName + ".py";
}


module.exports = router;
