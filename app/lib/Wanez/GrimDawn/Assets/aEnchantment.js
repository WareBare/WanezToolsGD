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
            dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`,
            amulet: `0`,
            bracelet: `0`,
            ring: `0`,
            medal: `0`,
            head: `0`,
            shoulders: `0`,
            hands: `0`,
            chest: `0`,
            waist: `0`,
            legs: `0`,
            feet: `0`,
            shield: `0`,
            offhand: `0`,
            spear: `0`,
            staff: `0`,
            axe: `0`,
            mace: `0`,
            sword: `0`,
            dagger: `0`,
            scepter: `0`,
            ranged1h: `0`,
            ranged2h: `0`,
            axe2h: `0`,
            mace2h: `0`,
            sword2h: `0`
        };
        
        this.fetchTemplate(`database/templates/itemenchantment.tpl`);
        this.editDBR(this.opt);
    }
    
};
