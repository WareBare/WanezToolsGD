/**
 * Created by Ware on 12/1/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSetBonus extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {};
        
        this.fetchTemplate(`database/templates/itemset.tpl`);
        this.editDBR(this.opt);
    }
    
};
