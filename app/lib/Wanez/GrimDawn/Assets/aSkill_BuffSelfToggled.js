/**
 * Created by Ware on 1/28/2018.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkill_BuffSelfToggled extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            charFxPakSelfNames: `records/fx/skillclass08/spectralarmor_loopchfxpak01.dbr`,
            distanceProfile: `Short`,
            skillActivatedSound: `records/sounds/skillsounds/class08/spak_spectralarmor_activate.dbr`,
            skillDeactivatedSound: `records/sounds/skillsounds/class08/spak_spectralarmor_deactivate.dbr`
        };
        
        this.fetchTemplate(`database/templates/skill_buffselftoggled.tpl`);
        this.editDBR(this.opt);
    }
    
};
