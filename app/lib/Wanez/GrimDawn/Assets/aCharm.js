/**
 * Created by WareBare on 4/22/2017.
 *
 *
 * shardBitmap: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
 * relicBitmap: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aCharm extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            completedRelicLevel: `1`,
            bonusTableName: `records/items/lootaffixes/completion/completionbonus_a001_armor.dbr`,
            relicToRelicSound: `records/sounds/items/spak_itemcraftingpartcombine.dbr`,
            relicCompleteSound: `records/sounds/items/spak_itemcraftingpartcompletion.dbr`,
            relicToItemSound: `records/sounds/items/spak_itemcraftingpartattach.dbr`,
            itemClassification: `Common`,
            dropSound: `records/sounds/items/spak_itemdropcraftingpart.dbr`,
            dropSound3D: `records/sounds/items/spak_itemdropcraftingpart.dbr`,
            dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`,
            itemOverlayBitmapPartial: ``,
            itemCost: `100`,
            itemLevel: `1`,
            levelRequirement: `1`,
            mesh: `items/misc/bag01.msh`,
            scale: `1.0`,
            actorRadius: `10.0`,
            actorHeight: `0.5`,
            maxTransparency: `0.5`,
            physicsMass: `1.0`,
            physicsFriction: `1.0`,
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
        
        this.fetchTemplate(`database/templates/itemcharm.tpl`);
        this.editDBR(this.opt);
    }
    
};
