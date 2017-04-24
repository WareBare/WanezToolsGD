/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cAffixTable extends libWZ.GrimDawn.cData{
    
    constructor($relPath,$ini,$isRare){
        //super(wzAssets.newLootRandomizerTable,false,$ini);
        super();
    
        this.aData = new libWZ.GrimDawn.Assets.aLootRandomizerTable().getData();
        
        this.editDBR($ini);
        
        this.pathRelativ = $relPath;
        this.tableIsRare = $isRare;
        
        this.changeFilePath(`${this.fn.getPaths().Mod}/${$relPath}`);
    }
    
    /**
     *
     * @param {boolean} $isString this.tableIsRare
     * @return {string|boolean} (if $isString === true then return "rare"||"normal")
     */
    getTableRarity($isString = false){
        let ret = this.tableIsRare;
        if($isString){
            ret = (ret) ? "rare" : "normal";
        }
        return ret;
    }
    
    getTableName(){
        return this.pathRelativ;
    }
    
};
