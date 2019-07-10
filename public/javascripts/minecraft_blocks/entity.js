// FILE: entity.js
// AUTHOR: Matt Hardin, Nathan Robertson, Richie Burch
// PURPOSE: Implement google_blocks to map to Minecraft().entity methods.

// JSON Block Layout
Blockly.defineBlocksWithJsonArray([
    {
        //BLOCK: mc.entity.getPos()
        "type": "entity_get_position",
        "message0": "Get position of other player: %1",
        "args0": [
          {
            "type": "input_value",
            "name": "ENTITYID",
            "check": "Number"
          }
        ],
        "output": "Vector",
        "colour": 230,
        "tooltip": "Get position of specified player.",
        "helpUrl": ""
      },

]);


// Code Generation Functions
Blockly.Python['entity_get_position'] = function(block) {
    var value_entityid = Blockly.Python.valueToCode(block, 'ENTITYID', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'mc.entity.getPos('+value_entityid+')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };