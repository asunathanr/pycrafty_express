// FILE: minecraft.js
// AUTHOR: Richie Burch; Nathan Robertson
// PURPOSE: Implement google_blocks for all methods found in the Minecraft class



//JSON array of blocks
Blockly.defineBlocksWithJsonArray([
    // mc.getBlock()
    {
    "type": "getBlock",
    "message0": "Get Block %1 Vector: %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "Get block type from provided coordinates.",
    "helpUrl": ""
  },
  // mc.getBlocks()
  {
    "type": "getBlocks",
    "message0": "Get list of block types. %1 Start Vector: %2 End Vector: %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec1"
      },
      {
        "type": "input_value",
        "name": "vec2"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "Gets types of blocks in a cuboid. Returns a list of ints.",
    "helpUrl": ""
  },
  // mc.postToChat()
  {
    "type": "postToChat",
    "message0": "Post to chat. %1 %2 %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "TOPOST",
        "check": [
          "String",
          "Number"
        ]
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
  // mc.getBlockWithData()
  {
    "type": "getBlockWithData",
    "message0": "Get block type and id. %1 Vector: %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  // mc.getHeight()
  {
    "type": "getHeight",
    "message0": "Get Height %1 Vector: %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "Get height of tallest non-air block at position.",
    "helpUrl": ""
  },
  // mc.getPlayerEntityIds()
  {
    "type": "getPlayerEntityIds",
    "message0": "Get player ids.",
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  // mc.getPlayerId()
  {
    "type": "getPlayerId",
    "message0": "Get player id.",
    "output": null,
    "colour": 230,
    "tooltip": "Get players id as int.",
    "helpUrl": ""
  },
  // mc.setBlocks()
  {
    "type": "setBlocks",
    "message0": "Set cube of blocks. %1 Start Vector: %2 End Vector: %3 Block: %4",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec1"
      },
      {
        "type": "input_value",
        "name": "vec2"
      },
      {
        "type": "input_value",
        "name": "block"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  // mc.setBlock()
  {
    "type": "setBlock",
    "message0": "Set a single block. %1 Vector: %2 Block: %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "vec"
      },
      {
        "type": "input_value",
        "name": "block"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Set a single block.",
    "helpUrl": ""
  }]);

// Code generators
Blockly.Python['getBlock'] = function(block) {
    var value_vec = Blockly.Python.valueToCode(block, 'vec', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.getBlock('+value_vec+')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['getBlocks'] = function(block) {
    var value_vec1 = Blockly.Python.valueToCode(block, 'vec1', Blockly.Python.ORDER_ATOMIC);
    var value_vec2 = Blockly.Python.valueToCode(block, 'vec2', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.getBlocks('+value_vec1+', '+value_vec2+')\n';
    // TODO: Change ORDER_NONE to the correct strength.

    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['getBlockWithData'] = function(block) {
    var value_vec = Blockly.Python.valueToCode(block, 'vec', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.getBlockWithData('+value_vec+')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

  Blockly.Python['getHeight'] = function(block) {
    var value_vec = Blockly.Python.valueToCode(block, 'vec', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.getHeight('+value_vec+')\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };

Blockly.Python['getPlayerEntityIds'] = function (block) {
    var code = 'mc.getPlayerEntityIds()\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['getPlayerId'] = function (block) {
    var code = 'mc.getPlayerId()\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['postToChat'] = function (block) {
    let value_topost = block.getFieldValue('TOPOST');
    return 'mc.postToChat(' + '"' + value_topost + '"' + ')\n';
};


Blockly.Python['setBlocks'] = function(block) {
    var value_vec1 = Blockly.Python.valueToCode(block, 'vec1', Blockly.Python.ORDER_ATOMIC);
    var value_vec2 = Blockly.Python.valueToCode(block, 'vec2', Blockly.Python.ORDER_ATOMIC);
    var value_block = Blockly.Python.valueToCode(block, 'block', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.setBlocks('+value_vec1+', '+value_vec2+', '+value_block+')\n';
    return code;

};


  Blockly.Python['setBlock'] = function(block) {
    var value_vec = Blockly.Python.valueToCode(block, 'vec', Blockly.Python.ORDER_ATOMIC);
    var value_block = Blockly.Python.valueToCode(block, 'block', Blockly.Python.ORDER_ATOMIC);
    var code = 'mc.setBlock('+value_vec+', '+value_block+')\n';
    return code;
};
