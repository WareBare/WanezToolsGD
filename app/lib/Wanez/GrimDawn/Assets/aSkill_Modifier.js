/**
 * Created by WareBare on 5/1/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkill_BuffOther extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            skillManaCost: [2.0,3.0],
            skillMaxLevel: `12`,
            skillUltimateLevel: `22`
        };
        
        this.fetchTemplate(`database/templates/skill_modifier.tpl`);
        this.editDBR(this.opt);
    }
    
};
