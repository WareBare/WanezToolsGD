# Changelog #

## v0.0.3 ##
### Minor Features ###
* Auto-Updater checks periodically for new updates (10 sec interval)
* Auto-Updater will show a notification when it's ready to install
* Auto-Updater information/button has been moved to the bottom left
* Skill Tooltips have been changed
  * Info: isCircular
  * Info: hasConnectors
* Visual Changes
  * the currently selected skill now uses a shadow rather than changed border color (green)
  * skills with connectors now have a shadow (blue)
  * circular skills will now show up as circular

### Major Features ###
* Backup System for Mastery/UI
  * clicking the Button "Create Backup" will create a Backup data for the UI you are looking at (only files in records/ui/skills/[mastery])
  * this data is not saved inside a file, when you exit the program all Backups are lost

### Bug Fixes ###
* when you hover over a tooltip, it will now go away

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