// FILE: position.js
// AUTHOR: Richie Burch
// PURPOSE: Implement google_blocks to manipulate position(vector) variables.

// JSON Array for block definitions
Blockly.defineBlocksWithJsonArray([
    {
        "type": "vector_all_attrs",
        "message0": "Modify position: %1 x %2 %3 y %4 %5 Z %6 %7",
        "args0": [
          {
            "type": "input_value",
            "name": "VARIABLE",
            "check": "Vector"
          },
          {
            "type": "field_dropdown",
            "name": "XOPERATOR",
            "options": [
              [
                "+",
                "+"
              ],
              [
                "-",
                "-"
              ],
              [
                "*",
                "*"
              ],
              [
                "\\",
                "\\"
              ],
              [
                "%",
                "%"
              ]
            ]
          },
          {
            "type": "input_value",
            "name": "X",
            "check": "Number"
          },
          {
            "type": "field_dropdown",
            "name": "YOPERATOR",
            "options": [
              [
                "+",
                "+"
              ],
              [
                "-",
                "-"
              ],
              [
                "*",
                "*"
              ],
              [
                "\\",
                "\\"
              ],
              [
                "%",
                "%"
              ]
            ]
          },
          {
            "type": "input_value",
            "name": "Y",
            "check": "Number"
          },
          {
            "type": "field_dropdown",
            "name": "ZOPERATOR",
            "options": [
              [
                "+",
                "+"
              ],
              [
                "-",
                "-"
              ],
              [
                "*",
                "*"
              ],
              [
                "\\",
                "\\"
              ],
              [
                "%",
                "%"
              ]
            ]
          },
          {
            "type": "input_value",
            "name": "Z",
            "check": "Number"
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Modify attributes of a position variable.",
        "helpUrl": ""
      },
    {
        // BLOCK: set_vector_attribute_to
        "type": "set_vector_attribute_to",
        "message0": "Set %1 to %2",
        "args0": [
            {
                "type": "input_value",
                "name": "LEFT"
            },
            {
                "type": "input_value",
                "name": "RIGHT"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": BLOCK_COLOR,
        "tooltip": "Set variable attribute to a value.",
        "helpUrl": ""
    },
    {
        // BLOCK: vector_x_attribute
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
    {
        // BLOCK: vector_y_attribute
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
    {
        // BLOCK: vector_z_attribute
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
    }
])

// code generators
Blockly.Python['vector_all_attrs'] = function(block) {
    var value_variable = Blockly.Python.valueToCode(block, 'VARIABLE', Blockly.Python.ORDER_ATOMIC);
    var dropdown_xoperator = block.getFieldValue('XOPERATOR');
    var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
    var dropdown_yoperator = block.getFieldValue('YOPERATOR');
    var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
    var dropdown_zoperator = block.getFieldValue('ZOPERATOR');
    var value_z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = value_variable+'.x = '+value_variable+'.x '+dropdown_xoperator+' '+value_x+'\n'+value_variable+'.y = '+value_variable+'.y '+dropdown_yoperator+' '+value_y+'\n'+value_variable+'.z = '+value_variable+'.z '+dropdown_zoperator+' '+value_z+'\n';
    return code;
};
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
Blockly.Python['set_vector_attribute_to'] = function(block) {
    var value_left = Blockly.Python.valueToCode(block, 'LEFT', Blockly.Python.ORDER_ATOMIC);
    var value_right = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = value_left+' = '+ value_right + '\n';
    return code;
  };
