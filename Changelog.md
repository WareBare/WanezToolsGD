# Changelog #

## v0.0.3 ##
### Minor Features ###
* Auto-Updater checks periodically for new updates (10 sec interval)
* Auto-Updater will show a notification when it's ready to install
* Auto-Updater information/button has been moved to the bottom left

### Bug Fixes ###

## v0.0.2 ##
### Bug Fixes ###


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