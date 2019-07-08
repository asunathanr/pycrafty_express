// FILE: toolBar.js
// AUTHORS: Justin Erickson, Richie Burch, Matt Hardin, Nathan Robertson
// PURPOSE: Controls behavior of the toolbar. Most functions in this file are triggered upon an event happening.


// https://groups.google.com/forum/#!topic/blockly/NDlC-l6DLEM
// TODO: Clean up and finalize save and restore
function save() {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    localStorage.setItem("blockly.xml", xmlText);
}

/**
 * restore: Restores a saved workspace in browser.
 */
function restore() {
    var xmlText = localStorage.getItem("blockly.xml");
    if (xmlText) {
        Blockly.mainWorkspace.clear();
        xmlDom = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
}

/**
 * displayCodeInBrowser: Places generated python code in specified textarea of web browser.
 */
function displayCodeInBrowser() {
    // Prevents Blockly from getting hung in an infinite loop
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    let codeArea = document.getElementById("codeArea");
    let preamble = "from mine import *\n\n" +
        "mc = Minecraft()\n" +
        "\n";
    codeArea.value = preamble + Blockly.Python.workspaceToCode(mainWorkspace);
}


/**
 * importBlocks: Reads an XML file and loads it into workspace.
 */
function importBlocks() {
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
}


/**
 * exportBlocks: Download current workspace to user's pc as an XML file.
 */
function exportBlocks() {
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
 * copyCode: Sends request to server to record code in pycrafty directory
 */
function copyCode() {
    let codeForm = new FormData();
    let preamble = "from mine import *\n\n" +
        "mc = Minecraft()\n" +
        "\n";
    let xhttp = new XMLHttpRequest();
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    let code = preamble + Blockly.Python.workspaceToCode(mainWorkspace);
    codeForm.append("codeArea", code);
    xhttp.open("POST", "/copy_text", true);
    xhttp.send(codeForm);
    // With AJAX user would have no idea the file actually saved so display notification.
    // Source: https://notifyjs.jpillora.com/
    $.notify("File saved", "success", { position: "bottom" });
}