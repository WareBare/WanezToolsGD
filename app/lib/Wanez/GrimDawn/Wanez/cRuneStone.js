/**
 * Created by WareBare on 4/22/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cRuneStone extends libWZ.GrimDawn.cData{
    
    constructor($runeConfig,$arrGearType){
        super();
        
        this.tplStone = {
            "TagNAME": "tagWaRunes_ItemsStone{GEAR_TYPE}_{GEAR_SLOT}{SOCKETS_STR}_NAME",
            "TextName": "Runic Stone ({GEAR_SLOT} - {SOCKETS} Sockets)",
            "TagDESC": "tagWaRunes_ItemsStone_DESC",
            "TextDesc": "Stones can be used to start a new Sequence for creating an Inscription",
            "File": "stone_{GEAR_TYPE_LOWERCASE}_{GEAR_SLOT_LOWERCASE}{SOCKETS_STR}.dbr",
            "tplFile": "{GEAR_TYPE_LOWERCASE}_{GEAR_SLOT_LOWERCASE}",
            "luaEvents": {
                "onDestroy": {
                    "key": "wanez.fn.gRuneStones.useRuneStone{GEAR_TYPE}_{GEAR_SLOT}{SOCKETS_STR}",
                    "value": "wanez.Runes.startSequence('{GEAR_TYPE_LOWERCASE}','{GEAR_SLOT_LOWERCASE}',{SOCKETS});",
                    "args": ""
                }
            }
        };
        
        this.optOneShotScroll = {
            skillName: `mod_wanez/scroll/item_skill.dbr`,
            usesSharedCooldown: `0`,
            actorRadius: `1.0`,
            actorHeight: `0.5`,
            physicsFriction: `5`,
            mapNuggetType: `None`,
            collisionShape: `Sphere`,
            levelRequirement: `1`,
            useSound: `records/sounds/objects/loot/spak_itemusepotion.dbr`,
            bitmap: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
            bitmapButtonUp: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
            bitmapButtonDown: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
            itemClassification: `Common`,
            dropSound: `records/sounds/objects/loot/spak_itemdroppotion.dbr`,
            dropSound3D: `records/sounds/objects/loot/spak_itemdroppotion.dbr`,
            dropSoundWater: `records/sounds/objects/loot/spak_itemdroppotion.dbr`,
            itemCost: `100`,
            itemLevel: `1`,
            maxStackSize: `1`,
            mesh: `items/misc/bottle02.msh`
        };
    
        //this.runeConfig = new eConfig({name: `gd-runes`});
        
        this.iSettings = $runeConfig.get(`Settings`);
        this.iGearType = $arrGearType[0];
        this.iGearSlot = $arrGearType[1];
        
        this.pathStone = this.iSettings.Paths._runes+'/'+this.iSettings.Paths.Stones;
        //this.iSockets = $arrGearType[2];
        this.aRepStone = {
            "GEAR_TYPE": this.iGearType,
            "GEAR_TYPE_LOWERCASE": this.iGearType.toLowerCase(),
            "GEAR_SLOT": this.iGearSlot,
            "GEAR_SLOT_LOWERCASE": this.iGearSlot.toLowerCase()
        };
        
        this.aTags = {};
        this.aLuaFN = {};
        this.aLuaData = {};
        
        this._lootTable = false;
        this._craft = false;
        this._blueprint = false;
        this.aData = this.iniData();
        /*
        this.aModuleData = [
            this.aData,
            this._lootTable,
            this._craft,
            this._blueprint
        ];
        */
    }
    
    // files - Stone
    iniData(){
        let aData = [],newFilePath,fileName,fileLootTable,fileCraft,fileBlueprint,tplFile = this.tplStone.tplFile.wzOut(this.aRepStone),tempData,tempTagDesc,tempTagName,tempLuaFN,tempEditDBR,tempLuaHook,aWeights = {'2':`1000`,'3':`500`,'4':`100`,'5':`25`},aLT = {},lootSlot = 1;
        
        tempTagDesc = this.tplStone.TagDESC.wzOut(this.aRepStone);
        this.aTags[tempTagDesc] = this.tplStone.TextDesc.wzOut(this.aRepStone);
        for( let i = 2; i <= 5; i++ ){
            tempEditDBR = {
                "bitmap":"wanez/items/runes/bitmaps/stone_default.tex",
                "bitmapButtonUp":"wanez/items/runes/bitmaps/stone_default.tex",
                "bitmapButtonDown":"wanez/items/runes/bitmaps/stone_default.tex"
            };
            this.aRepStone.SOCKETS = i;
            this.aRepStone.SOCKETS_STR = (`0${i}`).slice(-2); // this.parseIntToString(i,1)
            
            fileName = this.tplStone.File.wzOut(this.aRepStone);
            // LootTable - Data \\
            aLT[`lootName${lootSlot}`] = this.pathStone+'/'+fileName;
            aLT[`lootWeight${lootSlot}`] = aWeights[i];
            lootSlot++;
            
            //newFilePath = wzGD_dataSet.PathsDS.Mod.Home+'/database/'+this.pathStone+'/'+fileName;
            //tempData = new libWZ.GrimDawn.RunicInscription.cStone(newFilePath);
            tempData = new libWZ.GrimDawn.cData();
            tempData.changeFilePath(`${this.fn.getPaths().Mod}/${this.pathStone}/${fileName}`);
            tempData.fetchTemplate(`database/templates/oneshot_scroll.tpl`);
            tempData.editDBR(this.optOneShotScroll);
            
            tempTagName = this.tplStone.TagNAME.wzOut(this.aRepStone);
            this.aTags[tempTagName] = this.tplStone.TextName.wzOut(this.aRepStone);
            tempData.editTagFields(
                tempTagName,
                tempTagDesc
            );
            // LUA
            for( let $_Event in this.tplStone.luaEvents ){
                tempLuaHook = this.tplStone.luaEvents[$_Event].key.wzOut(this.aRepStone);
                tempLuaFN = this.tplStone.luaEvents[$_Event].value.wzOut(this.aRepStone);
                
                tempEditDBR[$_Event] = tempLuaHook;
                
                this.aLuaFN[`${tempLuaHook}()`] = tempLuaFN;
            }
            tempData.editDBR(tempEditDBR);
            
            aData.push(tempData);
        }
        
        // LootTable - Class \\
        //this._lootTable = new libWZ.GrimDawn.cData(wzAssets.newDynLootItemTable);
        this._lootTable = new libWZ.GrimDawn.cData();
        this._lootTable.fetchTemplate(`database/templates/lootitemtable_dynweighted_dynaffix.tpl`);
        this._lootTable.editDBR({
            bellSlope: [`400.0`,`300.0`,`250.0`,`200.0`,`150.0`,`100.0`,`50.0`,`20.0`],
            bothPrefixSuffix: `1250`,
            brokenOnly: `0`,
            //brokenTableName1: ``,
            maxItemLevelEquation: `500`,
            minItemLevelEquation: `1`,
            noPrefixNoSuffix: `0`,
            normalPrefixRareSuffix: `1000`,
            prefixOnly: `0`,
            suffixOnly: `0`,
            rareBothPrefixSuffix: `750`,
            rarePrefixNormalSuffix: `1000`,
            rarePrefixOnly: `500`,
            rareSuffixOnly: `500`,
            targetLevelEquation: `(parentLevel*1)-2`
        });
        
        this._lootTable.editDBR(aLT);
        fileLootTable = `${this.pathStone}/loottables/tdyn_${tplFile}.dbr`;
        this._lootTable.changeFilePath(`${this.fn.getPaths().Mod}/${fileLootTable}`);
        //this._lootTable.changeFilePath(`${wzGD_dataSet.PathsDS.Mod.Home}/database/${fileLootTable}`);
        
        // Craft_ - Class \\
        //this._craft = new libWZ.GrimDawn.cData(wzAssets.newOneShot_Scroll);
        this._craft = new libWZ.GrimDawn.cData();
        this._craft.fetchTemplate(`database/templates/oneshot_scroll.tpl`);
        this._craft.editDBR(this.optOneShotScroll);
        
        this.aTags[`tagWzRunes_ItemsStones_${tplFile}_NAME`] = `Craft: (Stone) ${this.iGearType} - ${this.iGearSlot}`;
        this.aTags[`tagWzRunes_ItemsStones_${tplFile}_DESC`] = `"Crafts a Runic Stone for ${this.iGearSlot} - ${this.iGearType} with a random number of Sockets"`;
        this._craft.editDBR({
            "itemText": `tagWzRunes_ItemsStones_${tplFile}_DESC`,
            "description": `tagWzRunes_ItemsStones_${tplFile}_NAME`,
            "bitmap": "wanez/items/craft_random001.tex",
            "bitmapButtonUp": "wanez/items/craft_random001.tex",
            "bitmapButtonDown": "wanez/items/craft_random001.tex"
        });
        fileCraft = `${this.pathStone}/craft_${tplFile}.dbr`;
        this._craft.changeFilePath(`${this.fn.getPaths().Mod}/${fileCraft}`);
        
        // Blueprint - Class \\
        //this._blueprint = new libWZ.GrimDawn.cData(wzAssets.newItemArtifactFormula);
        this._blueprint = new libWZ.GrimDawn.cData();
        this._blueprint.fetchTemplate(`database/templates/itemartifactformula.tpl`);
        this._blueprint.editDBR({
            artifactFormulaBitmapName: `items/craftingparts/materials/blueprint_a003_epic.tex`,
            itemClassification: `Common`,
            dropSound: `records/sounds/items/spak_itemdropgeneric.dbr`,
            dropSound3D: `records/sounds/items/spak_itemdropgeneric.dbr`,
            dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`,
            itemCost: `100`,
            itemLevel: `1`,
            //actorRadius: `1.0`,
            //actorHeight: `0.5`,
            description: `tagBlueprint_ArmorC002`,
            mesh: `items/misc/blueprint02.msh`,
        });
        this._blueprint.editDBR({
            "artifactName": `${fileLootTable}`,
            "forcedRandomArtifactName": `${fileCraft}`,
            "artifactCreateQuantity": `1`,
            "artifactCreationCost": (this.iGearSlot.includes(`Generic`)) ? `1000` : `10000`,
            "reagentBaseBaseName": "records/items/questitems/scrapmetal.dbr",
            "reagentBaseQuantity": (this.iGearSlot.includes(`Generic`)) ? `50` : `500`
        });
        fileBlueprint = `${this.pathStone}/blueprints/blueprint_${tplFile}.dbr`;
        this._blueprint.changeFilePath(`${this.fn.getPaths().Mod}/${fileBlueprint}`);
        
        return aData;
    }
    
    getDataMisc(){
        return {
            "LuaFN": this.aLuaFN,
            "LuaData": this.aLuaData,
            "Tags": this.aTags
        };
    }
    
    editDataMisc($luaFN,$tags){
        for( let $_Key in this.aLuaFN ){
            $luaFN.editData($_Key,this.aLuaFN[$_Key]);
        }
        for( let $_Key in this.aTags ){
            $tags.editData($_Key,this.aTags[$_Key]);
        }
        
        return true;
    }
    
    saveStones(){
        
        for( let $_Index in this.aData ){
            this.aData[$_Index].saveDBR();
        }
        this._lootTable.saveDBR();
        this._craft.saveDBR();
        this._blueprint.saveDBR();
        
        //console.log(this.aData);
        //console.log(this._lootTable);
        //console.log(this._craft);
        //console.log(this._blueprint);
    }
    
};
