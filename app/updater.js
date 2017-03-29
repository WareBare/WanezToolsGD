/**
 * Created by WareBare on 3/28/2017.
 */

//const app = require('electron').remote.app; //require('electron-auto-updater');
const updater = require('electron').remote.require('electron-auto-updater');

//console.log("current version: " + app.getVersion());

updater.autoUpdater.checkForUpdates();
updater.autoUpdater.addListener("update-available", function (event) {
    document.getElementById(`installUpdate`).innerHTML = "Downloading...";
    document.getElementById(`installUpdate`).className = "downloading";
});

updater.autoUpdater.addListener("update-not-available", function () {});

/**
 * releaseNotes
 * releaseName
 * releaseDate
 * updateURL
 */
updater.autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    document.getElementById(`installUpdate`).innerHTML = "Install Update";
    document.getElementById(`installUpdate`).className = "available";
    document.getElementById(`installUpdate`).style.cursor = "pointer";
    document.getElementById(`installUpdate`).onclick = function(){
        updater.autoUpdater.quitAndInstall();
    };
    
    return true;
});
updater.autoUpdater.addListener("error", (error) => {
    //console.log(error);
});
updater.autoUpdater.addListener("checking-for-update", (event) => {});

installUpdate = function(){
    updater.autoUpdater.quitAndInstall();
};
