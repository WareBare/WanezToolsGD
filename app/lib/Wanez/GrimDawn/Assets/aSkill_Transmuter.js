/**
 * Created by WareBare on 5/1/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkill_Transmuter extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            skillManaCost: [10.0,20.0],
            skillMaxLevel: `1`,
            skillUltimateLevel: `1`
        };
        
        this.fetchTemplate(`database/templates/skill_transmuter.tpl`);
        this.editDBR(this.opt);
    }
    
};
