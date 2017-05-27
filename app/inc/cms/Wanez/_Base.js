/**
 * Created by WareBare on 4/21/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    _tagsDGA: wzStorageGD.load(`Text_EN/modtags_wanezGen-dga.txt`,{parser: `Tags`}),
    _tagsGlobal: wzStorageGD.load(`Text_EN/modtags_wanezGen-global.txt`,{parser: `Tags`}),
    _luaFnDGA: wzStorageGD.load(`wanez/scripts/fn/gDGA.lua`,{parser: `LuaFN`}),
    _luaNameToId: wzStorageGD.load(`wanez/scripts/data/gNameToId.lua`,{parser: `Lua`}),
    
    //_wzAffixes: new WZ.Core.cData(wzDir.Config+'/wz-affixes.json',new WZ.Core.Parser.cJSON()),
    //_wzGear: new WZ.Core.cData(wzDir.Config+'/wz-gear.json',new WZ.Core.Parser.cJSON()),
    
    _mMateria: false,
    
    iniMateria: function(){
        this._mMateria = new WZ.GrimDawn.Items.mMateria(`records/items/materia`);
    },
    
    saveCurrentData: function(){
        if(this._mDBR){
            this._mDBR.saveModuleData([this._tagsCurrent,false,this._luaFnCurrent]);
        }else{
            console.log("Module needs to be created first");
        }
    },
    saveCurrentDataMisc: function(){
        if(this._tagsCurrent){
            this._tagsCurrent.saveData();
        }
        if(this._luaFnCurrent){
            this._luaFnCurrent.saveData();
        }
    },
    setCurrentDataMisc: function($tags,$luaData,$luaFn){
        this._tagsCurrent = $tags || false;
        this._luaFnCurrent = $luaFn || false;
    },
    
    saveTagsDGA(){
        this._tagsDGA.saveData();
    },
    
    iniDifficulties: function(){
        
        let aDifficulties_DGA = [`default`,`normal`,`hard`,`elite`],
            aModes_DGA = [`a_heroic`,`a_epic`,`b_heroic`,`b_epic`,`c_heroic`,`c_epic`],
            aDifficultiesDGA = [];
        
        if(!this.aDifficultiesDGA){
            
            for(let $_ModeId in aModes_DGA){
                
                for(let $_DifficultyId in aDifficulties_DGA){
                    aDifficultiesDGA.push({
                        'difficultyId': $_DifficultyId,
                        'modeId': $_ModeId,
                        'name': `${aModes_DGA[$_ModeId]}_${aDifficulties_DGA[$_DifficultyId]}`
                    });
                }
            }
            
            this.aDifficultiesDGA = aDifficultiesDGA;
        }
        
    },
    
    saveCrafter: function($classNPC,$pathBlueprints){
        $pathBlueprints = (Array.isArray($pathBlueprints)) ? $pathBlueprints : [$pathBlueprints];
        
        let aBlueprints = [],tempBlueprintPaths;
        
        let files = [];
        for(let $_Index in $pathBlueprints){
            tempBlueprintPaths = fs.readdirSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${$pathBlueprints[$_Index]}`);
            for(let $_Index2 in tempBlueprintPaths){
                files.push(`${$pathBlueprints[$_Index]}/${tempBlueprintPaths[$_Index2]}`);
            }
        }
        for( let $_Index in files ){
            aBlueprints.push(`${files[$_Index]}`); //${$pathBlueprints}/
        }
        $classNPC.editDBR({
            "defaultRecipes": aBlueprints
        });
        $classNPC.saveData();
    },
    saveLootTable: function($class,$aFiles,$changePath){
        if($changePath) $class.changeFilePath($changePath);
        
        $aFiles = (Array.isArray($aFiles)) ? $aFiles : [$aFiles];
        
        let dbrEdits = {},counter = 1,tempFile;
        
        for(let $_Index in $aFiles){
            tempFile = (Array.isArray($aFiles[$_Index])) ? $aFiles[$_Index] : [$aFiles[$_Index],100];
            dbrEdits[`lootName${counter}`] = tempFile[0];
            dbrEdits[`lootWeight${counter}`] = tempFile[1];
            counter++;
        }
        
        $class.editDBR(dbrEdits);
        
        $class.saveDBR()
    },
    saveLootMasterTable: function($class,$aFiles,$changePath){
        if($changePath) $class.changeFilePath($changePath);
        
        $aFiles = (Array.isArray($aFiles)) ? $aFiles : [$aFiles];
        
        let dbrEdits = {},counter = 1;
        
        for(let $_Index in $aFiles){
            dbrEdits[`lootName${counter}`] = $aFiles[$_Index];
            dbrEdits[`lootWeight${counter}`] = "1000";
            counter++;
        }
        
        $class.editDBR(dbrEdits);
        
        $class.saveDBR()
    },
    saveGearBlacksmith: function(){
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling01.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling02.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling03.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling04.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling05.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
    },
    
    content_: function(){
        let out_ = '';
        
        out_ = '';
        
        return out_;
    },
    sidebar_: function(){
        let out_ = '';
        
        return out_;
    }
    
};
