// FILE: mcBlock.js
// AUTHOR: Nathan Robertson
// PURPOSE: Code to display and generate minecraft blocks


Blockly.defineBlocksWithJsonArray([

    // BLOCK: mcblock_setBlock
    {
        "type":"mcblock_setBlock",
        "message0": "Set block variable: %1 to %2",
        "args0": [
            {
                "type": "input_value",
                "name": "VAR",
            },
            {
                "type": "input_value",
                "name": "NEW_MCBLOCK"
            }
        ],

        "previousStatement": null,
        "nextStatement": null,
        "colour": BLOCK_COLOR,
        "tooltip": "Sets block to a new block value.",
        "helpUrl": "",
    },

    // BLOCK: setType
    {
        "type": "mcblock_setType",
        "message0": "Set type of block: %1 to new type: %2",
        "args0": [
            {
                "type": "input_value",
                "name": "CURRENT_MCBLOCK",
            },
            {
                "type": "input_value",
                "name": "NEW_TYPE"
            }
        ],

        "previousStatement": null,
        "nextStatement": null,
        "colour": BLOCK_COLOR,
        "tooltip": "Change type of block",
        "helpUrl": "",
    },

    // BLOCK: setData
    {
        "type":"mcblock_setData",
        "message0": "Set data of block %1 to %2",
        "args0": [
            {
                "type": "input_value",
                "name": "CURRENT_MCBLOCK",
            },
            {
                "type": "input_value",
                "name": "NEW_DATA"
            }
        ],

        "previousStatement": null,
        "nextStatement": null,
        "colour": BLOCK_COLOR,
        "tooltip": "Change data of block",
        "helpUrl": "",
    }

]);


Blockly.Python['mcblock_setBlock'] = function (block) {
    let variable = retrieveValue(block, "VAR");
    let new_mcblock = retrieveValue(block, "NEW_MCBLOCK");
    return variable + " = " + new_mcblock + "\n";
};


Blockly.Python['mcblock_setType'] = function (block) {
    let current_mcblock = retrieveValue(block, "CURRENT_MCBLOCK");
    let new_type = retrieveValue(block, "NEW_TYPE");
    return current_mcblock + ".type" + " = " + new_type + "\n";
};


Blockly.Python['mcblock_setData'] = function (block) {
    let current_mcblock = retrieveValue(block, "CURRENT_MCBLOCK");
    let new_data = retrieveValue(block, "NEW_DATA");
    return current_mcblock + ".data" + " = " + new_data + "\n";
};


/**
 * @function retrieveValue: Wrapper around code generator.
 * @param block: Blockly block which contains value input
 * @param name: Name of particular value input to retrieve from block
 * @param order: Precedence of retrieved value compared to other blocks around it (defaults to atomic)
 */
let retrieveValue = (block, name, order=Blockly.Python.ORDER_ATOMIC) => {
    return Blockly.Python.valueToCode(block, name, order);
};
