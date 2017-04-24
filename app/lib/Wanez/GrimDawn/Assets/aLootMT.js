/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aLootMT extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
        
        };
        
        this.fetchTemplate(`database/templates/lootitemtable_dynweighted_dynaffix.tpl`);
        //this.editDBR(this.opt);
    }
    
};
