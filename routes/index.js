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


const SUCCESS_MSG = "SUCCESS";
const FILE_WRITE_ERROR = "WRITE_ERROR";
const UNKNOWN_OS_ERROR = "UNKNOWN_OS";
const BLACKLIST = ":\\|?*";
const MAX_FILE_LENGTH = 100;
// Writes requested code to python file in mcpipy directory.
// If the input field is empty a default file called "script.py" is used.
// The built in validator also removes invalid characters from file name:
// https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
// List of sanitizers: https://github.com/validatorjs/validator.js#sanitizers
// TODO: Ensure file name is sanitized before trying to save it
// TODO: Reject saving file with characters in blacklist
router.post(
    '/copy_text',
    [
        validator.check('fileName')
            .trim()
            .escape()
            .stripLow()
            .contains(BLACKLIST)
            .isLength({max:MAX_FILE_LENGTH})
    ],
    function (req, res) {
        let userOS = getOS();
        let file_path = getFilePath(userOS);
        let rawFileName = req.body.fileName;
        let fileName = parseFileName(rawFileName) + ".py";
        if (userOS === UNKNOWN_OS) {
            console.log("Error: operating system could not be determined");
            res.send(UNKNOWN_OS_ERROR);
        } else {
            file_path += fileName;
            fs.writeFile(file_path, req.body.codeArea, function (err) {
                if (!err) {
                    console.log("wrote file at " + file_path);
                    res.send(SUCCESS_MSG);
                } else {
                    console.log(err);
                    res.send(FILE_WRITE_ERROR);
                }
            });
    }
});


/**
 * Function: getOS
 * Returns either name of a supported OS or UNKNOWN_OS if OS is not supported
 * @type {string}
 */
const WINDOWS = "win32";
const MAC_OS = "darwin";
const LINUX = "linux";
const UNKNOWN_OS = "UNKNOWN";
function getOS() {
    let userOS = os.platform();
    let isSupportedOS = [WINDOWS, MAC_OS, LINUX].find(function (element, index, array) {
        return element === userOS;
    }) !== undefined;
    if (isSupportedOS) {
        return userOS;
    }
    else {
        return UNKNOWN_OS;
    }
}


/**
 * getFilePath: Returns correct file path for .minecraft/mcpipy folder based on user's OS
 * Sources:
 * https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
 * https://minecraft.gamepedia.com/.minecraft
 */

function getFilePath(userOS) {
    let file_path = "";
    if (userOS === WINDOWS) {
        file_path = os.userInfo().homedir + "\\AppData\\Roaming\\.minecraft\\mcpipy\\";
    }
    else if (userOS === MAC_OS) {
        file_path = "~/Library/\"Application Support\"/minecraft/mcpipy/";
    }
    else if (userOS === LINUX) {
        file_path = "~/.minecraft/mcpipy/";
    }
    else {
        file_path = UNKNOWN_OS;
    }
    return file_path;
}


/**
 * Parses file name given by user and determines if it can be saved in its current state.
 * If not it suggests a file name or suggests termination of process
 * @param rawFileName
 * @returns string
 */
function parseFileName(rawFileName) {
    let newFileName = rawFileName.replace(/(\.[\w]*)$/, "");
    if (rawFileName === "") {
        newFileName = "script";
    }
    return newFileName;
}

module.exports = router;
