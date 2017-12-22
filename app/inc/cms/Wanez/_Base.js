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
    
    //_tagsDGA: wzStorageGD.__get(`Text_EN/modtags_wanez_dga_generated.txt`,{parser: `Tags`}), // Text_EN/modtags_wanezGen-dga.txt
    //_tagsGlobal: wzStorageGD.__get(`Text_EN/modtags_wanez_global_generated.txt`,{parser: `Tags`}), // Text_EN/modtags_wanezGen-global.txt
    //_luaFnDGA: wzStorageGD.__get(`wanez_dga/scripts/fn/gDGA.lua`,{parser: `LuaFN`}), // wanez/scripts/fn/gDGA.lua
    //_luaNameToId: wzStorageGD.__get(`wanez_dga/scripts/data/gNameToId.lua`,{parser: `Lua`}), // wanez/scripts/data/gNameToId.lua
    
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
    
    saveCrafterPatron: function(InPathBlacksmith, InPathBlueprints){
        InPathBlueprints = (Array.isArray(InPathBlueprints)) ? InPathBlueprints : [InPathBlueprints];
    
        let aBlueprints = [],
            TempBlueprintPaths,
            files = [],
            TempClassBlacksmith;
    
        for(let $_Index in InPathBlueprints){
            TempBlueprintPaths = fs.readdirSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${InPathBlueprints[$_Index]}`);
            for(let $_Index2 in TempBlueprintPaths){
                files.push(`${InPathBlueprints[$_Index]}/${TempBlueprintPaths[$_Index2]}`);
            }
        }
        for( let $_Index in files ){
            aBlueprints.push(`${files[$_Index]}`); //${$pathBlueprints}/
        }
        
        for(let i = 1; i <= 5; i++){
            TempClassBlacksmith = new WZ.GrimDawn.cData(InPathBlacksmith.wzReplace({
                RANK: ( `0${i}` ).slice(-2)
            }));
            TempClassBlacksmith.editDBR({
                defaultRecipes: aBlueprints
            });
            TempClassBlacksmith.saveDBR();
        }
        //console.log(TempClassBlacksmith);
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
        this.saveCrafterPatron(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling{RANK}.dbr`,[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        
        this.saveCrafterPatron(`/mod_wanez/_lc/creatures/npcs/blacksmith_vanilla{RANK}.dbr`,`mod_wanez/_lc/blueprints`);
    
        this.saveCrafterPatron(`/mod_wanez/_events/phasing/creatures/npcs/blacksmith_gear{RANK}.dbr`,[`mod_wanez/_events/phasing/items/gear/blueprints`,`mod_wanez/_events/phasing/items/converter/blueprints`,`mod_wanez/_events/phasing/items/modifier/blueprints`]);
    },
    saveGearBlacksmith_old: function(){
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling01.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling02.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling03.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling04.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling05.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`,`mod_wanez/_gear/items/artifacts/blueprints`]);
    
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_lc/creatures/npcs/blacksmith_vanilla01.dbr`),[`mod_wanez/_lc/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_lc/creatures/npcs/blacksmith_vanilla02.dbr`),[`mod_wanez/_lc/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_lc/creatures/npcs/blacksmith_vanilla03.dbr`),[`mod_wanez/_lc/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_lc/creatures/npcs/blacksmith_vanilla04.dbr`),[`mod_wanez/_lc/blueprints`]);
        this.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_lc/creatures/npcs/blacksmith_vanilla05.dbr`),[`mod_wanez/_lc/blueprints`]);
    },
    
    DefinePaths: function(){
        this.PathToMods = `${appConfig.get(`GrimDawn.Paths.Working`).wzNormalizePath()}/mods`;
        
        this.PathToCompilation = `${this.PathToMods}/dev_WanezModGD`; // _Compilation
        
        //this.PathToGifts = `${this.PathToMods}/dev_Wanez_Gifts`;
        //this.PathToDGA = `${this.PathToMods}/dev_Wanez_DGA`;
        //this.PathToRunes = `${this.PathToMods}/dev_Wanez_Runes`;
    },
    LoadData: function(){
    
        this._tagsGifts = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/text_en/modtags_wanez_gifts_generated.txt`,`Tags`);
        this._tagsDGA = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/text_en/modtags_wanez_dga_generated.txt`,`Tags`);
        this._tagsGlobal =  new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/text_en/modtags_wanez_global_generated.txt`, `Tags`);
        this._luaFnDGA =  new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/wanez/scripts/fn/gDGA.lua`, `LuaFN`);
        this._luaNameToId =  new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/wanez/scripts/data/gNameToId.lua`, `Lua`);
        this._luaEnemies = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/wanez/scripts/data/gEnemies.lua`, `Lua`);
    
        this._tagsRunes = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/text_en/modtags_wanez_runes_items_generated.txt`, `Tags`);
        this._tagsStones = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/text_en/modtags_wanez_runes_stones_generated.txt`, `Tags`);
        this._luaRunes = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/wanez/scripts/data/gInscriptions.lua`, `Lua`);
        this._luaFnStones = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/wanez/scripts/fn/gRuneStones.lua`, `LuaFN`);
        this._luaFnRunes = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/wanez/scripts/fn/gRunes.lua`, `LuaFN`);
    
        this._tagsEvents = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/text_en/modtags_wanez_events_generated.txt`,`Tags`);
        this._tagsMastery = new WZ.GrimDawn.cData(`${this.PathToCompilation}/source/text_en/modtags_wanez_mastery.txt`,`Tags`);
    },
    
    ini: function(){
        if(!this.bLoadData){
            this.DefinePaths();
            this.LoadData();
            
            this.bLoadData = true;
        }
        
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
