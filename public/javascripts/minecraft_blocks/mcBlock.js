// FILE: mcBlock.js
// AUTHOR: Nathan Robertson, Richie Burch
// PURPOSE: Code to display and generate minecraft blocks


Blockly.defineBlocksWithJsonArray([

    {
        // BLOCK: block.id = \n block.data = 
        "type": "mcblock_all_attrs",
        "message0": "Modify block:  %1 ID:  %2 Data:  %3",
        "args0": [
          {
            "type": "input_value",
            "name": "BLOCK",
            "check": "Block"
          },
          {
            "type": "input_value",
            "name": "ID",
            "check": "Number"
          },
          {
            "type": "input_value",
            "name": "DATA",
            "check": "Number"
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Change the type and sup-type of a provided block object.",
        "helpUrl": ""
      }
]);

// code generators
Blockly.Python['mcblock_all_attrs'] = function(block) {
    var value_block = Blockly.Python.valueToCode(block, 'BLOCK', Blockly.Python.ORDER_ATOMIC);
    var value_id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_ATOMIC);
    var value_data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = value_block+'.id = '+value_id+'\n'+value_block+'.data = '+value_data+'\n';
    return code;
  };
