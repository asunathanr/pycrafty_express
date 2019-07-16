// FILE: workspace.js
// AUTHORS: Justin Erickson, Richie Burch, Matt Hardin, Nathan Robertson
// PURPOSE: Code to setup and work with main blockly workspace.

const WORKSPACE_KEY = "workspace";
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var mainWorkspace = Blockly.inject(blocklyDiv,
    {
        media: 'media' + "\\",
        toolbox: document.getElementById('toolbox'),
        zoom:
            {controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2},
        trashcan: true
    });

var onresize = function (event) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element = blocklyArea;
    let x = 0;
    let y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = 'calc(100% - 5%)';
    Blockly.svgResize(mainWorkspace);
};

/**
 * displayCodeInBrowser: Places generated python code in the codeArea textarea of web browser.
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


function storeWorkspace() {
    let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    sessionStorage.setItem(WORKSPACE_KEY, xmlText);
}

// Update python code in textarea when the workspace changes.
mainWorkspace.addChangeListener(function () {
    displayCodeInBrowser();
    storeWorkspace();
});


window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(mainWorkspace);

// Restore session storage of workspace.
let data = sessionStorage.getItem(WORKSPACE_KEY);
let xmlDom = Blockly.Xml.textToDom(data);
Blockly.Xml.domToWorkspace(xmlDom, mainWorkspace);
