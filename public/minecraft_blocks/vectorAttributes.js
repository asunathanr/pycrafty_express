
Blockly.defineBlocksWithJsonArray([

    // BLOCK: vector_x_attribute
    {
        "type": "vector_x_attribute",
        "message0": "x attribute of %1",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME"
            },
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Manipulate the x attribute of a vector object.",
        "helpUrl": "",
    },


    // BLOCK: vector_y_attribute
    {
        "type": "vector_y_attribute",
        "message0": "y attribute of %1",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME"
            },
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Manipulate the y attribute of a vector object.",
        "helpUrl": "",
    },


    // BLOCK: vector_z_attribute
    {
        "type": "vector_z_attribute",
        "message0": "z attribute of %1",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME"
            },
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Manipulate the z attribute of a vector object.",
        "helpUrl": "",
    },

]);


  Blockly.Python['vector_x_attribute'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = value_name + '.x';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['vector_y_attribute'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = value_name + '.y';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };


  Blockly.Python['vector_z_attribute'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = value_name + '.z';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };