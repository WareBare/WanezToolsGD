/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aLore extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            noteBitmap: `items/misc/parchment01.tex`,
            noteWidth: `450`,
            experienceBonus: `10000`,
            itemClassification: `Common`,
            dropSound: `records/sounds/items/spak_itemdropgeneric.dbr`,
            dropSound3D: `records/sounds/items/spak_itemdropgeneric.dbr`,
            dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`,
            itemCost: `100`,
            itemLevel: `1`,
            cannotPickUpMultiple: `0`,
            cannotPickUp: `0`,
            mesh: `items/misc/loreobj_journal01.msh`,
            scale: `1.5`,
            actorRadius: `0.5`,
            actorHeight: `0.5`,
            maxTransparency: `0.5`,
            castsShadows: `1`,
            quest: `0`
        };
        
        this.fetchTemplate(`database/templates/itemnote.tpl`);
        this.editDBR(this.opt);
    }
    
};
