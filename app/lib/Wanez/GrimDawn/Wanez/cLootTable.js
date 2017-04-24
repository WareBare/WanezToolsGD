/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cLootTable extends libWZ.GrimDawn.cData{
    
    constructor($itemData,$affixData,$params,$fileData){
        //super(wzAssets.newDynLootItemTable,new libWZ.GrimDawn.Parser.cDBR());
        super();
    
        this.aData = new libWZ.GrimDawn.Assets.aLootTdyn().getData();
        
        this.iParams = $params;
        this.iParams.TIER = (`0${this.iParams.TIER}`).slice(-2); // this.parseIntToString(this.iParams.TIER,1)
        this.iItemData = $itemData;
        this.iAffixData = $affixData;
        this.iFileData = $fileData;
        
        this.iniLootTable();
    }
    
    iniLootTable(){
        let aData = Object.assign({},this.iItemData,this.iAffixData);
        
        this.genFileName();
        this.editDBR(aData);
        //return aData;
    }
    
    genFileName(){
        let filePath = this.iFileData.path,
            fileName = this.iFileData.tpl.wzOut(this.iParams),
            tableFile = (filePath+fileName+'.dbr').toLowerCase();
        
        this.tableFile = tableFile;
        
        this.changeFilePath(`${this.fn.getPaths().Mod}/${tableFile}`);
    }
    
    getTableFileName(){
        return this.tableFile;
    }
    
};
