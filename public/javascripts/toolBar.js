// FILE: toolBar.js
// AUTHORS: Justin Erickson, Richie Burch, Matt Hardin, Nathan Robertson
// PURPOSE: Controls behavior of the toolbar. Most functions in this file are triggered upon an event happening.


// https://groups.google.com/forum/#!topic/blockly/NDlC-l6DLEM
// TODO: Clean up and finalize createSnapshot and restoreSnapshot
function createSnapshot() {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    localStorage.setItem("blockly.xml", xmlText);
    displaySuccessNotification(".menu","Snapshot created");
}

/**
 * restoreSnapshot: Restores a saved workspace in browser.
 */
function restoreSnapshot() {
    var xmlText = localStorage.getItem("blockly.xml");
    if (xmlText) {
        Blockly.mainWorkspace.clear();
        xmlDom = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
    displaySuccessNotification(".menu", "Snapshot restored");
}


/**
 * loadBlocks: Reads an XML file and loads it into workspace.
 */
function loadBlocks() {
    let selectedFile = document.getElementById('file-input').files[0];
    let fileReader = new FileReader();
    if (selectedFile.type === "text/xml") {
        fileReader.readAsText(selectedFile);
        fileReader.onload = function() {
            let data = fileReader.result;
            Blockly.mainWorkspace.clear();
            let xmlDom = Blockly.Xml.textToDom(data);
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
        };
    }
    displaySuccessNotification(".menu","Load was successful.");
}


/**
 * saveBlocks: Download current workspace to user's pc as an XML file.
 */
function saveBlocks() {
    let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    var xmlBlob = new Blob([xmlText], {type: "text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(xmlBlob);
    var downloadLink = document.createElement("a");
    downloadLink.download = 'export.xml';
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    //Clicks on the created element to Prompt for download.
    downloadLink.click();
    displaySuccessNotification(".menu", "Save was successful");
}

// Helper for export blocks.
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

/**
 * generateScript: Sends request to server to record code in pycrafty directory
 */
const DONE = 4;
const SUCCESS_MSG = "SUCCESS";
const FILE_WRITE_ERROR = "WRITE_ERROR";
const UNKNOWN_OS_ERROR = "UNKNOWN_OS";
function generateScript() {
    let codeForm = new FormData();
    let preamble = "from mine import *\n\n" +
        "mc = Minecraft()\n" +
        "\n";
    let xhttp = new XMLHttpRequest();
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    let code = preamble + Blockly.Python.workspaceToCode(mainWorkspace);
    codeForm.append("codeArea", code);
    xhttp.open("POST", "/copy_text", true);
    xhttp.addEventListener('load', function () {
        if (xhttp.readyState === DONE && xhttp.status === 200) {
            if (xhttp.responseText === SUCCESS_MSG) {
                displaySuccessNotification(".menu", "File saved");
            }
            else if (xhttp.responseText === UNKNOWN_OS_ERROR) {
                $(".menu").notify("Unknown OS", "error");
            }
            else if (xhttp.responseText === FILE_WRITE_ERROR) {
                $(".menu").notify("File write error", "error");
            }
            else {
                $(".menu").notify("Unknown error occurred " + xhttp.responseText, "error");
            }

        }
    });
    xhttp.send(codeForm);
}


// Source: https://notifyjs.jpillora.com/
function displaySuccessNotification(element, notificationText) {
    $(element).notify(notificationText, "success");
}