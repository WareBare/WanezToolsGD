/**
 * Created by Ware on 11/4/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkill_ProjectileModifier extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            skillManaCost: [2.0,3.0],
            skillMaxLevel: `12`,
            skillUltimateLevel: `22`
        };
        
        this.fetchTemplate(`database/templates/skill_projectilemodifier.tpl`);
        this.editDBR(this.opt);
    }
    
};
