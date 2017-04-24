/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aContainer_Destructible extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            life: `1`,
            maxLife: `1`,
            rubbleLife: `0.01`,
            rubbleFade: `0.001`,
            breakSound: `records/sounds/items/spak_itemglassbreak.dbr`,
            breakEffects:`records/fx/general/lootorbexplosionfx01.dbr`,
            breakEffectAttachpoints:`FX`,
            targetable:`1`,
            playerOnly:`1`,
            lootClassification:`Common`,
            lootChance:`100`,
            decorationSound2Chance:`100.0`,
            decorationSound1Chance:`100.0`,
            decorationSound3Chance:`100.0`,
            decorationSound4Chance:`100.0`,
            scale:`1.0`,
            actorRadius:`0.3`,
            actorHeight:`1.0`,
            maxTransparency:`0.5`,
            castsShadows:`1`,
            outlineThickness:`0.035`,
            physicsMass:`1.0`,
            physicsFriction:`1.0`,
            goldGeneratorChance:`100.0`,
            goldGenerator:`records/items/lootchests/chestloottables/c03_moneygenerator_hero.dbr`
        };
        
        this.fetchTemplate(`database/templates/destructible.tpl`);
        this.editDBR(this.opt);
    }
    
};
