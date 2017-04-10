# Changelog #

## v0.0.5 ##

### Edit Skill ###
* Edit Skill has been moved into a new window rather than changing the content
* double click will open a new window to edit the skill
* Pet Editing
  * a field to edit pet tags has been added (Tags)
  * a field to add spawnObjects has been added (Files)
  * create pet file if file in spawnObjects doesn't exist (it will use the file from the previous level - this will require at least 1 pet file)
  * skill name/level can be changed from inside the program
  * fields can be hidden to avoid cluttering the screen with every skill the pet has (and makes editing wanted skills easier)

### Major Features ###
* lists to pick a skill will no longer show skills used by another file
  * in addition some directories are being ignored (backup, bak, copy, New Folder)
  * and files starting with "copy " are being ignored
* Mastery Selection Window can be edited with the program

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