// FILE: position.js
// AUTHOR: Richie Burch
// PURPOSE: Implement google_blocks to manipulate position(vector) variables.

// JSON Array for block definitions
Blockly.defineBlocksWithJsonArray([
    {
        // BLOCK: modifies all attributes for a vector object
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
        "colour": '%{BKY_MINECRAFT_HUE}',
        "extensions": ["empty_input_warning"],
        "tooltip": "Modify attributes of a position variable. Keep + 0 to leave an attribute unchanged.",
        "helpUrl": ""
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
    var code = value_variable+'.x = '+value_variable+'.x '+dropdown_xoperator+' '+value_x+'\n'+value_variable+'.y = '+value_variable+'.y '+dropdown_yoperator+' '+value_y+'\n'+value_variable+'.z = '+value_variable+'.z '+dropdown_zoperator+' '+value_z+'\n';
    return code;
};
