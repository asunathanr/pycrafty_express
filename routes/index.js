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


const SUCCESS_MSG = "SUCCESS";
const FILE_WRITE_ERROR = "WRITE_ERROR";
const UNKNOWN_OS_ERROR = "UNKNOWN_OS";
// Catches copy_text and writes requested text to python file in mcpipy directory.
router.post('/copy_text', function (req, res) {
    let userOS = getOS();
    let file_path = getFilePath(userOS);
    if (userOS === UNKNOWN_OS) {
        console.log("Error: operating system could not be determined");
        res.send(UNKNOWN_OS_ERROR);
    }
    else {
        file_path += "gen_script.py";
        fs.writeFile(file_path, req.body.codeArea, function (err) {
            if (!err) {
                console.log("wrote file at " + file_path);
                res.send(SUCCESS_MSG);
            }
            else {
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

module.exports = router;
