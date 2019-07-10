// FILE: player.js
// AUTHOR: Richie Burch; Nathan Robertson
// PURPOSE: Implement google_blocks for all methods in the Minecraft.Player class


// Each block is implemented in two parts: First the new block is added to the Block associative array.
// Then the appropriate python conversion function is added to the Blockly.Python associative array.


const BLOCK_COLOR = 230;


Blockly.defineBlocksWithJsonArray([

    // BLOCK: mc.player.setPos()
    {
        "type": "set_player_position",
        "message0": "Set players position to : %1",
        "args0": [
          {
            "type": "input_value",
            "name": "VEC3",
            "check": "Vector"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Moves player to provided position.",
        "helpUrl": ""
      },

    // BLOCK: mc.player.setTilePos()
    {
        "type": "set_player_tile_position",
        "message0": "Set players position on top of: %1",
        "args0": [
          {
            "type": "input_value",
            "name": "NAME",
            "check": "Vector"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Move player on top of tile at provided position.",
        "helpUrl": ""
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
        "type": "player_get_position",
        "message0": "Get players position.",
        "output": "Vector",
        "colour": 230,
        "tooltip": "Gets players position in the world. Returns coordinates as vector.",
        "helpUrl": ""
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


Blockly.Python['set_player_position'] = function (block) {
    let vector3 = Blockly.Python.valueToCode(block,"VEC3", Blockly.Python.ORDER_ATOMIC);
    return makeFunctionCall("mc.player.setPos", [vector3]);
};


Blockly.Python['set_player_tile_position'] = function (block) {
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


Blockly.Python['player_get_position'] = function (block) {
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