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
        "extensions": ["dynamic_dropdown_extension"],
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


  // helper functions
  function getvals(){
    return fetch('http://localhost:3000/javascripts/minecraft_blocks/mcBlockIds.txt')
    .then(response => response.text())
    .then(data => {
      console.dir(data);
    })
    .catch(error => console.log(error));
  }

  function dynamicOptions(optsString) {
    var options = []
    for(i of optsString.split(" ")) {
      options.push([i, i]);
    }
    return options;
  }

// Extension for dropdown
Blockly.Extensions.register('dynamic_dropdown_extension', 
  function() {
    fetch('http://localhost:3000/javascripts/minecraft_blocks/mcBlockIds.txt')
    .then(response => response.text())
    .then(data => {
      var dropdown = new Blockly.FieldDropdown(dynamicOptions(data)); // stopped here. maybe wrapping the code to populate the dropdown in a fetch inside an extension will be the answer?
      this.inputList[1].appendField(dropdown, "LIST");
    })
    .catch(error => console.log(error));
    
    
  });