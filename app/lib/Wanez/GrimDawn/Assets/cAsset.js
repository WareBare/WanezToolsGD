/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cAsset extends libWZ.GrimDawn.cData{
    
    constructor($saveFilePath){
        super();
        
        if($saveFilePath) this.changeFilePath(`${this.fn.getPaths().Mod}/${$saveFilePath}`);
    }
    
};
