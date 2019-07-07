function showCode() {
    // Generate python  code and display it/Save It.
    //This helps Blockly avoid getting hung up
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    //This converts the workspace into Code using the Code generation snippet in test_block
    let preamble = "from mine import *\n\n" +
        "mc = Minecraft()\n" +
        "\n";

    var code = preamble + Blockly.Python.workspaceToCode(demoWorkspace);
    //This is all Preparation For Downloading the file
    var PythonStub = new Blob([code], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(PythonStub);
    var downloadLink = document.createElement("a");
    downloadLink.download = 'Python_stub.py';
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    //Clicks on the created element to Prompt for download.
    downloadLink.click();

    //Helpful for Debugging
    //alert(code);
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

// https://groups.google.com/forum/#!topic/blockly/NDlC-l6DLEM
// TODO: Clean up and finalize save and restore
function save() {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    localStorage.setItem("blockly.xml", xmlText);
}
function restore() {
    var xmlText = localStorage.getItem("blockly.xml");
    if (xmlText) {
        Blockly.mainWorkspace.clear();
        xmlDom = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
}


function displayCodeInBrowser()
{
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    let codeArea = document.getElementById("codeArea");
    let preamble = "from mine import *\n\n" +
        "mc = Minecraft()\n" +
        "\n";
    codeArea.value = preamble + Blockly.Python.workspaceToCode(demoWorkspace);
}