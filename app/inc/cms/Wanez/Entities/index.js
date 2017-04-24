/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    _wzEnemiesCore: false,
    _wzEnemiesDGA: false,
    _wzContainersDGA: false,
    //_wzContainersDGA_JSON: new WZ.Core.cData(`${wzDir.Config}/wz-containers.json`, new WZ.Core.Parser.cJSON()),
    containersConfig: new eConfig({name: `wz-containers`}),
    _wzControllers: new WZ.GrimDawn.Wanez.mControllers(),
    //_luaEnemies: new WZ.GrimDawn.cData('C:/Program Files (x86)/Steam/SteamApps/common/Grim Dawn/mods/dev_Wanez/source/wanez/scripts/data/gEnemies.lua',new WZ.GrimDawn.Parser.cLua(`wanez.data.gEnemies`)),
    _luaEnemies: wzStorageGD.load(`wanez/scripts/data/gEnemies.lua`,{parser: `Lua`}),
    
    
    loadEnemies: function($enemyType){
        this._wzEnemiesDGA = new WZ.GrimDawn.Wanez.mEnemies($enemyType,this._wzEnemiesCore.getEnemies());
        //console.log($enemyType);
        console.log([this._luaEnemies,this.Base._luaNameToId]);
    },
    
    saveCurrentData: function(){
        switch (this.contentType){
            case 'Enemies-DGA':
                this._wzEnemiesDGA.saveEnemies([this._luaEnemies,this.Base._luaNameToId]);
                break;
            case 'Containers':
                this._wzContainersDGA.saveModuleData([this.Base._tagsDGA]);
                break;
            default:
                break;
        }
    },
    
    saveDataMisc: function(){
        this._luaEnemies.saveData();
        this.Base._luaNameToId.saveData();
        //console.log([this._luaEnemies,this.Base._luaNameToId]);
    },
    
    saveControllers: function(){
        this._wzControllers.saveControllers();
    },
    
    contentEnemiesDGA: function(){
        if(!this._wzEnemiesCore) this._wzEnemiesCore = new WZ.GrimDawn.Wanez.mEnemies("core");
        
        let out_ = "",
            folders = fs.readdirSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/mod_wanez/_dga/difficulties`),
            tempBtns = [];
        
        for(let $_Index in this.Base.aDifficultiesDGA){
            tempBtns.push({
                "ONCLICK": `_cms.loadEnemies('${this.Base.aDifficultiesDGA[$_Index].name}');`,
                "TEXT": this.Base.aDifficultiesDGA[$_Index].name
            });
        }
        
        out_ = appData.tpl.Buttons.Default.wzParseTPL(tempBtns);
        
        return out_;
    },
    
    loadContainersDGA: function($difficultyName,$difficultyId,$difficultyModeId){
        
        this._wzContainersDGA = new WZ.GrimDawn.Wanez.mContainers(this.containersConfig,{ // _wzContainersDGA_JSON
            'name': $difficultyName,
            'difficultyId': $difficultyId,
            'modeId': $difficultyModeId
        });
        
        //console.log([$difficultyName,$difficultyModeId,$difficultyId]);
        
    },
    contentContainersDGA: function(){
        let tempBtns = [],out_ = ``;
        
        
        for(let $_Index in this.Base.aDifficultiesDGA){
            tempBtns.push({
                "ONCLICK": `_cms.loadContainersDGA('${this.Base.aDifficultiesDGA[$_Index].name}','${this.Base.aDifficultiesDGA[$_Index].difficultyId}','${this.Base.aDifficultiesDGA[$_Index].modeId}');`,
                "TEXT": this.Base.aDifficultiesDGA[$_Index].name
            });
        }
        
        out_ = appData.tpl.Buttons.Default.wzParseTPL(tempBtns);
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = '';
        
        this.Base.iniDifficulties();
        
        if(this.contentType){
            if(this.contentType === "Enemies-DGA"){
                out_ = this.contentEnemiesDGA();
            }else if(this.contentType === "Containers"){
                out_ = this.contentContainersDGA();
            }
        }
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [
            {
                "ONCLICK": "_cms.saveCurrentData()",
                "TEXT": "S. Data"
            }, {
                "ONCLICK": "_cms.saveDataMisc()",
                "TEXT": "Save Misc"
            }, {
                "ONCLICK": "_cms.saveControllers()",
                "TEXT": "Controllers"
            }, {
                "ONCLICK": "_cms.Base.saveTagsDGA()",
                "TEXT": "S. Tags"
            }
        ];
    },
    sidebarList_: function(){
        return {
            "Enemies-DGA":[],
            'Containers':[]
        }
    }
};
