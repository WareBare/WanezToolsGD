/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent:{},
    contentType: false,
    resGear: { // offensivePierceRatioMin,offensivePierceRatioMax characterBaseAttackSpeed,"characterBaseAttackSpeedTag"
        "Armor":{
            "Feet": {
                "armorMaleMesh": "items/gearfeet/feet_007a_02.msh",
                "armorFemaleMesh": "items/gearfeet/feet_007a_02.msh",
                "bitmap": "items/gearfeet/bitmaps/a03_feet01.tex",
                "bitmapFemale": "",
                "mesh": "items/gearfeet/feet_007a_02.msh",
                "shader": "",
                "baseTexture": "items/gearfeet/feet_007d_dif.tex",
                "bumpTexture": "items/gearfeet/feet_007d_nml.tex",
                "specTexture": "",
                "glowTexture": ""
            },
            "Hands": {
                "armorMaleMesh": "items/gearhands/hands_002a_01.msh",
                "armorFemaleMesh": "items/gearhands/hands_002a_01.msh",
                "bitmap": "items/gearhands/bitmaps/a05_hands01.tex",
                "bitmapFemale": "",
                "mesh": "items/gearhands/hands_002a_01.msh",
                "shader": "",
                "baseTexture": "items/gearhands/hands_002f_dif.tex",
                "bumpTexture": "items/gearhands/hands_002a_nml.tex",
                "specTexture": "",
                "glowTexture": ""
            },
            "Head": {
                "armorMaleMesh": "items/gearhead/head_003_04a.msh",
                "armorFemaleMesh": "items/gearhead/head_003_04a.msh",
                "bitmap": "items/gearhead/bitmaps/f004_head.tex",
                "bitmapFemale": "",
                "mesh": "items/gearhead/head_003_04a.msh",
                "shader": "shaders/standardskinned.ssh",
                "baseTexture": "items/gearhead/head_003_04c_dif.tex",
                "bumpTexture": "items/gearhead/head_003_04c_nml.tex",
                "specTexture": "",
                "glowTexture": ""
            },
            "Legs": {
                "armorMaleMesh": "items/gearlegs/legs_002a_01.msh",
                "armorFemaleMesh": "items/gearlegs/legs_002a_01.msh",
                "bitmap": "items/gearlegs/bitmaps/a01_legs01.tex",
                "bitmapFemale": "",
                "mesh": "items/gearlegs/legs_002a_01.msh",
                "shader": "",
                "baseTexture": "items/gearlegs/legs_006a_dif.tex",
                "bumpTexture": "items/gearlegs/legs_006a_nml.tex",
                "specTexture": "",
                "glowTexture": ""
            },
            "Shoulders": {
                "armorMaleMesh": "items/gearshoulders/shoulders_017b_01.msh",
                "armorFemaleMesh": "items/gearshoulders/shouldersf_017b_01.msh",
                "bitmap": "items/gearshoulders/bitmaps/f015_shoulder.tex",
                "bitmapFemale": "",
                "mesh": "items/gearshoulders/shoulders_017b_01.msh",
                "shader": "",
                "baseTexture": "items/gearshoulders/shoulders_017b_01_dif.tex",
                "bumpTexture": "items/gearshoulders/shoulders_017b_01_nml.tex",
                "specTexture": "",
                "glowTexture": ""
            },
            "Chest": {
                "armorMaleMesh": "items/geartorso/torso_heavy_001-03b_m.msh",
                "armorFemaleMesh": "items/geartorso/torso_heavy_001-03b_f.msh",
                "bitmap": "items/geartorso/bitmaps/f015_torso.tex",
                "bitmapFemale": "",
                "mesh": "items/geartorso/torso_heavy_001-03b_m.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            }
        },
        "Accessory":{
            "Waist": {
                "armorMaleMesh": "items/gearaccessories/waist/belt.msh",
                "armorFemaleMesh": "items/gearaccessories/waist/belt.msh",
                "bitmap": "items/gearaccessories/waist/bitmaps/a01_waist_01.tex",
                "bitmapFemale": "",
                "mesh": "items/gearaccessories/waist/belt.msh",
                "shader": "",
                "baseTexture": "items/gearaccessories/waist/b01_waist.tex",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Amulet": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearaccessories/necklaces/a12_necklace_silveramulet.tex",
                "bitmapFemale": "",
                "mesh": "items/gearaccessories/rings/ring.msh",
                "shader": "",
                "baseTexture": "items/gearaccessories/rings/ringgold16.tex",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Ring": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearaccessories/rings/a12_ring_silverband.tex",
                "bitmapFemale": "",
                "mesh": "items/gearaccessories/rings/ring.msh",
                "shader": "",
                "baseTexture": "items/gearaccessories/rings/ringgold16.tex",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Offhand": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/focus/bitmaps/a01_focus01.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/focus/focus_001a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Shield": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/shields/bitmaps/a00_shield01.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/shields/shield_000a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            }
        },
        "Weapon1H":{
            "Axe": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/axes1h/bitmaps/a01_axe001.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/axes1h/axe1h_004.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Dagger": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/swords1h/bitmaps/a00_sword001.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/swords1h/sword1h_020a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Gun": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/guns1h/bitmaps/a01_gun1h002.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/guns1h/gun1h_008a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Mace": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/hammers1h/bitmaps/a01_blunt002.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/hammers1h/hammer1h_017a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Scepter": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/caster/bitmaps/a02_scepter001.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/caster/scepter1h_001a_02.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Sword": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/swords1h/bitmaps/a03_sword002.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/swords1h/sword1h_000a.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            }
        },
        "Weapon2H":{
            "Axe": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/melee2h/bitmaps/a01_axe2h001.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/melee2h/axe2h_000a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Gun": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/guns2h/bitmaps/a01_gun2h001.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/guns2h/gun2h_001a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Mace": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/melee2h/bitmaps/a02_blunt2h001.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/melee2h/hammer2h_000a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            },
            "Sword": {
                "armorMaleMesh": "",
                "armorFemaleMesh": "",
                "bitmap": "items/gearweapons/melee2h/bitmaps/a01_sword2h001.tex",
                "bitmapFemale": "",
                "mesh": "items/gearweapons/melee2h/sword2h_000a_01.msh",
                "shader": "",
                "baseTexture": "",
                "bumpTexture": "",
                "specTexture": "",
                "glowTexture": ""
            }
        }
    },
    armorMul: {
        "Feet": 1.2,
        "Hands": 1.2,
        "Head": 1.35,
        "Legs": 1.5,
        "Shoulders": 1.35,
        "Chest": 1.5
    },
    aAffixes: {},
    aArmor: {},
    cur_wzGear: false,
    curData: false,
    mergedGearAssets: false,
    _tagsGear: wzStorageGD.load(`Text_EN/modtags_wanezGen-gear.txt`,{parser: `Tags`}),
    
    affixesConfig: new eConfig({name: `wz-affixes`}),
    gearConfig: new eConfig({name: `wz-gear`}),
    //_tagsGear: new WZ.GrimDawn.cData('C:/Program Files (x86)/Steam/SteamApps/common/Grim Dawn/mods/dev_Wanez/source/Text_EN/modtags_wanezGen-gear.txt',new WZ.GrimDawn.Parser.cTags()),
    
    /**
     * Prepare Affix combinations (dynamically, if a position inside the .items array changes it will change the file as well)
     * @param {object} $aAffixes - affixes object, (settings, items)
     * @param {int} [$curPos] - at which position to start inside the affixes.items array
     * @param {int} [$curCount] - the current settings.count of the max count to combine affixes (eg. combine 3 different affixes)
     * @return {Array} with object pairs (objects have field, mul, weight and isPet)
     */
    createAffixCombinations: function($aAffixes,$curPos,$curCount){
        $curPos = $curPos + 1 || 0;
        $curCount = $curCount || 1;
        
        let aAffixes = [],tempObj,tempArr01,tempArr02;
        
        for(let i = $curPos; i < $aAffixes.items.length; i++){
            $aAffixes.items[i].ID = i; // add ID for filename
            if($aAffixes.settings.count > $curCount) {
                tempObj = this.createAffixCombinations($aAffixes,i,$curCount+1);
                for( let $_Index in tempObj){
                    tempArr01 = [];
                    tempArr01.push($aAffixes.items[i]);
                    
                    tempArr02 = tempObj[$_Index];
                    
                    aAffixes.push(tempArr01.concat(tempArr02));
                }
            }
            aAffixes.push([$aAffixes.items[i]]);
            
        }
        
        return aAffixes;
    },
    
    getAffixData: function($aAffixes,$type){
        let objData = {},objCounter = {"normal":1,"rare":1},tempCounter,tempRarity,tempArr,
            objTables = $aAffixes[$type].getTables(),tempTable;
        
        let strTable = ["{0}TableName{1}","{0}TableLevelMin{1}","{0}TableLevelMax{1}","{0}TableWeight{1}"];
        
        for( let $_Index in objTables ){
            tempTable = objTables[$_Index];
            tempRarity = tempTable.getTableRarity(true);
            tempArr = [(tempRarity === "rare") ? tempRarity+$type : $type.toLowerCase(),objCounter[tempRarity]];
            
            objData[strTable[0].wzOut(tempArr)] = tempTable.getTableName();
            objData[strTable[1].wzOut(tempArr)] = 1;
            objData[strTable[2].wzOut(tempArr)] = 250;
            objData[strTable[3].wzOut(tempArr)] = 100;
            
            objCounter[tempRarity]++;
        }
        //console.log(objData);
        return objData;
    },
    
    genGear: function($tier){
        let aAffixes = {},aArmor = {},aLootTables = [],aBlueprints = [],
            armorSettings = this.gearConfig.get(`${this.contentType}.settings`),
            affix = this.gearConfig.get(`${this.contentType}.settings.affix`),
            curLevel = this.gearConfig.get(`${this.contentType}.settings.levels.${$tier}`),
            blueprintData = false,blueprintType = false,tempBlueprintClass;
        
        // prepare Blueprint DATA
        blueprintData = armorSettings.blueprints || false;
        if(blueprintData) blueprintType = blueprintData.type || false;
        
        // AFFIXES \\ Split in 'Prefix', 'Suffix', 'Blacksmith'
        for(let $_Type in this.aAffixes[affix]){
            aAffixes[$_Type] = new WZ.GrimDawn.Wanez.mAffixes(this.aAffixes[affix][$_Type],curLevel,this.affixesConfig.get(`${affix}.${$_Type}.settings`),$tier); // this.Base._wzAffixes.getData()[affix][$_Type].settings
        }
        //console.log(aAffixes);
        
        // ARMOR \\ UPGRADES WITH BUTTONS (MAYBE)
        for(let $_Index in this.aArmor[this.contentType]){
            aArmor[$_Index] = new WZ.GrimDawn.Wanez.mArmor(this.aArmor[this.contentType],curLevel,armorSettings,$tier,this.gearConfig.get(`${this.contentType}.items`),$_Index); // this.Base._wzGear.getData()[this.contentType].items
        }
        //console.log(aArmor);
        // BLUEPRINTS & LOOT-TABLES \\
        if(armorSettings.lootBy === "Slot"){
            // prepare affixes
            let objSuffixData = this.getAffixData(aAffixes,"Suffix"),
                objPrefixData = this.getAffixData(aAffixes,"Prefix"),
                affixData = Object.assign({},objSuffixData,objPrefixData),tempArmor,tempTableData,tempArmorCounter,tempTypeSlot,tempLootTableClass;
            
            let strTable = ["lootName{0}","lootWeight{0}"];
            
            //console.log(affixData);
            
            for( let $_Index in aArmor ){
                //aArmor[$_Index]
                for(let $_TypeSlot in aArmor[$_Index].getData()){
                    tempArmorCounter = 1;
                    tempArmor = {};
                    for( let $_Index02 in aArmor[$_Index].getData()[$_TypeSlot] ){
                        tempTableData = aArmor[$_Index].getData()[$_TypeSlot][$_Index02].getTableData();
                        tempArmor[strTable[0].wzOut([tempArmorCounter])] = tempTableData[0];
                        tempArmor[strTable[1].wzOut([tempArmorCounter])] = tempTableData[1];
                        tempArmorCounter++;
                        tempTypeSlot = $_TypeSlot;
                    }
                    tempLootTableClass = new WZ.GrimDawn.Wanez.cLootTable(tempArmor,affixData,{
                        "TYPE_SLOT": tempTypeSlot,
                        "INDEX": $_Index,
                        "TIER": $tier
                    },armorSettings.lootTableFile);
                    aLootTables.push(tempLootTableClass);
                    
                    // BLUEPRINT
                    if(blueprintType === "LootTable"){
                        tempBlueprintClass = new WZ.GrimDawn.Wanez.cBlueprint(blueprintData,tempLootTableClass.getTableFileName(),{
                            "TYPE_SLOT": tempTypeSlot,
                            "INDEX": $_Index,
                            "TIER": $tier,
                            "TYPE": this.mergedGearAssets[tempTypeSlot].Array[0],
                            "SLOT": this.mergedGearAssets[tempTypeSlot].Array[1],
                            "LVL": armorSettings.levels[$tier]
                        },this.mergedGearAssets[tempTypeSlot].Asset);
                        tempBlueprintClass.genFileName();
                        aBlueprints.push(tempBlueprintClass);
                    }
                }
            }
        }
        //console.log(aBlueprints);
        //console.log(aLootTables);
        
        this.curData = {
            "Armor": aArmor,
            "Affixes": aAffixes,
            "LootTables": aLootTables,
            "BluePrints": aBlueprints
        };
    },
    
    saveCurrentData: function(){
        //console.log(this.curData);
        //return true;
        
        // SAVE affixes / only save new & changed files
        for( let $_Type in this.curData["Affixes"] ){
            // cAffixes => SAVE
            this.curData["Affixes"][$_Type].saveAffixes([this._tagsGear]);
        }
        
        // SAVE items / only save new & changed files
        for( let $_Type in this.curData["Armor"] ){
            // cArmor => SAVE
            this.curData["Armor"][$_Type].saveArmor([this._tagsGear]);
        }
        
        // SAVE BluePrints
        for( let $_Type in this.curData["BluePrints"] ){
            // cBlueprint => SAVE
            this.curData["BluePrints"][$_Type].saveDBR([this._tagsGear],true);
            this.curData["BluePrints"][$_Type].saveRandomArtifactFile();
        }
        
        // SAVE lootTables
        for( let $_Type in this.curData["LootTables"] ){
            // cLootTable => SAVE
            this.curData["LootTables"][$_Type].saveDBR([this._tagsGear],true);
        }
        
        //this.saveTags();
    },
    saveTags: function(){
        this._tagsGear.saveData();
    },
    
    iniArmorDefault: function(){
        let curType,curSlot,aVariations,curVariation,tempData,tempVariation,aVariationTemp,tempItemVariation,tempItems,
            propSettings = appData[`gd-properties`].settings; // _wzData.GrimDawn.Properties.getData().settings;
        if(!this.aArmor[this.contentType]){
            this.aArmor[this.contentType] = {};
            
            for( let $_Index in this.cur_wzGear.items ){
                this.aArmor[this.contentType][$_Index] = {};
                
                tempItems = this.cur_wzGear.items[$_Index];
                for( let $_Type in tempItems){
                    this.aArmor[this.contentType][$_Index][$_Type] = {};
                    
                    curType = tempItems[$_Type];
                    for( let $_Slot in curType ){
                        aVariations = [];
                        
                        curSlot = curType[$_Slot];
                        for( let $_Index in curSlot.variations ){
                            tempVariation = [];
                            aVariationTemp = [];
                            // .variations
                            curVariation = (Array.isArray(curSlot.variations[$_Index])) ? curSlot.variations[$_Index] : propSettings.armorVariations[curSlot.variations[$_Index]];
                            
                            for( let $_Index02 in curVariation ){
                                tempData = Object.assign({},curVariation[$_Index02]);
                                if($_Type === "Armor" && $_Index02 == 0) { // was $_Index02 == 0
                                    tempData.mul = tempData.mul * this.armorMul[$_Slot];
                                    //tempData.mul = this.armorMul[$_Slot];
                                    //tempData.mul = tempData.mul;
                                    //console.log(`armorMul: ${$_Slot} - ${$_Index02} - ${tempData.mul}`);
                                    //console.log(tempData.mul);
                                }
                                tempVariation.push(tempData);
                            }
                            
                            tempData.Variation = $_Index;
                            // .explicit
                            if(curSlot.explicit){
                                for( let $_Index02 in curSlot.explicit ){
                                    tempData = curSlot.explicit[$_Index02];
                                    tempData.Count = $_Index02;
                                    tempItemVariation = [tempData].concat(tempVariation);
                                    aVariationTemp.push(tempItemVariation);
                                }
                            }
                            aVariations.push(aVariationTemp);
                        }
                        this.aArmor[this.contentType][$_Index][$_Type][$_Slot] = aVariations;
                    }
                }
                
            }
        }
    },
    
    iniArmor: function(){
        if(this.cur_wzGear.settings.type === "default"){
            this.iniArmorDefault();
        }
        
        //console.log(this.aArmor[this.contentType]);
    },
    
    iniAffixes: function(){
        let affix = this.gearConfig.get(`${this.contentType}.settings.affix`), // this.Base._wzGear.getData()[this.contentType].settings.affix
            wzAffixes = this.affixesConfig.get(`${affix}`), // this.Base._wzAffixes.getData()
            tempAffixes,retAffixes = {};
        
        if(!this.aAffixes[affix]){
            this.aAffixes[affix] = {};
            
            for(let $_type in wzAffixes){ // wzAffixes[affix]
                tempAffixes = this.createAffixCombinations(wzAffixes[$_type]); // wzAffixes[affix]
                this.aAffixes[affix][$_type] = tempAffixes;
                retAffixes[$_type] = tempAffixes;
                //this.aAffixes[affix][$_type] = this.createAffixes(tempAffixes);
            }
        }
        
        //console.log(this.aAffixes[affix]);
        return retAffixes;
        
    },
    
    assetMerge: function(){
        this.mergedGearAssets = this.mergedGearAssets || {};
        let tempType;
        let gearData = {
            "Accessory":{
                "Amulet": ``,
                "Offhand": ``,
                "Ring": ``,
                "Shield": ``,
                "Waist": ``,
                "Medal": ``
            },
            "Armor":{
                "Chest": ``,
                "Feet": ``,
                "Hands": ``,
                "Head": ``,
                "Legs": ``,
                "Shoulders": ``
            },
            "Weapon1H":{
                "Axe": ``,
                "Dagger": ``,
                "Gun": ``,
                "Mace": ``,
                "Scepter": ``,
                "Sword": ``,
            },
            "Weapon2H":{
                "Axe": ``,
                "Gun": ``,
                "Mace": ``,
                "Sword": ``,
            }
        };
        for( let $_Type in gearData ){
            tempType = gearData[$_Type];
            for( let $_Slot in tempType ){
                this.mergedGearAssets[$_Type+$_Slot] = {
                    "Array": [$_Type,$_Slot],
                    "Asset": `${$_Type}${$_Slot}`// tempType[$_Slot]
                };
            }
        }
        //console.log(this.mergedGearAssets);
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        if(!this.mergedGearAssets) this.assetMerge();
        let out_ = '';
        //new WZ.GrimDawn.cBase();
        /*
         if($contentType){
         console.log('New ContentType: '+this.contentType);
         }
         */
        if(this.contentType){
            this.cur_wzGear = this.gearConfig.get(`${this.contentType}`); // this.Base._wzGear.getData()[this.contentType]
            let aAffixes = this.iniAffixes(),
                tempBtns = [],
                aLevels = this.gearConfig.get(`${this.contentType}.settings.levels`); // this.Base._wzGear.getData()[this.contentType].settings.levels
            this.iniArmor();
            for(let $_Index in aLevels){
                tempBtns.push({
                    "ONCLICK": "_cms.genGear("+$_Index+");",
                    "TEXT": aLevels[$_Index]
                });
            }
            
            out_ = appData.tpl.Buttons.Default.wzParseTPL(tempBtns);
            //out_ = 'ok';
        }
        
        
        //out_ = this.Base.Paths.Core+'<br />'+this.Base.Paths.Mod;
        
        //let something = new WZ.GrimDawn.cBase();
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [
            {
                "ONCLICK": "_cms.saveCurrentData()",
                "TEXT": "Save"
            }, {
                "ONCLICK": "_cms.saveTags()",
                "TEXT": "Save Tags"
            }, {
                "ONCLICK": "_cms.Base.saveGearBlacksmith()",
                "TEXT": "Save BS Lvl"
            }
        ];
    },
    sidebarList_: function(){
        return this.gearConfig.store; // this.Base._wzGear.getData()
    }
    
};