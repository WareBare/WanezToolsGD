/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aPetBonus extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            characterBaseAttackSpeedTag: `CharacterAttackSpeedAverage`
        };
        
        this.fetchTemplate(`database/templates/petbonus.tpl`);
        this.editDBR(this.opt);
    }
    
};
