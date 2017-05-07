/**
 * Created by WareBare on 4/21/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mRunicInscriptions extends libWZ.GrimDawn.cModule{
    
    constructor($runeConfig,$runeType,$slotToStone,$materiaProperties){
        super();
        
        this.runeType = $runeType;
        this.runeConfig = $runeConfig;
        this.runeSettings = $runeConfig.get(`Settings`);
        this.runeData = this.runeConfig.get(`Items.${this.runeType}`);
        this.iSlotToStone = $slotToStone;
        // appData[`app-gd`].Gear.types || appData[`app-gd`].Gear.slots
        this.aSlotTagsCombo = {
            "All Weapons": [`axe`,`mace`,`sword`,`dagger`,`scepter`,`ranged1h`,`ranged2h`,`axe2h`,`mace2h`,`sword2h`],
            "Melee Weapons": [`axe`,`mace`,`sword`,`dagger`,`axe2h`,`mace2h`,`sword2h`],
            "One-Handed Melee Weapons": [`axe`,`mace`,`sword`,`dagger`],
            "Two-Handed Melee Weapons": [`ranged2h`,`axe2h`,`mace2h`,`sword2h`],
            "Ranged Weapons": [`ranged1h`,`ranged2h`],
            "Axes": [`axe`,`axe2h`],
            "Maces": [`mace`,`mace2h`],
            "Swords": [`sword`,`sword2h`],
            "Caster Weapons": [`staff`,`scepter`],
            "All Armor": [`head`,`shoulders`,`hands`,`chest`,`waist`,`legs`,`feet`]
        };
        this.aSlotTags = {
            'amulet': `Amulets`,
            'ring': `Rings`,
            'medal': `Medals`,
            'head': `Head Armor`,
            'shoulders': `Shoulder Armor`,
            'hands': `Hand Armor`,
            'chest': `Chest Armor`,
            'waist': `Waist`,
            'legs': `Leg Armor`,
            'feet': `Boots`,
            'shield': `Shields`,
            'offhand': `Off-Hands`,
            'spear': `Spears`,
            'staff': `Staves`,
            'axe': `One-Handed Axes`,
            'mace': `One-Handed Maces`,
            'sword': `One-Handed Swords`,
            'dagger': `Daggers`,
            'scepter': `Scepters`,
            'ranged1h': `One-Handed Guns`,
            'ranged2h': `Two-Handed Guns`,
            'axe2h': `Two-Handed Axes`,
            'mace2h': `Two-Handed Maces`,
            'sword2h': `Two-Handed Swords`
        };
        this.iMateriaProperties = $materiaProperties || false;
        
        this.tpl = {
            Content: `<div id="appGD_RunicInscriptions"><div class="runesList">{RUNES}</div><div class="inscriptionsList">{INSCRIPTIONS}</div><div></div></div>`,
            listItem: `<div>{ID} - {NAME}<div class="materia">{MATERIA}</div></div>`
        };
        this.tplRunes = {
            "TagNAME": "tagWaRunes_ItemsRune_{RUNE_TYPE}{RUNE_ID}{TIER}{IS_RUNE}_NAME",
            "TagDESC": "tagWaRunes_ItemsRune_{RUNE_TYPE}{RUNE_ID}{TIER}{IS_RUNE}_DESC",
            "File": "{RUNE_TYPE}_{RUNE_ID}{TIER}{IS_RUNE}.dbr",
            "LuaHook": "wanez.fn.gRunes.useRune{RUNE_TYPE}{RUNE_ID}",
            "LuaFN": "function wanez.fn.gRunes.useRune{RUNE_TYPE}{RUNE_ID}() wanez.Runes.useRune('{RUNE_TYPE}',{RUNE_ID_INT},{TIER_INT});end;",
            "luaEvents": { // todo different events
                "onDestroy": {
                    "key": "wanez.fn.gRunes.useRune{RUNE_TYPE}{RUNE_ID}",
                    "value": "wanez.Runes.useRune('{RUNE_TYPE}',{RUNE_ID_INT},{TIER_INT});",
                    "args": ""
                }
            }
        };
        this.tierSuffix = ['','a','b','c','d','e','f','g'];
        this.itemClassifications = ['Common','Common','Magical','Rare','Epic','Legendary'];
        this.pathBlueprints = `${this.runeSettings.Paths._runes}/${this.runeSettings.Paths.Blueprints}`;
        this.pathRunes = `${this.runeSettings.Paths._runes}/${this.runeSettings.Paths.Runes}`;
        this.pathInscriptions = `${this.runeSettings.Paths._runes}/${this.runeSettings.Paths.Inscriptions}`;
    
        this.aUI = {
            "Runes": [],
            "Inscriptions": []
        };
        
        this.aTags = {};
        this.aLuaFN = {};
        this.aLuaData = {};
        this.aData = [];
        
        //this.aRunes = this.iniRunes();
        //this.aInscriptions = this.iniInscriptions();
    
        // OLD \\
        
        // prepare Runes
        this.aRunes = this.iniData(true);
    
        // prepare Inscriptions
        this.aInscriptions = this.iniData(false);
        
    }
    
    
    
    iniProperties(){
    
    }
    
    iniInscriptions(){
    
    }
    
    
    iniData($isRune = false){
        let aData = [],baseStats,tempComp,aRepNames,tempFile,tempItemLevel,tempLuaData,tempSlotTags,
            modeStr = ($isRune) ? 'Runes' : 'Inscriptions',
            iData = ($isRune) ? this.runeData.Runes : this.runeData.Inscriptions;
        
        
        
        for( let $_Id in iData.Items ){
            baseStats = {};
            aData[$_Id] = [];
            
            // get tiers and fileNames
            let tempRuneString,
                aRuneStrings = [];
            
            aRepNames = {
                "RUNE_TYPE": this.runeType,
                "RUNE_ID": (`00${$_Id}`).slice(-3), // this.parseIntToString($_Id,2)
                "IS_RUNE": ($isRune) ? '' : '_Inscription'
            };
            // create Tiers \\
            for( let i = 0; i <= iData.Items[$_Id].maxTier; i++ ){
                tempFile = false;
                if(!$isRune && i === 0){ //
                    aRepNames.TIER = '{1}';
                    this.aLuaData[$_Id] = {
                        "FileName": this.tplRunes.File.wzOut(aRepNames).toLocaleLowerCase().replace('.dbr',''),
                        "Ratio": (iData.Items[$_Id].Ratio) ? iData.Items[$_Id].Ratio : 100,
                        "Stone": [this.iSlotToStone[iData.Items[$_Id].Slots[0]].iGearType.toLocaleLowerCase(),iData.Items[$_Id].Slots[0]],
                        "Runes": iData.Items[$_Id].Runes,
                        "Tiers": iData.Items[$_Id].maxTier
                    };
                    //console.log(this.aLuaData[$_Id]);
                }else{
                    aData[$_Id][i] = {};
                    // Calculate Base stats
                    if(i !== 0) {
                        baseStats = {};
                        baseStats = this.genBaseStats(iData.Items[$_Id],iData.Settings.Scaling[parseInt(i)-1]);
                        aData[$_Id][i].Properties = baseStats;
                    }else{
                        baseStats = false;
                    }
                    tempSlotTags = this.genSlotTags(baseStats);
                    //console.log(tempSlotTags);
                    
                    
                    tempRuneString = {};
                    aRepNames.TIER = this.tierSuffix[i];
                    
                    // FILES \\
                    tempRuneString.FileName = this.tplRunes.File.wzOut(aRepNames).toLocaleLowerCase();
                    
                    // TAGS \\ - "Vitriolic stones formed in the bile of foul beasts."^w^n(Used in melee weapons, shields and caster off-hands)
                    tempRuneString.tagDesc = this.tplRunes.TagDESC.wzOut(aRepNames);
                    if(i === 0) this.aTags[tempRuneString.tagDesc] = this.runeSettings.Descriptions[0];
                    else if($isRune) this.aTags[tempRuneString.tagDesc] = `${this.runeSettings.Descriptions[1]}(${tempSlotTags})`;
                    else if(!$isRune) this.aTags[tempRuneString.tagDesc] = `${this.runeSettings.Descriptions[2]}(${tempSlotTags})`;
                    tempRuneString.tagName = this.tplRunes.TagNAME.wzOut(aRepNames);
                    this.aTags[tempRuneString.tagName] = iData.Items[$_Id].Title;
                    
                    // LUA \\
                    if(i === 0) {
                        tempLuaData = this.tplRunes.luaEvents.onDestroy;
                        tempRuneString.luaHook = tempLuaData.key.wzOut(aRepNames);
                        aRepNames.TIER_INT = iData.Items[$_Id].maxTier;
                        aRepNames.RUNE_ID_INT = $_Id;
                        //tempRuneString.luaFN = tempLuaData.key.wzOut(aRepNames);
                        this.aLuaFN[`${tempRuneString.luaHook}()`] = tempLuaData.value.wzOut(aRepNames);
                        
                    }
                    // ITEM_LEVEL \\
                    tempItemLevel = 1;
                    if(i !== 0) tempItemLevel = iData.Settings.ItemLevel[parseInt(i)-1];
                    
                    if(i === 0){ // SCROLL
                        //tempFile = new libWZ.GrimDawn.cScroll(wzGD_dataSet.PathsDS.Mod.Home+'/database/'+this.pathRunes+'/'+tempRuneString.FileName);
                        tempFile = new libWZ.GrimDawn.Assets.aScroll(`${this.pathRunes}/${tempRuneString.FileName}`);
                        //console.log('SCROLL');
                    }else if($isRune){ // RUNE
                        //tempFile = new libWZ.GrimDawn.RunicInscription.cRune(wzGD_dataSet.PathsDS.Mod.Home+'/database/'+this.pathRunes+'/'+tempRuneString.FileName);
                        tempFile = new libWZ.GrimDawn.Assets.aMateria(`${this.pathRunes}/${tempRuneString.FileName}`);
                        tempFile.editDBR({
                            shardBitmap: `wanez/items/runes/bitmaps/rune_compa_default.tex`,
                            relicBitmap: `wanez/items/runes/bitmaps/rune_compa_default.tex`
                        });
                    }else{ // INSCRIPTION
                        //tempFile = new libWZ.GrimDawn.RunicInscription.cInscription(wzGD_dataSet.PathsDS.Mod.Home+'/database/'+this.pathInscriptions+'/'+tempRuneString.FileName);
                        tempFile = new libWZ.GrimDawn.Assets.aEnchantment(`${this.pathInscriptions}/${tempRuneString.FileName}`);
                        tempFile.editDBR({
                            bitmap: `wanez/items/runes/bitmaps/inscription_default.tex`
                        });
                    }
                    
                    // FILE_RUNE \\// FILE_INSCRIPTION \\
                    if(baseStats) tempFile.editDBR(baseStats);
                    tempFile.editTagFields(tempRuneString.tagName,tempRuneString.tagDesc);
                    tempFile.editDBR({
                        "itemLevel": tempItemLevel,
                        "levelRequirement": tempItemLevel,
                        "itemCost": 1,
                        "onDestroy": tempRuneString.luaHook,
                        "itemClassification": this.itemClassifications[parseInt(i)]
                    });
                    
                    if(tempFile) this.aData.push(tempFile);
                    
                    //tempFile = false;
                    // FILE_BLUEPRINTS \\
                    if(i === 0 && iData.Settings.Reagent) {
                        tempRuneString.FileBlueprint = 'blueprint_'+tempRuneString.FileName;
                    }else{
                        tempRuneString.FileBlueprint = false;
                    }
                    
                    if(tempRuneString.FileBlueprint){
                        //tempFile = new libWZ.GrimDawn.cBlueprint(`${this.fn.getPaths().Mod}/${this.pathBlueprints}/${tempRuneString.FileBlueprint}`);
                        tempFile =  new libWZ.GrimDawn.Assets.aBlueprint(`${this.pathBlueprints}/${tempRuneString.FileBlueprint}`);
                        
                        tempFile.setReagent(
                            iData.Settings.Reagent,
                            iData.Items[$_Id].Components
                        );
                        
                        tempFile.editDBR({
                            artifactName: `${this.pathRunes}/${tempRuneString.FileName}`
                        });
                        if(tempFile) this.aData.push(tempFile);
                    }
                    
                    // PUSH
                    aData[$_Id][i].Names = tempRuneString;
                }
            }
            
            //if(iData.Settings.hasBlueprint) aData[$_Id].Blueprint = new libWZ.GrimDawn.cBlueprint();
            
            //aData[$_Id] = iData.Items[$_Id].Title;
            //aData[$_Id] = ($isRune) ? new libWZ.GrimDawn.RunicInscription.cRune() : new libWZ.GrimDawn.RunicInscription.cInscription();
            //console.log(aData[$_Id]);
            // UI
            //this.aUI[modeStr].push(this.genUIElement($_Id,true));
        }
        
        return aData;
    }
    
    genSlotTags($baseStats){
        let tags_ = ``,aSlots = {},objRep,tempSlots,isChoice = true;
        
        for(let $_Index in this.aSlotTags){
            if( $baseStats[$_Index] && $baseStats[$_Index] !== `0`){
                //if(tags_ !== '') tags_ += `, `;
                //tags_ += `${this.aSlotTags[$_Index]}`;
                aSlots[$_Index] = this.aSlotTags[$_Index];
            }
        }
        
        // check for slot groups
        for(let $_Tag in this.aSlotTagsCombo){
            tempSlots = this.aSlotTagsCombo[$_Tag];
            isChoice = true;
            for(let $_Index in tempSlots){
                if(!aSlots[tempSlots[$_Index]]){
                    isChoice = false;
                }
            }
            if(isChoice){
                for(let $_Index in tempSlots){
                    delete aSlots[tempSlots[$_Index]];
                }
                if(tags_ !== '') {
                    tags_ += `, `;
                }else{
                    tags_ += `Used in `;
                }
                tags_ += `${$_Tag}`;
            }
        }
        // add remaining slots
        for(let $_Slot in aSlots){
            if(tags_ !== '') {
                if($_Slot === Object.keys(aSlots)[Object.keys(aSlots).length - 1] ){
                    tags_ += ` and `;
                }else{
                    tags_ += `, `;
                }
                
            }else{
                tags_ += `Used in `;
            }
            tags_ += `${aSlots[$_Slot]}`;
        }
        
        //console.log(tags_);
        
        return tags_;
    }
    
    /**
     * checks if:
     * - it has to combines component stats
     * - use new stats
     *
     * @param {Array} $data
     * @return {{}}
     */
    genBaseStats($data,$mul){
        let aBaseStats = {},tempComp;
        // COMPONENTS \\
        if($data.Components){
            for( let $_Index in $data.Components ){
                tempComp = this.iMateriaProperties[$data.Components[$_Index]];
                //console.log(tempComp);
                for( let $_FieldName in tempComp ){
                    aBaseStats[$_FieldName] = (aBaseStats[$_FieldName] && !isNaN(aBaseStats[$_FieldName])) ?
                        parseFloat(aBaseStats[$_FieldName]) + parseFloat(tempComp[$_FieldName]) :
                        tempComp[$_FieldName];
                }
            }
        }
        // INSCRIPTIONS \\
        if($data.Runes){
            for( let $_Index in $data.Runes ){
                // this.aRunes[$data.Runes[$_Index]][1]
                tempComp = this.aRunes[$data.Runes[$_Index]][1].Properties;
                //console.log(tempComp);
                for( let $_FieldName in tempComp ){
                    if(!this.iSlotToStone[$_FieldName]) {
                        aBaseStats[$_FieldName] = (aBaseStats[$_FieldName] && !isNaN(aBaseStats[$_FieldName])) ?
                            parseFloat(aBaseStats[$_FieldName]) + parseFloat(tempComp[$_FieldName]) :
                            tempComp[$_FieldName];
                    }
                }
            }
            
        }
        // add additional stats to aBaseStats
        if($data.Properties){
            for( let $_FieldName in $data.Properties ){
                aBaseStats[$_FieldName] = (aBaseStats[$_FieldName] && !isNaN(aBaseStats[$_FieldName])) ? (parseFloat(aBaseStats[$_FieldName]) + parseFloat($data.Properties[$_FieldName])) : $data.Properties[$_FieldName];
            }
        }
        
        // add SLOTS \\
        if($data.Slots){
            for( let $_Index in $data.Slots ){
                aBaseStats[$data.Slots[$_Index]] = 1;
            }
        }
        
        // MUL \\
        for( let $_FieldName in aBaseStats ){
            if(this.iSlotToStone[$_FieldName]){
                aBaseStats[$_FieldName] = (aBaseStats[$_FieldName]) ? 1 : 0;
            }else{
                if(!isNaN(aBaseStats[$_FieldName])) aBaseStats[$_FieldName] = aBaseStats[$_FieldName] * $mul;
            }
        }
        //console.log(aBaseStats);
        return aBaseStats;
    }
    
    /**
     *
     * @param $opt
     * @param $maxTier
     * @return {Array}
     */
    genRuneStrings($opt,$maxTier,$isRune){ // $runeId,$maxTier
    
    }
    
    genUIElement($id,$isRune = false){
        return {
            "TEXT": this.runeType + ' :: ' + $id,
            "BUTTON": _wzTPL.Main.Buttons.Default.wzOut({
                "ONCLICK": "_cms.writeData('"+this.runeType+"',"+$id+","+$isRune+");",
                "TEXT": "SAVE"
            })
        };
    }
    
    getUIArray($isRune = false){
        return (($isRune) ? this.aUI.Runes : this.aUI.Inscriptions);
    }
    
    getData($id,$isRune = false){
        let data = ($isRune) ? this.aRunes : this.aInscriptions;
        
        return data[$id];
    }
    
    getDataMisc(){
        return {
            "LuaFN": this.aLuaFN,
            "LuaData": this.aLuaData,
            "Tags": this.aTags
        };
    }
    
    saveRunicInscriptions(){
        //console.log(this.aData);
        for( let $_Index in this.aData ){
            this.aData[$_Index].saveDBR();
        }
    }
    
    genOutput(){
        let runes_ = ``,inscriptions_ = ``,tempList;
        
        for(let $_ID in this.runeData.Runes.Items){
            runes_ += this.tpl.listItem.wzOut({
                ID: $_ID,
                NAME: this.runeData.Runes.Items[$_ID].Title,
                MATERIA: this.runeData.Runes.Items[$_ID].Components
            })
        }
        for(let $_ID in this.runeData.Inscriptions.Items){
            tempList = ``;
            for(let $_Index in this.runeData.Inscriptions.Items[$_ID].Runes){
                tempList += this.tpl.listItem.wzOut({
                    ID: this.runeData.Inscriptions.Items[$_ID].Runes[$_Index],
                    NAME: this.runeData.Runes.Items[this.runeData.Inscriptions.Items[$_ID].Runes[$_Index]].Title,
                    MATERIA: ``
                });
            }
            inscriptions_ += this.tpl.listItem.wzOut({
                ID: $_ID,
                NAME: this.runeData.Inscriptions.Items[$_ID].Title,
                MATERIA: tempList
            })
        }
        
        return this.tpl.Content.wzOut({
            RUNES: runes_,
            INSCRIPTIONS: inscriptions_
        })
    }
    
};
