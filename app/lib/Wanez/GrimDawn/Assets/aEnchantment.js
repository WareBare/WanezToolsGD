/**
 * Created by WareBare on 4/22/2017.
 *
 * bitmap: `wanez/items/runes/bitmaps/inscription_default.tex`,
 * description: `tagEmpty_description`,
 * itemText: `tagEmpty_Text`,
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aEnchantment extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            description: `tagEmpty_description`,
            itemText: `tagEmpty_Text`,
            levelRequirement: `100`,
            markerRange: `20.0`,
            maxTransparency: `0.5`,
            dropSound: `records/sounds/items/spak_itemdropcraftingpart.dbr`,
            dropSound3D: `records/sounds/items/spak_itemdropcraftingpart.dbr`,
            dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
        };
        
        this.fetchTemplate(`database/templates/itemenchantment.tpl`);
        this.editDBR(this.opt);
    }
    
};
