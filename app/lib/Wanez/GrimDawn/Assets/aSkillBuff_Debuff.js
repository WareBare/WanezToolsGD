/**
 * Created by Ware on 1/28/2018.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkillBuff_Debuff extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            charFxPakOtherNames: `records/fx/skillclass08/spectralwrath_chfxpak01.dbr`,
            debufSkill: "1",
            distanceProfile: `Long`,
            targetingMode: `Point`
        };
        
        this.fetchTemplate(`database/templates/skillbuff_debuf.tpl`);
        this.editDBR(this.opt);
    }
    
};
