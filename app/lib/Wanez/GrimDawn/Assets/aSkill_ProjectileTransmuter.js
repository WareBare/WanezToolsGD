/**
 * Created by Ware on 11/4/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkill_ProjectileTransmuter extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            skillManaCost: [10.0,20.0],
            skillMaxLevel: `1`,
            skillUltimateLevel: `1`
        };
        
        this.fetchTemplate(`database/templates/skill_projectiletransmuter.tpl`);
        this.editDBR(this.opt);
    }
    
};
