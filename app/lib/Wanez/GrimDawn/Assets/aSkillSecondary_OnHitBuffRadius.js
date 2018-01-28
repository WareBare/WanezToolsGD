/**
 * Created by Ware on 1/28/2018.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkillSecondary_OnHitBuffRadius extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            onHitActivationChance: `100.000000`,
            debuff: `1`
        };
        
        this.fetchTemplate(`database/templates/skillsecondary_onhitbuffradius.tpl`);
        this.editDBR(this.opt);
    }
    
};
