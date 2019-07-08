// FILE: player.js
// AUTHOR: Richie Burch; Nathan Robertson
// PURPOSE: Implement google_blocks for all methods in the Minecraft.Player class


// Each block is implemented in two parts: First the new block is added to the Block associative array.
// Then the appropriate python conversion function is added to the Blockly.Python associative array.


const BLOCK_COLOR = 230;


Blockly.defineBlocksWithJsonArray([

    // BLOCK: mc.player.setPos()
    {
        "type":"setPos",
        "message0": "Set Player's position",
        "message1": "%1",
        "args1": [
            {
                "type": "input_value",
                "name": "VEC3",
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": BLOCK_COLOR,
        "tooltip": "Sets player position to new x,y,z coordinates",
        "helpUrl": "",
    },

    // BLOCK: mc.player.setTilePos()
    {
        "type":"setTilePos",
        "message0": "Set Player tile position",
        "message1": "%1",
        "args1": [
            {
                "type": "input_value",
                "name": "VEC3",
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": BLOCK_COLOR,
        "tooltip": "Sets position underneath player to new x,y,z coordinates",
        "helpUrl": "",
    },

    // BLOCK:  mc.player.getDirection()
    {
    "type": "getDirection",
    "message0": 'Get player direction',
    "output": "Number",
    "colour": BLOCK_COLOR,
    "tooltip": "Returns player direction as a Vec3 object.",
    "helpUrl": "documentation/index.html"
    },

    // BLOCK: mc.player.getPitch()
    {
        "type": "getPitch",
        "message0": "Get Player Pitch",
        "output": "Number",
        "colour": BLOCK_COLOR,
        "tooltip": "Returns player pitch as a Vec3 object.",
        "helpUrl": "documentation/index.html"
    },

    // BLOCK: mc.player.getPos()
    {
        "type": "getPos",
        "message0": "Get Player Position",
        "output": "Number",
        "colour": BLOCK_COLOR,
        "tooltip": "Returns player position as a Vec3 object.",
        "helpUrl": "documentation/index.html"
    },

    // BLOCK: mc.player.getRotation()
    {
        "type": "getRotation",
        "message0": "Get player rotation",
        "output": "Number",
        "colour": BLOCK_COLOR,
        "tooltip": "Returns player rotation as a Vec3 object.",
        "helpUrl": "documentation/index.html"
    },

    // BLOCK: mc.player.getTilePos()
    {
        "type": "getTilePos",
        "message0": "Get tile position",
        "output": "Number",
        "colour": BLOCK_COLOR,
        "tooltip": "Returns position of tile player is standing on.",
        "helpUrl": "documentation/index.html"
    }
]);


Blockly.Python['setPos'] = function (block) {
    let vector3 = Blockly.Python.valueToCode(block,"VEC3", Blockly.Python.ORDER_ATOMIC);
    return makeFunctionCall("mc.player.setPos", [vector3]);
};


Blockly.Python['setTilePos'] = function (block) {
    let vector3 = Blockly.Python.valueToCode(block,"VEC3", Blockly.Python.ORDER_ATOMIC);
    return makeFunctionCall("mc,.player.setTilePos", [vector3]);
};


Blockly.Python['getDirection'] = function (block) {
    let code = makeFunctionCall("mc.player.getDirection");
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['getPitch'] = function (block) {
    let code = makeFunctionCall("mc.player.getPitch");
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['getPos'] = function (block) {
    let code = makeFunctionCall("mc.player.getPos");
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['getRotation'] = function (block) {
    let code = makeFunctionCall("mc.player.getRotation");
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['getTilePos'] = function (block) {
    let code = makeFunctionCall("mc.player.getTilePos");
    return [code, Blockly.Python.ORDER_NONE];
};


// HELPERS

/**
 * @function makeFunctionCall: Constructs a string representing a python function call
 * @param functionName: string
 * @param arguments: array (empty by default)
 */
let makeFunctionCall = (functionName, arguments=[]) => {
    return functionName + "(" + arguments.join(", ") + ")\n";
};