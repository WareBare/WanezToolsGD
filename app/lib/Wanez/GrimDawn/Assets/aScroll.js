/**
 * Created by WareBare on 4/22/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aScroll extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
    
        this.opt = {
            skillName: `mod_wanez/scroll/item_skill.dbr`,
            usesSharedCooldown: `0`,
            actorRadius: `1.0`,
            actorHeight: `0.5`,
            physicsFriction: `5`,
            mapNuggetType: `None`,
            collisionShape: `Sphere`,
            levelRequirement: `1`,
            useSound: `records/sounds/objects/loot/spak_itemusepotion.dbr`,
            bitmap: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
            bitmapButtonUp: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
            bitmapButtonDown: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
            itemClassification: `Common`,
            dropSound: `records/sounds/objects/loot/spak_itemdroppotion.dbr`,
            dropSound3D: `records/sounds/objects/loot/spak_itemdroppotion.dbr`,
            dropSoundWater: `records/sounds/objects/loot/spak_itemdroppotion.dbr`,
            itemCost: `100`,
            itemLevel: `1`,
            maxStackSize: `1`,
            mesh: `items/misc/bottle02.msh`
        };
        
        this.fetchTemplate(`database/templates/oneshot_scroll.tpl`);
        this.editDBR(this.opt);
    }
    
};
