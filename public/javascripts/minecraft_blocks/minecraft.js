// FILE: minecraft.js
// AUTHOR: Richie Burch; Nathan Robertson
// PURPOSE: Implement google_blocks for all methods found in the Minecraft class



//JSON array of blocks
Blockly.defineBlocksWithJsonArray([
  {
    // BLOCK: mc.postToChat()
    "type": "post_to_chat",
    "message0": "Post to chat. %1 %2 %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "TOPOST"
      },
      {
        "type": "input_dummy"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Post a message to in game chat.",
    "helpUrl": ""
  },
  {
    // BLOCK: mc.setBlock()
    "type": "set_block",
    "message0": "Set a single block. %1 Position: %2 Block: %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec",
        "check": "Vector"
      },
      {
        "type": "input_value",
        "name": "block",
        "check": "Block"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Set a single block.",
    "helpUrl": ""
  },
  {
    // BLOCK: mc.setBlocks()
    "type": "set_blocks",
    "message0": "Set cube of blocks. %1 Start Position: %2 End Position: %3 Block: %4",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec1",
        "check": "Vector"
      },
      {
        "type": "input_value",
        "name": "vec2",
        "check": "Vector"
      },
      {
        "type": "input_value",
        "name": "block",
        "check": "Block"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    // BLOCK: mc.getBlock()
    "type": "get_block",
    "message0": "Get Block %1 Position: %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec",
        "check": "Vector"
      }
    ],
    "output": "Block",
    "colour": 230,
    "tooltip": "Get block type from provided coordinates.",
    "helpUrl": ""
  },
  {
    // BLOCK: mc.getBlockWithData()
    "type": "get_block_with_data",
    "message0": "Get block type and id. %1 Position: %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec",
        "check": "Vector"
      }
    ],
    "output": "Block",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    // BLOCK: mc.getBlocks()
    "type": "get_blocks",
    "message0": "Get list of block types. %1 Start Position: %2 End Position: %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec1",
        "check": "Vector"
      },
      {
        "type": "input_value",
        "name": "vec2",
        "check": "Vector"
      }
    ],
    "output": "List",
    "colour": 230,
    "tooltip": "Gets types of blocks in a cuboid. Returns a list of ints.",
    "helpUrl": ""
  },
  {
    // BLOCK: mc.getHeight()
    "type": "get_height",
    "message0": "Get Height %1 Position: %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec",
        "check": "Vector"
      }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "Get height of tallest non-air block at position.",
    "helpUrl": ""
  },
  {
    // BLOCK: mc.getPlayerId()
    "type": "get_player_id",
    "message0": "Get player id.",
    "output": "Number",
    "colour": 230,
    "tooltip": "Get players id as int.",
    "helpUrl": ""
  },
  {
    // BLOCK: mc.getPlayerEntityIds()
    "type": "get_player_entity_ids",
    "message0": "Get player ids.",
    "output": "List",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

// Code generators
Blockly.Python['post_to_chat'] = function (block) {
  let value_topost = block.getFieldValue('TOPOST');
  return 'mc.postToChat(' + '"' + value_topost + '"' + ')\n';
};
Blockly.Python['set_block'] = function(block) {
  var value_vec = Blockly.Python.valueToCode(block, 'vec', Blockly.Python.ORDER_ATOMIC);
  var value_block = Blockly.Python.valueToCode(block, 'block', Blockly.Python.ORDER_ATOMIC);
  var code = 'mc.setBlock('+value_vec+', '+value_block+')\n';
  return code;
};
Blockly.Python['set_blocks'] = function(block) {
  var value_vec1 = Blockly.Python.valueToCode(block, 'vec1', Blockly.Python.ORDER_ATOMIC);
  var value_vec2 = Blockly.Python.valueToCode(block, 'vec2', Blockly.Python.ORDER_ATOMIC);
  var value_block = Blockly.Python.valueToCode(block, 'block', Blockly.Python.ORDER_ATOMIC);
  var code = 'mc.setBlocks('+value_vec1+', '+value_vec2+', '+value_block+')\n';
  return code;
};
Blockly.Python['get_block'] = function(block) {
    var value_vec = Blockly.Python.valueToCode(block, 'vec', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.getBlock('+value_vec+')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['get_block_with_data'] = function(block) {
  var value_vec = Blockly.Python.valueToCode(block, 'vec', Blockly.Python.ORDER_ATOMIC);
  var code = 'mc.getBlockWithData('+value_vec+')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['get_blocks'] = function(block) {
    var value_vec1 = Blockly.Python.valueToCode(block, 'vec1', Blockly.Python.ORDER_ATOMIC);
    var value_vec2 = Blockly.Python.valueToCode(block, 'vec2', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.getBlocks('+value_vec1+', '+value_vec2+')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['get_height'] = function(block) {
    var value_vec = Blockly.Python.valueToCode(block, 'vec', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.getHeight('+value_vec+')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['get_player_id'] = function (block) {
  var code = 'mc.getPlayerId()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['get_player_entity_ids'] = function (block) {
    var code = 'mc.getPlayerEntityIds()\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};
