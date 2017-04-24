/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkillBuff_passive extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            skillMaxLevel: `100`
        };
        
        this.fetchTemplate(`database/templates/skillbuff_passive.tpl`);
        this.editDBR(this.opt);
    }
    
};
