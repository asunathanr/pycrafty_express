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
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(mainWorkspace);
};
// Update python code in textarea when the workspace changes.
mainWorkspace.addChangeListener(function () {
    displayCodeInBrowser();
});
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(mainWorkspace);