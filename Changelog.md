# Changelog #

## v0.2.3 ##
### Mastery Tools ###
#### Selection (Merging) ####
* a new button "Set Enum" checks file references inside the malepc01.dbr to get to the skilltree and skilltraining files, changing the field MasteryEnumeration (in skilltraining.dbr) to the Enum of the skillTree entry.

### Materia ###
* you can now remove partial components with the use of a button
  * this will remove all partials and use the value at the position the completed component would use (most of the time the last value in the array)
  * components inside the Materia folder are being parsed (modded components first than vanilla if there is no modded component for it)
  * all components are listed inside the content panel, if it is empty there is an error with your paths

## v0.2.2 ##
### Mastery Tools ###
#### Mastery Selection ####
* Arrow keys can be used to move buttons.
* Added offset Fields.
  * this will add the number in the field for the final calculation to show in game
  * adding an offset will move the buttons inside the tool accordingly (if you are loading your current selection and it is not the same in the tool you can change the offset fields to make them fit without changing your in game set up, any changes inside the tool will use the offset to adjust the differences)

#### Skill Edit ####
* Pet files will now be created when you open "Pet Properties", click on it again to refresh the content.
  * this function will create all files up to ultimate level if they do not exist and adjust skill level 1 to the pet level (if you want a skill to remain at lvl 1 you have to change it back to 1)

### General ###
#### Log ####
* added a log, you can find at "%USERPROFILE%\AppData\Roaming\<app name>\log.log"

#### Bug Fixes ####
* Fixed various issues with `buff/pet files`.
* Various issues with data handling have been fixed.

## v0.2.1 ##
### Mastery Tools ###
#### Skill Edit ####
* Added `weaponDamagePct` to the list, however this is added to the list - unlike all other fields which the Program gets by parsing templates.
* Removed `targetMode` from the _Show Property_ selection.
* Adding a new field will select that new Field to change its Values (it kept the field you were editing before).

### Bug Fixes ###
* Fixed various issues with `buff/pet files`.

## v0.2.0 ##
### Minor Features ###
* data storage has been changed for *.dbr, *.txt. The program will check if the file has been updated and edit data after reloading the newer file. (this change is not finished for all Mastery Tools, only Skill Allocation Files and Skill Tags have this change, just keep this in mind when you are using the Mastery-Setup features).
* Default Connector can now be set by pressing Alt (previous ways are still possible, too - Alt+C or the Button).

### Mastery Tools ###
* Mastery/UI renamed to Mastery/Skill Allocation.
  * opening the Skill Edit - Window will now throw you back to UI if other options are unavailable.
* You may now create a new Modifier, Transmuter or Passive file from "Skill - Edit UI".
  * this will set some default fields, such as the Path to Icon.tex (Icon Path from Settings + mastery folder name (eg playerclass01) + /skillicon_ + FileDescription + _[suffix].tex)
* skillTier is generated when you open the Skill - Edit UI (Window) in addition to moving the skills around. This will prevent bugs with newly created skills and attaching a Skill to an already placed Skill Icon.
* Skill - Edit Properties now has a list field where you can pick a new Property from, if you click in it and start typing it will bring you closer to the entry you want (you have to be rather quick or it will start again at the first letter)
  * when you are done just click somewhere else or use "Enter".
* I also added a "Delete" Button to the calculation form (next to Save) which will clear the field (values are still saved locally, in case you misclicked - your old data is still inside the Program).
* Mastery/Selection renamed to Mastery/Setup.
  * Setup renamed to Config.
  * the button to save Selection changes will now only appear while the Selection content is open.
* You are now able to edit a Mastery's Properties the same way you can with the Mastery Wizard - by using a new Button that only appears while you are in the Config Area and have a Mastery selected (Button: "Edit Mastery").
  * The Values used are calculated by using the highest value and divide it by the number of entries (this is more or less a guess)
  * changing a value will save the value directly
  * this feature is using the malepc01.dbr to get to the SkillTree.dbr and uses skillName1 to get the ClassTraining.dbr
  * this is the first step towards a Mastery-Merger
* added skillTier to the Tooltip, if it shows a ?, it means there is no Skill File attached.

