/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aPotion extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            itemCost: `100`,
            useDelayTime: `1`,
            dropSound: `records/sounds/objects/loot/spak_itemdroppotion.dbr`,
            dropSound3D: `records/sounds/objects/loot/spak_itemdroppotion.dbr`,
            itemLevel: `1`,
            maxStackSize: `999`,
            mesh: `items/misc/consumableb_yellow.msh`,
            scale: `1`,
            actorRadius: `0.5`,
            actorHeight: `1`,
            maxTransparency: `0.5`,
            castsShadows: `1`
        };
        
        this.fetchTemplate(`database/templates/oneshot_potionmana.tpl`);
        this.editDBR(this.opt);
    }
    
};
