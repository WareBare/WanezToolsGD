/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cContainer extends libWZ.GrimDawn.cData{
    
    constructor($assetType,$data,$name,$path,$pathLT,$ini){
        
        $ini = $ini || {};
        
        let aStyles = {
            'HeroOrb': {
                'brokenMesh': `items/chests/chestsphere02.msh`,
                'baseTexture': `items/chests/chestsphere02_dif.tex`,
                'mesh': `items/chests/chestsphere02.msh`
            },
            'RareChest': {
                'mesh': `items/chests/chest01_woodb.msh`
            },
            'LoreChest001': {
                'mesh': `level art/furniture/lectern_loreobj01.msh`
            }
        };
        
        $ini = Object.assign($ini,aStyles[$data[$name].style]);
        /*
         switch ($data[$name].style){
         case 'HeroOrb':
         $ini = Object.assign($ini,{
         'brokenMesh': `items/chests/chestsphere02.msh`,
         'baseTexture': `items/chests/chestsphere02_dif.tex`,
         'mesh': `items/chests/chestsphere02.msh`
         });
         break;
         default:
         break;
         }
         */
        
        //super(wzAssets.newContainer[$assetType],new libWZ.GrimDawn.Parser.cDBR(),$ini); // ,$ini
        super();
        this.aData = new libWZ.GrimDawn.Assets[`aContainer_${$assetType}`]().getData();
        this.editDBR($ini);
        
        this.iData = $data[$name];
        //this.iName = $name;
        this.iFilePath = `${$path}/${$name}.dbr`;
        this.iLootTables = this.genLootTables($pathLT,this.iData.lootTable);
        
        this.genTag(this.iData.dbr.description,this.iData.tagName);
        
        this.iniContainer();
        this.changeFilePath(`${this.fn.getPaths().Mod}/${this.iFilePath}`);
        
    }
    
    iniContainer(){
        let tempDBR = this.iData.dbr;
        
        if(this.iLootTables) tempDBR.lootTable = this.iLootTables;
        if(this.iData.perPartyMemberDropItemName) tempDBR.perPartyMemberDropItemName = this.iData.perPartyMemberDropItemName;
        
        this.editDBR(tempDBR);
    }
    
    genLootTables($pathLT,aLootTable){
        if(!aLootTable) return false;
        if(!Array.isArray(aLootTable)) aLootTable = [aLootTable];
        
        let aLootTables = [];
        
        for(let $_Index in aLootTable){
            aLootTables.push(`${$pathLT}/${aLootTable[$_Index]}.dbr`);
        }
        
        return aLootTables;
    }
    
    
};
