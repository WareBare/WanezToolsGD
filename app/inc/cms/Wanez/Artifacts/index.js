/**
 * Created by WareBare on 5/8/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    _mModule: false,
    
    _tagsGear: wzStorageGD.load(`Text_EN/modtags_wanezGen-gear.txt`,{parser: `Tags`}),
    affixesConfig: new eConfig({name: `wz-artifacts`}),
    
    saveCurrentData: function(){
        if(this._mModule){
            this._mModule.saveModuleData([this._tagsGear,false,false]);
        }
    },
    
    saveDataTags: function(){
        this._tagsGear.saveData();
    },
    
    saveLootTables: function(){
        let pathItems = `${WZ.GrimDawn.tFn.getPaths().Mod}/mod_wanez/_gear/items/artifacts`,
            aFiles = fs.readdirSync(`${pathItems}`),
            aFilesPages = [], // stores rel page filepaths
            aFilesPattern = [], // stores rel pattern filepaths
            objTdyn = {},
            aTdyn = [],
            tempID_3,tempIndex;
        
        for(let $_FileName in aFiles){
            if(aFiles[$_FileName].endsWith(`artifact_00.dbr`)){
                aFilesPattern.push(`mod_wanez/_gear/items/artifacts/${aFiles[$_FileName]}`);
            }else if(aFiles[$_FileName].endsWith(`pages.dbr`)){
                aFilesPages.push(`mod_wanez/_gear/items/artifacts/${aFiles[$_FileName]}`);
            }
        }
        console.log(aFilesPattern);
        for(let $_Index in aFilesPattern){
            // tdyn limit is 80, don't add more items than the limit (get file number)
            tempIndex = ($_Index > 0) ? (Math.ceil(parseInt($_Index) / 80)) : 1;
            
            // PATTERNS \\
            objTdyn[`Pattern_${tempIndex}`] = objTdyn[`Pattern_${tempIndex}`] || {
                    'tdyn_path': `mod_wanez/_gear/items/artifacts/loottables/`,
                    'tdyn_file': `tdyn_patterns_${(`00${tempIndex}`).slice(-3)}x.dbr`, // tdyn limit is 80, don't add more items than the limit (set file number)
                    'items': []
                };
            objTdyn[`Pattern_${tempIndex}`].items.push(`${aFilesPattern[$_Index]}`);
            // PAGES\\
            objTdyn[`Pages_${tempIndex}`] = objTdyn[`Pages_${tempIndex}`] || {
                    'tdyn_path': `mod_wanez/_gear/items/artifacts/loottables/`,
                    'tdyn_file': `tdyn_pages_${(`00${tempIndex}`).slice(-3)}x.dbr`,
                    'items': []
                };
            objTdyn[`Pages_${tempIndex}`].items.push(`${aFilesPages[$_Index]}`);
        }
        for(let $_Type in objTdyn){
            this.Base.saveLootTable( new WZ.GrimDawn.Assets.aLootTdyn(`${objTdyn[$_Type].tdyn_path}${objTdyn[$_Type].tdyn_file}`), objTdyn[$_Type].items);
        }
    },
    
    content_Main(){
        
        this._mModule = new WZ.GrimDawn.Wanez.mArtifacts(this.affixesConfig.get(`items`));
        
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = '';
        
        if(this.contentType){
            if(this.contentType === "Main"){
                out_ = this.content_Main();
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
                "ONCLICK": "_cms.saveDataTags()",
                "TEXT": "Save Tags"
            }, {
                "ONCLICK": "_cms.Base.saveGearBlacksmith()",
                "TEXT": "Save BS Lvl"
            }, {
                "ONCLICK": "_cms.saveLootTables()",
                "TEXT": "S. LootTables"
            }
        ];
    },
    sidebarList_: function(){
        return {
            "Main":[]
        }
    }
};
