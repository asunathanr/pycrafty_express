// FILE: workspace.js
// AUTHORS: Justin Erickson, Richie Burch, Matt Hardin, Nathan Robertson
// PURPOSE: Code to setup and work with main blockly workspace.


var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var mainWorkspace = Blockly.inject(blocklyDiv,
    {
        media: 'media' + "\\",
        toolbox: document.getElementById('toolbox')
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

// Update python code in textarea when the workspace changes.
mainWorkspace.addChangeListener(function () {
    displayCodeInBrowser();
});

// TODO: Make scrollbars start at 0,0

window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(mainWorkspace);