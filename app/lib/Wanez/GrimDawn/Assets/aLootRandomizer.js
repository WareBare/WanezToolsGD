/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aLootRandomizer extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            lootRandomizerName: `tagWaDGA_PrefixAX`,
            lootRandomizerJitter: `30.0`,
            lootRandomizerCost: `300`,
            itemClassification: `Rare`,
            marketAdjustmentPercent: `50.0`,
            characterBaseAttackSpeedTag: `CharacterAttackSpeedAverage`
        };
        
        this.fetchTemplate(`database/templates/lootrandomizer.tpl`);
        this.editDBR(this.opt);
    }
    
};
