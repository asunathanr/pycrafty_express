// FILE: player.js
// AUTHOR: Richie Burch; Nathan Robertson
// PURPOSE: Implement google_blocks for all methods in the Minecraft.Player class


// Each block is implemented in two parts: First the new block is added to the Block associative array.
// Then the appropriate python conversion function is added to the Blockly.Python associative array.


const BLOCK_COLOR = 230;


Blockly.defineBlocksWithJsonArray([

    // BLOCK: mc.player.setPos()
    {
        "type": "player_set_position",
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
        "type": "player_set_tile_position",
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
        "type": "player_get_direction",
        "message0": "Get players direction.",
        "output": "Vector",
        "colour": 230,
        "tooltip": "Get players direction. Returns a vector object.",
        "helpUrl": ""
      },

    // BLOCK: mc.player.getPitch()
    {
        "type": "player_get_pitch",
        "message0": "Get players pitch.",
        "output": "Number",
        "colour": 230,
        "tooltip": "Gets the players pitch",
        "helpUrl": ""
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
        "type": "player_get_tile_position",
        "message0": "Get position under player.",
        "output": "Vector",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);


Blockly.Python['player_set_position'] = function (block) {
    let vector3 = Blockly.Python.valueToCode(block,"VEC3", Blockly.Python.ORDER_ATOMIC);
    return makeFunctionCall("mc.player.setPos", [vector3]);
};


Blockly.Python['player_set_tile_position'] = function (block) {
    let vector3 = Blockly.Python.valueToCode(block,"VEC3", Blockly.Python.ORDER_ATOMIC);
    return makeFunctionCall("mc,.player.setTilePos", [vector3]);
};


Blockly.Python['player_get_direction'] = function (block) {
    let code = makeFunctionCall("mc.player.getDirection");
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['player_get_pitch'] = function (block) {
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


Blockly.Python['player_get_tile_position'] = function (block) {
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