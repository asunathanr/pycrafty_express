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

const UNKNOWN_OS = "";
const SUCCESS_MSG = "SUCCESS";
const FILE_WRITE_ERROR = "WRITE_ERROR";
const UNKNOWN_OS_ERROR = "UNKNOWN_OS";
// Catches copy_text and writes requested text to python file in mcpipy directory.
router.post('/copy_text', function (req, res) {
    let file_path = getFilePath();
    let responseMsg = SUCCESS_MSG;
    if (file_path !== UNKNOWN_OS) {
        file_path += "gen_script.py";
    }
    else {
        responseMsg = UNKNOWN_OS_ERROR;
        console.log("Error: operating system could not be determined");
        res.send(responseMsg);
    }
    fs.writeFile(file_path, req.body.codeArea, function (err) {
        if (err) {
            responseMsg = FILE_WRITE_ERROR;
            console.log(err);
            res.send(responseMsg);
        }
        else {
            responseMsg = SUCCESS_MSG;
            console.log("wrote file at " + file_path);
            res.send(responseMsg);
        }
    });

});


/**
 * getFilePath: Returns correct file path for .minecraft/mcpipy folder based on user's OS
 * Sources:
 * https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
 * https://minecraft.gamepedia.com/.minecraft
 */
const WINDOWS = "win32";
const MAC_OS = "darwin";
const LINUX = "linux";
function getFilePath() {
    let userOS = os.platform();
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
