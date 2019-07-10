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

// Catches copy_text and writes requested text to python file in mcpipy directory.
router.post('/copy_text', function (req, res) {
    let file_path = getFilePath();
    if (file_path !== UNKNOWN_OS) {
        file_path += "gen_script.py";
    }
    else {
        console.log("Error: operating system could not be determined");
    }
    fs.writeFile(file_path, req.body.codeArea, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("wrote file at " + file_path);
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
