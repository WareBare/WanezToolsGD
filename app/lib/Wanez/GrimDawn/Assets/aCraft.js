/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aCraft extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            itemClassification: `Quest`,
            dropSound: `records/sounds/items/spak_itemdropcraftingpart.dbr`,
            dropSound3D: `records/sounds/items/spak_itemdropcraftingpart.dbr`,
            dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`,
            itemCost: `100`,
            itemLevel: `1`,
            preventEasyDrops: `1`,
            mesh: `items/misc/bag01.msh`,
            scale: `1.0`,
            maxTransparency: `0.5`,
            actorRadius: `0.0`,
            actorHeight: `0.0`,
            outlineThickness: `0.035`,
            markerRange: `20.0`
        };
        
        this.fetchTemplate(`database/templates/questitem.tpl`);
        this.editDBR(this.opt);
    }
    
};
