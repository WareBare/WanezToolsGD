# WanezToolsGD #
Unofficial addition to the Modding Tools For GrimDawn.

These tools will not replace the official Modding Tools from Crate, but they make certain tasks easier.

## General ##
The Main focus currently is on the Mastery Editor, but more features will follow. Any kind of feedback is appreciated.
Because it is an unsigned .exe (installer) it may trigger some firewalls and anti-virus software.

## Mastery Tools ##
### Auto-Updater ###
* the tool will automatically look for new Updates, you don't have to stalk GitHub or the Forums to find out about a new release
* currently it is set to check every 10 seconds
* Settings will be added at a later time

### UI ###
* Skill Icons can be shown if they are .tga
* Use Drag & Drop to move skills around
  * changes to the coords are made immediately
  * Skill Tiers are changed respectively
* Create transmuters and/or modifiers
  * click the "parent" skill
  * use the button "Set Connector"
  * now click on the skill you want as a modifier for your "parent" skill
* To remove connections just use the button "del. Connectors"
* to save all data into the skilltree and ui classtable use the button "Save DBR"

## License and Credits ##
* the program is using Electron (Node.js + Chromium)
  * modules used are under the MIT License
* the following files have not been written by me, information can be found inside the files
  * app/lib/moment.js
  * app/lib/tga.js