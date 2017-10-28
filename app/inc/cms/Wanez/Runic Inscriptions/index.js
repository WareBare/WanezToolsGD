/**
 * Created by WareBare on 4/20/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    //luaRunes: wzStorageGD.load(`wanez/scripts/data/gInscriptions.lua`,{parser: `Lua`}),
    //luaRunesFN: wzStorageGD.load(`wanez/scripts/fn/gRunes.lua`,{parser: `LuaFN`}),
    //tagsRunes: wzStorageGD.load(`Text_EN/modtags_wanezGen-runes_items.txt`,{parser: `Tags`}),
    //luaStonesFN: wzStorageGD.load(`wanez/scripts/fn/gRuneStones.lua`,{parser: `LuaFN`}),
    //tagsStones: wzStorageGD.load(`Text_EN/modtags_wanezGen-runes_stones.txt`,{parser: `Tags`}),
    
    saveRuneStones: function(){
        for( let $_Slot in this.gearSlotToStone ){
            this.gearSlotToStone[$_Slot].saveStones();
        }
        this.Base._luaFnStones.saveData();
        this.Base._tagsStones.saveData();
    },
    saveRunicInscriptions: function(){
        this._mModule.saveRunicInscriptions();
    },
    
    saveDataMisc(){
        let data = this._mModule.getDataMisc();
        
        for( let $_Key in data.LuaData ){
            this.Base._luaRunes.editData([this.runeType,$_Key],data.LuaData[$_Key]);
        }
        for( let $_Key in data.LuaFN ){
            this.Base._luaFnRunes.editData($_Key,data.LuaFN[$_Key]);
        }
        for( let $_Key in data.Tags ){
            this.Base._tagsRunes.editData($_Key,data.Tags[$_Key]);
        }
        
        // SAVE
        this.Base._luaFnRunes.saveData();
        this.Base._tagsRunes.saveData();
        this.Base._luaRunes.saveData();
        
        //this.fnLog();
    },
    
    saveLootTables: function(){
        let pathItems = `${WZ.GrimDawn.tFn.getPaths().Mod}/mod_wanez/_runes/items/materia`,
            aFiles = fs.readdirSync(`${pathItems}`),
            aFilesScrolls = [], // stores rel scroll filepaths
            objTdyn = {},
            aTdyn = [],
            tempID_3,tempIndex;
        
        for(let $_FileName in aFiles){
            if(aFiles[$_FileName].match(/^runec_/) && aFiles[$_FileName].match(/[0-9].dbr$/)){
                aFilesScrolls.push(`mod_wanez/_runes/items/materia/${aFiles[$_FileName]}`);
            }
        }
        console.log(aFilesScrolls);
        for(let $_Index in aFilesScrolls){
            // tdyn limit is 80, don't add more items than the limit (get file number)
            tempIndex = ($_Index > 0) ? (Math.ceil(parseInt($_Index) / 80)) : 1;
            
            // SCROLLS \\
            objTdyn[`RuneC_${tempIndex}`] = objTdyn[`RuneC_${tempIndex}`] || {
                    'tdyn_path': `mod_wanez/_runes/items/materia/loottables/`,
                    'tdyn_file': `tdyn_runec_${(`00${tempIndex}`).slice(-3)}x.dbr`, // tdyn limit is 80, don't add more items than the limit (set file number)
                    'items': []
                };
            objTdyn[`RuneC_${tempIndex}`].items.push(`${aFilesScrolls[$_Index]}`);
        }
        for(let $_Type in objTdyn){
            this.Base.saveLootTable( new WZ.GrimDawn.Assets.aLootTdyn(`${objTdyn[$_Type].tdyn_path}${objTdyn[$_Type].tdyn_file}`), objTdyn[$_Type].items);
        }
    },
    
    updateBlacksmith: function(){
        let configPaths = this.runeConfig.get(`Settings.Paths`),
            basePath = configPaths._runes,
            smithDBR = new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/${basePath}/creatures/npcs/blacksmith_runes001a.dbr`),
            pathBlueprints = basePath+'/'+configPaths.Blueprints,
            aBlueprints = [];
        
        let files = fs.readdirSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${pathBlueprints}`);
        
        for( let $_Index in files ){
            aBlueprints.push(pathBlueprints+'/'+files[$_Index]);
        }
        //console.log(aBlueprints);
        smithDBR.editDBR({
            "defaultRecipes":aBlueprints
        });
        smithDBR.saveData();
    },
    setCrafters: function(){
        let configPaths = this.runeConfig.get(`Settings.Paths`),
            basePath = configPaths._runes,
            pathBlueprints = basePath+'/'+configPaths.Blueprints;
        
        this.Base.saveCrafter(new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod}/${basePath}/creatures/npcs/blacksmith_runes001a.dbr`),[pathBlueprints,`mod_wanez/_runes/items/stones/blueprints`]);
    },
    
    saveLoreTables: function(){
        // todo
        let pathLore = `${WZ.GrimDawn.tFn.getPaths().Mod}/mod_wanez/_runes/items/lore`,
            filesLore = fs.readdirSync(`${pathLore}`),
            objTdynLore = {},
            aTdynLore = [],
            tempID_3,tempIndex,
            aInscriptions = this.runeConfig.get(`Items.${this.contentType}.Inscriptions.Items`);
        
        for(let $_Index in filesLore){
            for(let $_IndexInscription in aInscriptions){
                tempID_3 = `${this.contentType.toLowerCase()}${(`00${$_IndexInscription}`).slice(-3)}_`; // WZ.Core.oTraits.parseIntToString($_IndexInscription,2)
                tempIndex = (Math.ceil(parseInt($_IndexInscription) / 10));
                objTdynLore[tempIndex] = objTdynLore[tempIndex] || {
                        'tdyn_path': `mod_wanez/_runes/items/lore/loottables/`,
                        'tdyn_file': `tdyn_${this.contentType.toLowerCase()}${(`00${tempIndex}`).slice(-3)}x.dbr`, // WZ.Core.oTraits.parseIntToString(tempIndex,2)
                        'items': []
                    };
                
                if(filesLore[$_Index].includes(`${tempID_3}`)){
                    objTdynLore[tempIndex].items.push(`mod_wanez/_runes/items/lore/${filesLore[$_Index]}`);
                }
            }
            
        }
        //console.log(objTdynLore);
        for(let $_Index in objTdynLore){ // new WZ.GrimDawn.cData(wzAssets.newDynLootItemTable)
            this.Base.saveLootTable( new WZ.GrimDawn.Assets.aLootTdyn(`${objTdynLore[$_Index].tdyn_path}${objTdynLore[$_Index].tdyn_file}`), objTdynLore[$_Index].items);
            aTdynLore.push(`${objTdynLore[$_Index].tdyn_path}${objTdynLore[$_Index].tdyn_file}`);
        } // new WZ.GrimDawn.cData(wzAssets.newLootMasterTable)
        this.Base.saveLootTable( new WZ.GrimDawn.Assets.aLootMT(`mod_wanez/_runes/items/lore/loottables/mt_${this.contentType.toLowerCase()}.dbr`), aTdynLore);
    },
    
    iniLore: function(){
        let aLore = [],tempObj,tempCounter,
            //aRuneCount = ["I","II","III","IV","V","VI","VII"],
            runeData = this.runeConfig.get(`Items.${this.contentType}`),
            aRunes = runeData.Runes.Items,
            aInscriptions = runeData.Inscriptions.Items,
            tplObj = {
                "wzAsset": "aLore",
                "tpl": "loreObj_{RUNE_TYPE}{INDEX_3}_{TYPE_3}",
                "fileExt": "dbr",
                "replace": {
                    "INDEX": [],
                    "TYPE": [],
                    "RUNE_TYPE": [[this.contentType,runeData.Inscriptions.Settings.Title]]
                },
                "tags": {
                    "itemText": {
                        "key": "tagWzRunes_LoreObj_{RUNE_TYPE}{INDEX_3}_Note{TYPE_3}_TEXT",
                        "value": "{TYPE_TAG2}"
                    },
                    "description": {
                        "key": "tagWzRunes_LoreObj_{RUNE_TYPE}{INDEX_3}_Note{TYPE_3}_NAME",
                        "value": "Ch.{INDEX_2}: {TYPE_TAG}"
                    },
                    "subHeading": {
                        "key": "tagWzRunes_CodexJournalSubHeading_{RUNE_TYPE}",
                        "value": "{RUNE_TYPE_TAG}"
                    },
                    "codexTitle": {
                        "key": "tagWzRunes_CodexJournalSubHeading_Codex{RUNE_TYPE}{INDEX_3}",
                        "value": "Ch.{INDEX_2}: {INDEX_TAG}"
                    }
                }
            };
        
        for(let $_Index in aInscriptions){
            tempCounter = 0;
            tplObj.replace.INDEX = [ [parseInt($_Index), aInscriptions[$_Index].Title.replace(`${runeData.Inscriptions.Settings.Title}: `,``)] ];
            
            // TITLE \\
            tplObj.replace.TYPE = [ [tempCounter, `Inscription - ^g${aInscriptions[$_Index].Title.replace(`${runeData.Inscriptions.Settings.Title}`,``).replace(`: `,``)}`, aInscriptions[$_Index].Text || `No Entry`] ];
            tempCounter++;
            aLore.push(JSON.parse(JSON.stringify(tplObj)));
            
            // SLOT \\
            tplObj.replace.TYPE = [ [tempCounter, `Step ${tempCounter} - Stone`, `${appData[`app-gd`].Gear.slots[aInscriptions[$_Index].Slots[0]]} Stone with ${aInscriptions[$_Index].Runes.length} Sockets`] ];
            tempCounter++;
            aLore.push(JSON.parse(JSON.stringify(tplObj)));
            
            // RUNES \\
            for(let $_IndexRunes in aInscriptions[$_Index].Runes){
                tplObj.replace.TYPE = [ [parseInt(tempCounter), `Step ${tempCounter} - ${aRunes[aInscriptions[$_Index].Runes[$_IndexRunes]].Title.replace(`${runeData.Runes.Settings.Title}: `,``)}`, aRunes[aInscriptions[$_Index].Runes[$_IndexRunes]].Text || `No Entry`] ];
                tempCounter++;
                aLore.push(JSON.parse(JSON.stringify(tplObj)));
            }
            
        }
        //console.log(aLore);
        this.Base._mDBR = new WZ.GrimDawn.Assets.dbrModule(aLore,`mod_wanez/_runes/items/lore`);
        this.Base.setCurrentDataMisc(this.Base._tagsRunes);
    },
    
    iniRuneStones: function(){
        let gearTypes = appData[`app-gd`].Gear.types;
        
        this.gearSlotToStone = {};
        this.runeConfig = new eConfig({name: `wz-runes`});
        
        for( let $_Type in gearTypes ){
            //this.gearSlotToStone[$_Type+'_Generic'] = new WZ.GrimDawn.Wanez.cRuneStone(this.runeConfig,[$_Type,'Generic']);
            //this.gearSlotToStone[$_Type+'_Generic'].editDataMisc(this.Base._luaFnStones,this.Base._tagsStones);
            for( let $_Key in gearTypes[$_Type] ){
                this.gearSlotToStone[gearTypes[$_Type][$_Key].toLowerCase()] = new WZ.GrimDawn.Wanez.cRuneStone(this.runeConfig,[$_Type,gearTypes[$_Type][$_Key]]);
                this.gearSlotToStone[gearTypes[$_Type][$_Key].toLowerCase()].editDataMisc(this.Base._luaFnStones,this.Base._tagsStones);
                //luaStonesFN.editData();
            }
        }
    },
    
    content_Runes: function(){
        let out_; // runeData = this.runeConfig.get(`Items.${this.contentType}`)
        
        this._mModule = new WZ.GrimDawn.Wanez.mRunicInscriptions(this.runeConfig,this.contentType,this.gearSlotToStone,this.Base._mMateria.getProperties());
    
        //console.log(this.Base._mMateria.getProperties());
    
         this.iniLore();
        
        out_ = this._mModule.genOutput();
    
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        this.Base.iniMateria();
        
        //if(runeConfig){
            //console.log(this.runeConfig.store);
        //}
        
        
        let out_ = `Runes & Inscriptions`;
        
        if(this.contentType){
            out_ = this.content_Runes();
        }else{
            this.iniRuneStones();
        }
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [
            /*{
                "ONCLICK": "_cms.Base.iniMateria();",
                "TEXT": "Reload Materia *"
            },*/{
                "ONCLICK": "_cms.setCrafters();",
                "TEXT": "Blacksmith"
            },{
                "ONCLICK": "_cms.saveRuneStones();",
                "TEXT": "S. Stones .dbr"
            },{
                "ONCLICK": "_cms.saveRunicInscriptions();",
                "TEXT": "S. Runes .dbr"
            },{
                "ONCLICK": "_cms.saveDataMisc();",
                "TEXT": "S. Runes Src"
            }/*,{
             "ONCLICK": "_cms.updateBlacksmith();",
             "TEXT": "Blacksmith"
             }*/, {
                "ONCLICK": "_cms.saveLoreTables();",
                "TEXT": "S. LoreLT"
            }, {
                "ONCLICK": "_cms.Base.saveCurrentData();",
                "TEXT": "S. Lore .dbr"
            }, {
                "ONCLICK": "_cms.Base.saveCurrentDataMisc();",
                "TEXT": "S. More Src"
            }, {
                "ONCLICK": "_cms.saveLootTables();",
                "TEXT": "Save LT"
            }
        ];
    },
    sidebarList_: function(){
        return {
            'RuneB': {
                text: `From Materia`
            },
            'RuneC': {
                text: `Phasing`
            }
        }
    }
    
};