### Materia/Component Tools ###
* currently only files to the vanilla path are parsed.
* files that don't exist in the mod folder will be created if any changes are made.
* tags are currently not supported (they need to be edited manually.

### Markdown to BBCode ###
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
* You can use _ (Underscore) to change the font style to _italic_(x1), __bold__(x2) or ___underline___(x3), the text you want to change needs to start with _ (underscore) followed by a non-whitespace character and end with a non-whitespace character followed by another _ (underscore).
* ` can be used to change the appearance of your text - however, it requires at least a space before and after.
  * ` `can be used to change the color`
  * `` ``can be used for spoiler2`` - will be displayed black in the editor.

### WanezMod Tools ###
* tools to change the generated parts of my mod (DGA, etc).
* the menu buttons are removed, if you want to use them you need a .json file from me anyways, when I send you the files I'll tell you what to do to access the tools (future updates will check if the files exist and show the respective menu items, but I need to overhaul the menu class for that).
* but due to me trying to be transparent about what is added and a bunch of new files appeard on github, I figured I should mention it here. You won't see or feel a difference though, data is only loaded when needed.

### Bug Fixes ###
* "Skill Edit": fixed a bug where the window wouldn't refresh its data properly when changing the file reference in the UI File.
* "Skill Edit": all other fields are greyed out if you don't have a Skill File attached to the UI File.
* Settings will refresh data for "Skill Allocation". This makes a difference for first time setup and changing Tag Files/Active Mod.

## v0.1.3 ##
### PFX ###
* you can now copy *.pfx to your mod's source with the click of a button
* this will require additional settings in "Grim Dawn 2"
  * `Mastery PFX Source Folder` - is the name of the folder inside the Grim Dawn installation source folder (/Grim Dawn/source/)
  * `Path to Mastery PFX Folder` - is the path inside the Working Directory's Source Directory (/mods/myMod/source/)
  * once those fields are filled out and you have Mastery selected in Mastery/UI the button will appear, the UI folder name for the Mastery is used, so the total Path ends up being:
    * /Grim Dawn/source/[my/pfx/source/path]/[uifolder]
    * /mods/myMod/source/[my/pfx/target/path]/[uifolder]

### Bug Fixes ###
* fixed an issue with tag files where empty tags would be removed
* fixed a bug for paths to custom mastery directories

## v0.1.2 ##
### Mastery Wizard ###
* allows you to create a new Mastery with all files required
* it will use Enumeration and a Folder name to determine Paths and Tags used by the Mastery
* made a guide in Docs/Wiki, more information can be found there

### Mastery Setup ###
* the Button for Setup in Mastery Selection just entered phase 1 of it's development
* you can edit tags for Masteries
* you can edit tags for Mastery Combinations
* tags will follow Crate's Naming Convention
  * tagSkillClassNameXX is used for Combinations - the two Tags to display the two Masteries

### Skill - Edit Properties ###
* used fields with an array will show (if offensiveChaosMin is not empty and has at least 2 values set it will show up)
* you may now edit a skills properties, by using just a few values
  * used values are saved in case you want to quickly rebalance something later
* the field's values are used to calculate the numbers for the Ultimate Skill Level + 10 (in case you change the Ultimate level you have some room and don't have to change the stats again)
* the wiki page (inside the Program) will give you more information

### Minor Features ###
* added support for custom paths [optional]
  * Mastery UI Files
  * Mastery Skills
  * Mastery Source
* you can now create a "New UI File" this will create a new skillbutton file inside the UI folder with the name skillXX.dbr the number is calculated by the number of files in that folder, this will cause issues if you have files that skipped a number (skill01, skill02, skill04 - skill03 is missing - the new file would be skill04 and overwrite the old skill04)

### Bug Fixes ###
* fixed a bug caused by trying to load missing files and images
* fixed a bug with isCircular, where button images would remain unchanged

---

## v0.1.1 ##
### Skill Connectors ###
* First set of Custom Connectors has been added (<a href="http://www.grimdawn.com/forums/showthread.php?p=500973#post500973" target="_blank">see post</a>)
* added Shortcuts to achieve this, also added Shortcuts for the default Connectors (Set/Remove), they can be seen in Settings/Shortcuts

