/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable google_blocks for Blockly.

 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author duzc2dtw@gmail.com (Du Tian Wei)
 */
'use strict';

goog.provide('Blockly.Constants.VariablesDynamic');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Unused constant for the common HSV hue for all google_blocks in this category.
 * @deprecated Use Blockly.Msg['VARIABLES_DYNAMIC_HUE']. (2018 April 5)
 */
Blockly.Constants.VariablesDynamic.HUE = 310;

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
  // Block for variable getter.
  {
    "type": "variables_get_dynamic",
    "message0": "%1",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    }],
    "output": null,
    "style": "variable_dynamic_blocks",
    "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
    "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
    "extensions": ["contextMenu_variableDynamicSetterGetter", "check_for_setter"]
  },
  // Block for variable setter.
  {
    "type": "variables_set_dynamic",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_dynamic_blocks",
    "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
    "extensions": ["contextMenu_variableDynamicSetterGetter", "check_setter_connection"]
  }
]); // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mixin to add context menu items to create getter/setter google_blocks for this
 * setter/getter.
 * Used by google_blocks 'variables_set_dynamic' and 'variables_get_dynamic'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.VariablesDynamic.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    // Getter google_blocks have the option to create a setter block, and vice versa.
    if (!this.isInFlyout) {
      var opposite_type;
      var contextMenuMsg;
      var id = this.getFieldValue('VAR');
      var variableModel = this.workspace.getVariableById(id);
      var varType = variableModel.type;
      if (this.type === 'variables_get_dynamic') {
        opposite_type = 'variables_set_dynamic';
        contextMenuMsg = Blockly.Msg['VARIABLES_GET_CREATE_SET'];
      } else {
        opposite_type = 'variables_get_dynamic';
        contextMenuMsg = Blockly.Msg['VARIABLES_SET_CREATE_GET'];
      }

      var option = {enabled: this.workspace.remainingCapacity() > 0};
      var name = this.getField('VAR').getText();
      option.text = contextMenuMsg.replace('%1', name);
      var xmlField = document.createElement('field');
      xmlField.setAttribute('name', 'VAR');
      xmlField.setAttribute('variabletype', varType);
      xmlField.appendChild(document.createTextNode(name));
      var xmlBlock = document.createElement('block');
      xmlBlock.setAttribute('type', opposite_type);
      xmlBlock.appendChild(xmlField);
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
    } else {
      if (this.type === 'variables_get_dynamic' ||
       this.type === 'variables_get_reporter_dynamic') {
        var renameOption = {
          text: Blockly.Msg.RENAME_VARIABLE,
          enabled: true,
          callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
        };
        var name = this.getField('VAR').getText();
        var deleteOption = {
          text: Blockly.Msg.DELETE_VARIABLE.replace('%1', name),
          enabled: true,
          callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
        };
        options.unshift(renameOption);
        options.unshift(deleteOption);
      }
    }
  },
  onchange: function() {
    var id = this.getFieldValue('VAR');
    var variableModel = this.workspace.getVariableById(id);
    if (this.type === 'variables_get_dynamic') {
      this.outputConnection.setCheck(variableModel.type);
    } else {
      this.getInput('VALUE').connection.setCheck(variableModel.type);
    }
  }
};

/**
  * Callback for rename variable dropdown menu option associated with a
  * variable getter block.
  * @param {!Blockly.Block} block The block with the variable to rename.
  * @return {!function()} A function that renames the variable.
  */
Blockly.Constants.VariablesDynamic.RENAME_OPTION_CALLBACK_FACTORY = function(block) {
  return function() {
    var workspace = block.workspace;
    var variable = block.getField('VAR').getVariable();
    Blockly.Variables.renameVariable(workspace, variable);
  };
};

/**
 * Callback for delete variable dropdown menu option associated with a
 * variable getter block.
 * @param {!Blockly.Block} block The block with the variable to delete.
 * @return {!function()} A function that deletes the variable.
 */
Blockly.Constants.VariablesDynamic.DELETE_OPTION_CALLBACK_FACTORY = function(block) {
  return function() {
    var workspace = block.workspace;
    var variable = block.getField('VAR').getVariable();
    workspace.deleteVariableById(variable.getId());
    workspace.refreshToolboxSelection();
  };
};

Blockly.Extensions.registerMixin('contextMenu_variableDynamicSetterGetter',
    Blockly.Constants.VariablesDynamic.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);


// Check to verify a blocks setter is being used so block is correctly initiallized before use

Blockly.Extensions.register("check_for_setter", function() {
  // on change function so this check will happen every time a variables_get_dynamic block fires an event
  this.setOnChange(function(changeEvent) {
    var id = this.getFieldValue('VAR');
    var variableModel = this.workspace.getVariableById(id);
    if(variableModel !== null) {
      if (this.type === 'variables_get_dynamic') {
        this.outputConnection.setCheck(variableModel.type);
      } else {
        this.getInput('VALUE').connection.setCheck(variableModel.type);
      }
    }
    
    //get a list of all blocks in the workspace
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    // get the id of the variable we're checking for so we can match it to it's own setter
    var id = this.getFieldValue("VAR");
    // check if there are any setter variables in the list
    if(blocks.some(e => (e.type === "variables_set_dynamic") && (e.getFieldValue("VAR") === id))) {
      //itterate through the blocks in the workspace
      for(var i of blocks) {
        // if the block is the setter type for that variable
        if(i.type === "variables_set_dynamic") {
          // and if it is the right variable
          if(id === i.getFieldValue("VAR")) {
            // if the getter is lower than the setter, warn 
              if(this.getRelativeToSurfaceXY().y < i.getRelativeToSurfaceXY().y) {
                  this.setWarningText("You need to set variable first!");
              } else { // otherwise remove warning
                this.setWarningText(null);
                break;
              }
          }
        }
      }
    } else if ((this.getRootBlock().type === 'controls_forEach') &&(this.getRootBlock().getFieldValue("VAR") === id)) {
      this.setWarningText(null);
    } else if ((this.getRootBlock().type === 'controls_for') &&(this.getRootBlock().getFieldValue("VAR") === id)) {
      this.setWarningText(null);
    } else if ((this.getRootBlock().type === 'procedures_defnoreturn') &&(this.getRootBlock().getFieldValue("VAR") === id)) {
      this.setWarningText(null);
    } else if ((this.getRootBlock().type === 'procedures_defreturn') &&(this.getRootBlock().getFieldValue("VAR") === id)) {
      this.setWarningText(null);
    } else { // if there are no setters for the current variable, warn
      this.setWarningText("You need to set variable first!");
    }
  });

})


// check to verify a setter block is not attached to a getter of the same variable

Blockly.Extensions.register("check_setter_connection", function () {

  this.setOnChange(function(changeEvent) {
    // get variable id
    var id = this.getFieldValue('VAR');
    //code to re-set input type checking
    var variableModel = this.workspace.getVariableById(id);
    if (this.type === 'variables_get_dynamic') {
      this.outputConnection.setCheck(variableModel.type);
    } else {
      this.getInput('VALUE').connection.setCheck(variableModel.type);
    }
    var id  = this.getFieldValue("VAR");
    // get block attached to input
    var input = this.getInputTargetBlock("VALUE");
    // if the input is empty, or if the attached block matches the variable id warn
    if((input === null) || (id === input.getFieldValue("VAR"))) {
      this.setWarningText("You should assign this variable a valid value!");
    } else { // otherwise remove warning
      this.setWarningText(null);
    }

  });
  
})