/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aLootRandomizerTable extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
        
        };
        
        this.fetchTemplate(`database/templates/lootrandomizertabledynamic.tpl`);
        //this.editDBR(this.opt);
    }
    
};
