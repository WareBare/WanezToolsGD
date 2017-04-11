# WanezToolsGD #
Unofficial addition to the official Grim Dawn - Modding Tools (DBR-Editor and Tag Editing).

These tools will not replace the official Modding Tools from Crate, but they make certain tasks easier and less tedious.

## General ##
The Main focus currently is on the Mastery Editor, but more features will follow. Any kind of feedback is appreciated.
This is an unsigned .exe (installer) and may trigger some firewalls and anti-virus software because of it.

## Mastery Tools ##
### Auto-Updater ###
* the tool will automatically look for new Updates, you don't have to stalk GitHub or the Forums to find out about a new release
* currently it is set to check every 10 seconds
* Settings will be added at a later time

### Mastery Selection ###
#### Setup ####
* `todo` Pick the masteries and slots/enumeration you want in your Mod

#### UI ####
* `todo` a function allows you to adjust button positions into a grid
* save changes with the button on the right "Save Selection"
* buttons can be moved by dragging them to the desired location, using the fields at the top or with a double-click feature

![Full Example (gif made using Grim Quest Source)](http://wanez.de/misc/selection_full-v0.0.5.gif "Full Example (gif made using Grim Quest Source)")

* Buttons can be place above or below of another by double-clicking the button, double-clicking the button above and than double-click the button to move below the one you started with.

![Double Click Example (gif made using Grim Quest Source)](http://wanez.de/misc/WanezToolsGD-v0.0.5_MasterySelection_dblclick.gif "Double Click Example (gif made using Grim Quest Source)")

### Skill-UI ###
#### UI ####
* Skill Icons can be shown if they are .tga or .png
* Use Drag & Drop to move skills around
  * changes to the coords are made immediately
  * Skill Tiers are changed respectively
* Create Transmuters and/or Modifiers
  * click the "parent" skill
  * use the button "Set Connector"
  * now click on the skill you want as a modifier for your "parent" skill
* To remove connections just use the button "del. Connectors"
* to save all data into the skilltree and ui classtable use the button "Save DBR"

#### Edit Skill ####
* double-click a skill on the Skill-UI to edit it (or use the button on the right)
* Pet Editing
  * Edit Pet Tag (Tags)
  * Edit spawnObjects (Files)
  * create pet file if file in spawnObjects doesn't exist (it will use the file from the previous level - this will require at least 1 pet file)
  * skill name/level can be changed from inside the program
  * fields can be hidden to avoid cluttering the screen with every skill a pet has (and makes editing wanted skills easier)
  * `todo` mass editing/adding of skills

## License and Credits ##
* the program is using Electron (Node.js + Chromium)
  * modules used are under the MIT License
* the following files have not been written by me, information can be found inside the files
  * app/lib/moment.js
  * app/lib/tga.js
* I used Grim Quest source to make the tool
  * Special Thanks to ASYLUM101 for testing the program and providing feedback and ideas to improve the tool