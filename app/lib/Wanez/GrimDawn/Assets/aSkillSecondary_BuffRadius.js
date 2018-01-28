/**
 * Created by Ware on 1/28/2018.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkillSecondary_BuffRadius extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
        
        };
        
        this.fetchTemplate(`database/templates/skillsecondary_buffradius.tpl`);
        this.editDBR(this.opt);
    }
    
};
