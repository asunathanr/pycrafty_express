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
    var list = [["AIR", "0"], ["STONE", "1"], ["GRASS", "2"], ["DIRT", "3"], ["COBBLESTONE", "4"], ["WOOD_PLANKS", "5"], ["SAPLING", "6"], ["BEDROCK", "7"], ["WATER", "8"], ["WATER_STATIONARY", "9"], ["LAVA", "10"], ["LAVA_STATIONARY", "11"], ["SAND", "12"], ["GRAVEL", "13"], ["GOLD_ORE", "14"], ["IRON_ORE", "15"], ["COAL_ORE", "16"], ["WOOD", "17"], ["LEAVES", "18"], ["GLASS", "20"], ["LAPIS_LAZULI_ORE", "21"], ["LAPIS_LAZULI_BLOCK", "22"], ["SANDSTONE", "24"], ["BED", "26"], ["COBWEB", "30"], ["GRASS_TALL", "31"], ["WOOL", "35"], ["FLOWER_YELLOW", "37"], ["LOWER_CYAN", "38"], ["MUSHROOM_BROWN", "39"], ["MUSHROOM_RED", "40"], ["GOLD_BLOCK", "41"], ["IRON_BLOCK", "42"], ["STONE_SLAB_DOUBLE", "43"], ["STONE_SLAB", "44"], ["BRICK_BLOCK", "45"], ["TNT", "46"], ["BOOKSHELF", "47"], ["MOSS_STONE", "48"], ["OBSIDIAN", "49"], ["TORCH", "50"], ["FIRE", "51"], ["STAIRS_WOOD", "53"], ["CHEST", "54"], ["DIAMOND_ORE", "56"], ["DIAMOND_BLOCK", "57"], ["CRAFTING_TABLE", "58"], ["FARMLAND", "60"], ["FURNACE_INACTIVE", "61"], ["FURNACE_ACTIVE", "62"], ["DOOR_WOOD", "64"], ["LADDER", "65"], ["STAIRS_COBBLESTONE", "67"], ["DOOR_IRON", "71"], ["REDSTONE_ORE", "73"], ["SNOW", "78"], ["ICE", "79"], ["SNOW_BLOCK", "80"], ["CACTUS", "81"], ["CLAY", "82"], ["SUGAR_CANE", "83"], ["FENCE", "85"], ["GLOWSTONE_BLOCK", "89"], ["BEDROCK_INVISIBLE", "95"], ["STONE_BRICK", "98"], ["GLASS_PANE", "102"], ["MELON", "103"], ["FENCE_GATE", "107"], ["GLOWING_OBSIDIAN", "246"], ["NETHER_REACTOR_CORE", "247"]];
    var dropdown = new Blockly.FieldDropdown(list); // stopped here. maybe wrapping the code to populate the dropdown in a fetch inside an extension will be the answer?
    this.inputList[0].appendField(dropdown, "LIST");
    
    
    
  });