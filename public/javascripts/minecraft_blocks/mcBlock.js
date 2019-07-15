// FILE: mcBlock.js
// AUTHOR: Nathan Robertson, Richie Burch
// PURPOSE: Code to display and generate minecraft blocks


Blockly.defineBlocksWithJsonArray([

  {
    "type": "mcblock_all_attrs",
    "message0": "Modify block:  %1 Block type: %2",
    "args0": [
      {
        "type": "input_value",
        "name": "BLOCK",
        "check": "Block"
      },
      {
        "type": "field_dropdown",
        "name": "ID",
        "options": [
          ["AIR", "0"], ["STONE", "1"], 
          ["GRASS", "2"], ["DIRT", "3"], 
          ["COBBLESTONE", "4"], ["WOOD_PLANKS", "5"], 
          ["SAPLING", "6"], ["BEDROCK", "7"],
          ["WATER", "8"], ["WATER_STATIONARY", "9"], 
          ["LAVA", "10"], ["LAVA_STATIONARY", "11"], 
          ["SAND", "12"], ["GRAVEL", "13"], 
          ["GOLD_ORE", "14"], ["IRON_ORE", "15"], 
          ["COAL_ORE", "16"], ["WOOD", "17"], 
          ["LEAVES", "18"], ["GLASS", "20"], 
          ["LAPIS_LAZULI_ORE", "21"], ["LAPIS_LAZULI_BLOCK", "22"], 
          ["SANDSTONE", "24"], ["BED", "26"], ["COBWEB", "30"], 
          ["GRASS_TALL", "31"], ["WOOL", "35"], ["FLOWER_YELLOW", "37"], 
          ["LOWER_CYAN", "38"], ["MUSHROOM_BROWN", "39"], 
          ["MUSHROOM_RED", "40"], ["GOLD_BLOCK", "41"], 
          ["IRON_BLOCK", "42"], ["STONE_SLAB_DOUBLE", "43"], 
          ["STONE_SLAB", "44"], ["BRICK_BLOCK", "45"], ["TNT", "46"], 
          ["BOOKSHELF", "47"], ["MOSS_STONE", "48"], ["OBSIDIAN", "49"], 
          ["TORCH", "50"], ["FIRE", "51"], ["STAIRS_WOOD", "53"], 
          ["CHEST", "54"], ["DIAMOND_ORE", "56"], ["DIAMOND_BLOCK", "57"], 
          ["CRAFTING_TABLE", "58"], ["FARMLAND", "60"], 
          ["FURNACE_INACTIVE", "61"], ["FURNACE_ACTIVE", "62"], 
          ["DOOR_WOOD", "64"], ["LADDER", "65"], 
          ["STAIRS_COBBLESTONE", "67"], ["DOOR_IRON", "71"], 
          ["REDSTONE_ORE", "73"], ["SNOW", "78"], 
          ["ICE", "79"], ["SNOW_BLOCK", "80"], 
          ["CACTUS", "81"], ["CLAY", "82"], ["SUGAR_CANE", "83"], 
          ["FENCE", "85"], ["GLOWSTONE_BLOCK", "89"], 
          ["BEDROCK_INVISIBLE", "95"], ["STONE_BRICK", "98"], 
          ["GLASS_PANE", "102"], ["MELON", "103"], 
          ["FENCE_GATE", "107"], ["GLOWING_OBSIDIAN", "246"], ["NETHER_REACTOR_CORE", "247"]]         
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "extensions" : ["dynamic_dropdown_extension"],
    "colour": 230,
    "tooltip": "Change the type and sup-type of a provided block object.",
    "helpUrl": ""
  }
]);

// code generators
Blockly.Python['mcblock_all_attrs'] = function(block) {
  var value_block = Blockly.Python.valueToCode(block, 'BLOCK', Blockly.Python.ORDER_ATOMIC);
  var dropdown_id = block.getFieldValue('ID');
  // TODO: Assemble Python into code variable.
  var code = value_block+'.id = '+dropdown_id+'\n';
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
    var idDict = [];
    
    idDict["5"] = [["Oak", "0"], ["Spruce", "1"], ["Birch", "2"], ["Jungle", "3"]];
    idDict["17"] = [["Oak(up/down)", "0"], ["Spruce(up/down)", "1"], ["Birch(up/down)", "2"], ["Jungle(up/down)", "3"], ["Oak(east/west)", "4"], ["Spruce(east/west)", "5"], ["Birch(east/west)", "6"], ["Jungle(east/west)", "7"], ["Oak(north/south)", "8"], ["Spruce(north/south)", "9"], ["Birch(north/south)", "10"], ["Jungle(north/south)", "11"], ["Oak(bark only)", "12"], ["Spruce(bark only)", "13"], ["Birch(bark only)", "14"], ["Jungle(bark only)", "15"]];
    idDict["31"] = [["Shrub", "0"], ["Grass", "1"], ["Fern", "2"], ["Biome Grass", "3"]];
    idDict["35"] = [["White", "0"], ["Orange", "1"], ["Magenta", "2"], ["Light Blue", "3"], ["Yellow", "4"], ["Lime", "5"], ["Pink", "6"], ["Grey", "7"], ["Light Grey", "8"], ["Cyan", "9"], ["Purple", "10"], ["Blue", "11"], ["Brown", "12"], ["Green", "13"], ["Red", "14"], ["Black", "15"]];
    idDict["80"] = [["East", "1"], ["West", "2"], ["South", "3"], ["North", "3"], ["Up", "5"]];
    idDict["98"] = [["Stone Brick", "0"], ["Mossy", "1"], ["Cracked", "2"], ["Chiseled", "3"]];
    idDict["43"] = [["Stone", "0"], ["Sandstone", "1"], ["Wooden", "2"], ["Cobblestone", "3"], ["Brick", "4"], ["Stone Brick", "5"], ["Nether Brick", "6"], ["Quartz", "7"]];
    idDict["44"] = [["Stone", "0"], ["Sandstone", "1"], ["Wooden", "2"], ["Cobblestone", "3"], ["Brick", "4"], ["Stone Brick", "5"], ["Nether Brick", "6"], ["Quartz", "7"]];
    idDict["46"] = [["Inactive", "0"], ["Active", "1"]];

    this.setOnChange(function(changeEvent) {
      var id = this.getFieldValue("ID");
      if(idDict.hasOwnProperty(id)) {
        if(this.getInput("DATAIN") === null) {
          var dataList = idDict[id];
          var dropdown = new Blockly.FieldDropdown(dataList);
          this.appendDummyInput("DATAIN").appendField("sub-type: ").appendField(dropdown, "DATA");
        }   
      } else {
        if(this.getInput("DATAIN") === null) {

        } else {
          this.removeInput("DATAIN");
        }
      }
    
    //console.log(id);
    })
    
  });