### Bug Fixes ###
* Fixed a bug that was causing the Skill Tree to only have the path without the filename (if you still have the UI changes, just use the Save UI button again and it will fix it)

## v0.1.0 ##
### Minor Features ###
* added .png support for Skill Icons
* added Color Codes overview to edit-tags panel

### Bug Fixes ###
* fixed a bug where you were unable to set transmuters to a skill below (up was fine, down didn't work)

## v0.0.5 ##

### Edit Skill ###
* Edit Skill has been moved into a new window rather than changing the content
* double click will open a new window to edit the skill
* lists to pick a file will no longer show skills used by another file
  * in addition some directories are being ignored (backup, bak, copy, New Folder)
  * and files starting with "copy " are being ignored
* Pet Editing
  * a field to edit pet tags has been added (Tags)
  * a field to add spawnObjects has been added (Files)
  * create pet file if file in spawnObjects doesn't exist (it will use the file from the previous level - this will require at least 1 pet file)
  * skill name/level can be changed from inside the program
  * fields can be hidden to avoid cluttering the screen with every skill the pet has (and makes editing wanted skills easier)

### Mastery Selection ###
* Background image will be loaded if one exists, otherwise the default window is loaded (.tga and .png are supported, though .tga takes a little longer to load)
  * same applies to Button images
* Texts are loaded but not used, except for tags (requires a classes.txt)
* UI
  * as usual tags are loaded to display Mastery Name
  * Text Size/positioning inside the program does not reflect in-game size/positioning
    * however, text coords are adjusted as buttons are
  * Move Buttons around
  * Buttons can be place above or below of another by double-clicking the button, double-clicking the button above and than double-click the button to move below the one you started with.
  * without using the "Save Selection" Button nothing is written in the .dbr
  * using the Reload button will load all data from the .dbr again (resetting unsaved positions)

## v0.0.4 ##
Tag Files need to be re-set in Settings, they are now in a list with file extension, in other words old entries cannot be loaded.

### Minor Features ###
* Transmuter Slots have a purplish border
* added the first slot to "Transmuter Lines/Rows"
* Tag Files now retain their formatting (empty lines/comments)

### Major Features ###
* errors while loading a file will not cause the program to stop working as it did before, it will show a notification at the top with the full path.
* Backup System will now save all UI Information
  * Connectors
  * skillTier
  * X & Y Coords
  * SkillTree and ClassTable requires the use of the "Save UI" Button

### Windows, Notifications, Dialogs ###
* New stuff for better usability and to let the user know what's going on
* Program Notifications will show at the top and disappear after 2 seconds
* Settings are now inside a new window with real-time editing (data is saved after entry)

### Bug Fixes ###
* Connectors now show on "Transmuter Lines/Rows"
* fixed a bug where adding a transmuter to a skill that already has a transmuter would fail
* various fixes to loading files and saving files
* various visual fixes to connectors
* various fixes to the Backup System

## v0.0.3 ##
### Minor Features ###
* Auto-Updater:
  * checks periodically for new updates (10 sec interval).
  * will show a notification when it's ready to install.
  * information/button has been moved to the bottom left.
* Skill Tooltips have been changed
  * Info: isCircular.
  * Info: hasConnectors.
* Visual Changes
  * the currently selected skill now uses a shadow rather than changed border color (green).
  * skills with connectors now have a shadow (blue).
  * circular skills will now show up as circular.

### Major Features ###
* Backup System for Mastery/UI
  * clicking the Button "Create Backup" will create a Backup data for the UI you are looking at (only files in records/ui/skills/[mastery]).
  * this data is not saved inside a file, when you exit the program all Backups are lost.

### Bug Fixes ###
* when you hover over a tooltip, it will now go away.

## v0.0.2 ##
### Bug Fixes ###
* classtree skillLevel will now add 0 to every level as intended
* modifying skillName in an UI file would crash the tool if the file didn't have an Icon specified

## v0.0.1 ##
### Edit Skill ###
* added Skill Description Tag support
* added skillName field, this allows you to add a skill to the UI files
  * it will parse /records/skills/[mastery] without subdirectories
* changed fields to be more fitting
* event Handler changed to onchange (from onblur) to prevent saving an unchanged file

### Bug Fixes ###
* fixed a bug where you could not select a skill
* tag formatting has been fixed