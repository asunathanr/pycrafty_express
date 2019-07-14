// FILE: toolBar.js
// AUTHORS: Justin Erickson, Richie Burch, Matt Hardin, Nathan Robertson
// PURPOSE: Controls behavior of the toolbar. Most functions in this file are triggered upon an event happening.

const PREAMBLE = "from mine import *\n\n" +
    "mc = Minecraft()\n" +
    "\n";

const NOTIFY_OPTIONS = {autoHideDelay: 10000};


/**
 * createSnapshot: Allows user to save current workspace.
 */
// https://groups.google.com/forum/#!topic/blockly/NDlC-l6DLEM
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
    let xmlText = localStorage.getItem("blockly.xml");
    if (xmlText) {
        Blockly.mainWorkspace.clear();
        xmlDom = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
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
            Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
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
}

// Helper for export blocks.
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

/**
 * createScript: Sends request to server to record code in pycrafty directory
 */
function createScript() {
    let codeForm = new FormData();
    let xhttp = new XMLHttpRequest();
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    let code = PREAMBLE + Blockly.Python.workspaceToCode(mainWorkspace);
    codeForm.append("codeArea", code);
    codeForm.append("fileName", document.getElementById("fileNameTextBox").value);
    xhttp.open("POST", "/copy_text", true);
    addLoadEvent(xhttp);
    xhttp.send(codeForm);
}

/**
 * Displays notification to user based on result of AJAX query.
 * @param xhttp: Object representing the AJAX transaction.
 */
function addLoadEvent(xhttp) {
    xhttp.addEventListener('load', function () {
        let response = JSON.parse(xhttp.responseText);
        if (response['errors'] === undefined) {
            displaySuccessNotification(".menu", "File: " + response.file_name + " saved");
        } else {
            $(".menu").notify(JSON.stringify(response.errors[0].msg), "error", NOTIFY_OPTIONS);
        }
    });
}

// Source: https://notifyjs.jpillora.com/
function displaySuccessNotification(element, notificationText) {
    $(element).notify(notificationText, "success", NOTIFY_OPTIONS);
}