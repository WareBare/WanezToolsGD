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

### Mastery Wizard ###
* create a new mastery
* templates are parsed and used to create the required files
* base values can be set per level - Cunning 2 will result in 100 at level 50 (no need to enter every value per hand, the tool is going to do it)
  * ![Step 2](http://wanez.de/misc/WanezToolsGD-v0.1.2_MasteryWizard_step02.png "Step 2")

### Mastery Selection ###
#### Setup ####
* you can edit Mastery Tags and Mastery Combination Tags
  * ![Mastery Edit - Tags](http://wanez.de/misc/WanezToolsGD-v0.1.2_Mastery_tags.png "Mastery Edit - Tags")
* `todo` Pick the masteries and slots/enumeration you want in your Mod (Mastery Merger)

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
  * change Item stats with for all available skill levels just by changing a few base values
    * ![Skill - Edit Properties](http://wanez.de/misc/WanezToolsGD-v0.1.2_SkillEdit_properties.gif "Skill - Edit Properties")
  * `todo` mass editing/adding of skills

## Item Tools ##
* First stage of item editing starts with Materia/Components.

### Materia/Components ###
* Vanilla path is checked in your mod folder and than in the extracted game files.
* if you are changing a vanilla file, it is copied over to your mod's directory with the change you made.
* `todo` tag adjustments depending on Qualifier changes.

## Other Tools ##
### BBCode ###
* Markdown to BBCode Converter.
* While this was something I made for myself I'm leaving it in the Tool for everyone to use.
* Markdown is easy to get into and easy to write texts with different headers and lists.
* write Markdown on the left and see the converted text in Forum BBCode on the right.
* change the colors of headers.
* change font style of headers.
* the button "Copy BBCode" will copy the contents for the forum to the clipboard and you can just paste it in a new post on the forums.
* you can save the text by using the button "Save MD" and update it with "Update MD".
  * when you are changing the title and use "Save MD" a new entry is created with the text, using "Update MD" will override the old entry with the new title.
  * you may also delete entries with the "Delete MD" button, but unlike the other two, this will ignore the title.
  * changes are saved automatically, you don't really need the button "Update MD" unless you want to change the title or save the color/font changes.
* you can start a new text simply by changing the title and using the "Save MD" to create a new entry, after that just delete the contents and write your new text. (if you remove the text first, it will overwrite the old one - deleting your work)
  * a nice sideeffect is you will save your settings and colors/font styles will apply to your new text.
  * only changing the title without saving it will still overwrite the old text under the old title, because changes to a title need to be submitted first.


## License and Credits ##
* the program is using Electron (Node.js + Chromium)
  * modules used are under the MIT License
* the following files have not been written by me, information can be found inside the files
  * app/lib/moment.js
  * app/lib/tga.js
* I used Grim Quest source to make the tool
  * Special Thanks to ASYLUM101 for testing the program and providing feedback and ideas to improve the tool