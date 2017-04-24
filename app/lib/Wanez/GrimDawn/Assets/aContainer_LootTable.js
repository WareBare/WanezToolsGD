/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aContainer_LootTable extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {};
        
        this.fetchTemplate(`database/templates/fixeditemloot.tpl`);
        //this.editDBR(this.opt);
    }
    
};
