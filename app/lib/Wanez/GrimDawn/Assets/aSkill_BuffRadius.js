/**
 * Created by Ware on 1/21/2018.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */


module.exports = class aSkill_BuffRadius extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            'instantCast': 1
        };
        
        this.fetchTemplate(`database/templates/skill_buffradius.tpl`);
        this.editDBR(this.opt);
    }
    
};