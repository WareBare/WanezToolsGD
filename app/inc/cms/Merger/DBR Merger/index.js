/**
 * Created by Ware on 7/28/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    mArrayTPL: {
        'database/templates/lootitemtable_dynweighted_dynaffix.tpl': true,
        'database/templates/proxy.tpl': true,
        'database/templates/proxyambush.tpl': true,
        'database/templates/lootrandomizertabledynamic.tpl': true,
    },
    mFieldPairs: { // string: its pair or empty string to add it to the classes array, true: if ignoring
        'lootName': `lootWeight`,
        'lootWeight': true,
        'pool': `weight`,
        'weight': true,
        'randomizerName': `randomizerWeight`,
        'randomizerWeight': true,
        'randomizerLevelMin': `randomizerLevelMax`,
        'randomizerLevelMax': true
    },
    
    /*
    _mNodeEditor: false,
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        if(!this._mNodeEditor) this._mNodeEditor = this.Base.iniNodeEditor({
            defOut: `noDefault`,
            Parent: `cMergerSetup`
        });
        
        let out_ = this._mNodeEditor.__getOutput();
        
        return out_;
    },
    */
    
    newProject(){
        console.log(`start new project`);
    },
    
    SetIgnore: function(el){
        this.Base.ProjectData.Data[this.contentType][0].bIgnore = el.checked;
        this.Base.mModsRecords[this.contentType][0].bIgnore = el.checked;
        
        this.DupeClasses = false;
        this.contentType = false;
        wzReloadCMS(10);
    },
    UseVanilla: function(el){
        this.Base.ProjectData.Data[this.contentType][0].bUseVanilla = el.checked;
        this.Base.mModsRecords[this.contentType][0].bUseVanilla = el.checked;
    
        this.DupeClasses = false;
        this.contentType = false;
        wzReloadCMS(10);
    },
    
    GoToEdit: function(InFile){
        this.contentType = InFile;
        this.Anchor = InFile;
        
        wzReloadCMS(10);
    },
    UpdateFieldData: function(InModData, InFieldData, bInShouldSave, InFieldName){
        if(bInShouldSave){
            InModData[InModData[0].mModIds[InFieldData.Mod]].Fields = InModData[InModData[0].mModIds[InFieldData.Mod]].Fields || {};
            InModData[InModData[0].mModIds[InFieldData.Mod]].Fields[InFieldName] = InFieldData.Value;
        }else{
            delete InModData[InModData[0].mModIds[InFieldData.Mod]].Fields[InFieldName];
        }
    },
    UpdateSelectedField: function(el,InFieldName, InModId){
        this.UpdateFieldData(
            this.Base.ProjectData.Data[this.contentType],
            this.DupeClasses[this.contentType].Fields[InFieldName][InModId],
            el.checked,
            InFieldName
        );
        this.UpdateFieldData(
            this.Base.mModsRecords[this.contentType],
            this.DupeClasses[this.contentType].Fields[InFieldName][InModId],
            el.checked,
            InFieldName
        );
        //console.log(this.Base.mModsRecords[this.contentType]);
    },
    UpdateArrayFieldData: function(InModData, InFieldValue, InArrayFieldName, bInShouldSave){
        if(bInShouldSave){
            InModData.mIgnore = InModData.mIgnore || {};
            InModData.mIgnore[InArrayFieldName] = InModData.mIgnore[InArrayFieldName] || {};
    
            InModData.mIgnore[InArrayFieldName][InFieldValue] = true;
        }else{
            delete InModData.mIgnore[InArrayFieldName][InFieldValue];
        }
    },
    UpdateSelectedArrayItem: function(el, InFieldValue, InArrayFieldName){
        this.UpdateArrayFieldData(
            this.Base.ProjectData.Data[this.contentType][0],
            InFieldValue,
            InArrayFieldName,
            el.checked
        );
        this.UpdateArrayFieldData(
            this.Base.mModsRecords[this.contentType][0],
            InFieldValue,
            InArrayFieldName,
            el.checked
        );
    },
    
    Content_Edit: function(){
        let out_ = `<h2>${this.contentType}</h2>`, FilePath, tempClasses = {}, isChecked,
            tempData = this.Base.mModsRecords[this.contentType],
            tempConfig = this.Base.ProjectData.Data[this.contentType],
            IgnoreBTN = `<label><input type="checkbox" onchange="_cms.SetIgnore(this);"{CHECKED} />Ignore</label>`,
            UseVanillaBTN = `<label><input type="checkbox" onchange="_cms.UseVanilla(this);"{CHECKED} />Use Vanilla</label>`;
        
        if(tempData.length > 2 || tempConfig[0].bUseVanilla){
            let TempField,
                TempArrayPair,
                outFields_ = ``,
                outArrayTotal_ = ``,
                outArray_ = ``,
                tplField = `<fieldset><legend>{FIELD_NAME}{PRIMARY_VALUE}</legend>{FIELD_ITEMS}</fieldset>`,
                outFieldItems_ = ``, //  class="{CHECKED}"
                tplFieldItem = `<fieldset><legend>{MOD_NAME}</legend><label><input type="checkbox" onchange="_cms.UpdateSelectedField(this,'{FIELD_NAME}','{MOD_ID}');"{CHECKED} /><span>{FIELD_VALUE}</span></label></fieldset>`,
                tplArrayTotal = `<fieldset><legend>{ARRAY_NAME}</legend>{ARRAYS}</fieldset>`,
                tplArrayItem = `<label><input type="checkbox" onchange="_cms.UpdateSelectedArrayItem(this, '{FIELD_VALUE}', '{ARRAY_FIELD_NAME}');"{CHECKED} /><span>{FIELD_VALUE}{FIELD_PAIR}</span></label>`;
            
            // ARRAYS \\
            if(this.DupeClasses[this.contentType].Arrays){
                //outArrays_
                for(let kArrayFieldName in this.DupeClasses[this.contentType].Arrays){
                    outArray_ = ``;
                    for(let kArrayFieldValue in this.DupeClasses[this.contentType].Arrays[kArrayFieldName]){
                        TempArrayPair = this.DupeClasses[this.contentType].Arrays[kArrayFieldName][kArrayFieldValue];
                        outArray_ += tplArrayItem.wzReplace({
                            FIELD_VALUE: kArrayFieldValue,
                            FIELD_PAIR: (typeof TempArrayPair === `boolean`) ? ``: ` | <span style="display: inline-block;color: indianred;">(${this.mFieldPairs[kArrayFieldName]}: ${TempArrayPair[this.mFieldPairs[kArrayFieldName]]})</span>`,
                            ARRAY_FIELD_NAME: kArrayFieldName,
                            CHECKED: (tempConfig[0].mIgnore && tempConfig[0].mIgnore[kArrayFieldName] && tempConfig[0].mIgnore[kArrayFieldName][kArrayFieldValue]) ? ` checked` : ``
                        });
                    }
                    outArrayTotal_ += tplArrayTotal.wzReplace({
                        ARRAY_NAME: kArrayFieldName,
                        ARRAYS: outArray_
                    });
                }
            }
            // FIELDS \\
            for(let kFieldName in this.DupeClasses[this.contentType].Fields){
                outFieldItems_ = ``;
                TempField = this.DupeClasses[this.contentType].Fields[kFieldName];
                let TempPrimaryValue = false;
                
                if(!this.mFieldPairs[kFieldName.replace(/\d+$/, "")]){
                    if(TempField.length > 1 || tempData[0].mModIds[this.Base.ProjectData.PrimaryMod] || tempConfig[0].bUseVanilla){
                        for(let kIndex in TempField){
                            let bIsDifferentFromPrimary = true;
                            if(tempData[0].mModIds[this.Base.ProjectData.PrimaryMod] || tempConfig[0].bUseVanilla){
                                TempPrimaryValue = (isNaN(this.DupeClasses[this.contentType].Merged.__getField(kFieldName)) || this.DupeClasses[this.contentType].Merged.__getField(kFieldName) === ``) ? this.DupeClasses[this.contentType].Merged.__getField(kFieldName) : parseFloat(this.DupeClasses[this.contentType].Merged.__getField(kFieldName));
                                // make sure arrays with numbers don't get false positives
                                if(Array.isArray(TempPrimaryValue)){
                                    for(let kTempIndex in TempPrimaryValue){
                                        TempPrimaryValue[kTempIndex] = (isNaN(TempPrimaryValue[kTempIndex]) || TempPrimaryValue[kTempIndex] === ``) ? TempPrimaryValue[kTempIndex] : parseFloat(TempPrimaryValue[kTempIndex]);
                                    }
                                }
                
                                bIsDifferentFromPrimary = (JSON.stringify(TempPrimaryValue) !== JSON.stringify(TempField[kIndex].Value));
                
                            }
            
                            if(bIsDifferentFromPrimary){
                                isChecked = false;
                                if(tempConfig[tempConfig[0].mModIds[TempField[kIndex].Mod]].Fields && tempConfig[tempConfig[0].mModIds[TempField[kIndex].Mod]].Fields[kFieldName]){
                                    tempData[tempData[0].mModIds[TempField[kIndex].Mod]].Fields = tempData[tempData[0].mModIds[TempField[kIndex].Mod]].Fields || {};
                                    tempData[tempData[0].mModIds[TempField[kIndex].Mod]].Fields[kFieldName] = tempConfig[tempConfig[0].mModIds[TempField[kIndex].Mod]].Fields[kFieldName];
                                    isChecked = true;
                                }
                
                                outFieldItems_ += tplFieldItem.wzReplace({
                                    MOD_NAME: TempField[kIndex].Mod,
                                    MOD_ID: kIndex,
                                    FIELD_NAME: kFieldName,
                                    FIELD_VALUE: TempField[kIndex].Value,
                                    CHECKED: (isChecked) ? ` checked` : ``
                                });
                            }
                        }
                        if(outFieldItems_ !== ``){
                            outFields_ += tplField.wzReplace({
                                PRIMARY_VALUE: (TempPrimaryValue) ? ` - ${TempPrimaryValue}` : ``,
                                FIELD_NAME: kFieldName,
                                FIELD_ITEMS: outFieldItems_
                            });
                        }
                    }
                }
            }
            
            out_ += `<div>${IgnoreBTN.wzReplace({CHECKED: (tempConfig[0].bIgnore) ? ` checked` : `` })}${UseVanillaBTN.wzReplace({CHECKED: (tempConfig[0].bUseVanilla) ? ` checked` : `` })}</div><div class="MergerDBR">${outArrayTotal_}</div><div class="MergerDBR">${outFields_}</div>`;
        }else{
            out_ += `If you want to go back use the "Back" button on the right, it can take a moment to load. Setting the field to be ignored will bring you back without using the button.<div>${IgnoreBTN.wzReplace({CHECKED: (tempConfig[0].bIgnore) ? ` checked` : `` })}${UseVanillaBTN.wzReplace({CHECKED: (tempConfig[0].bUseVanilla) ? ` checked` : `` })}</div>`;
        }
        
        return out_;
    },
    
    Content_Main: function(){
        let out_ = ``,
            UniqueRecords_ = false, DupeRecords_ = false,
            tempData, tempConfig,
            Style = `new`,
            mIgnoreFromMastery = this.Base.ProjectData.mIgnoreFromMastery,
            bLoadData = (!this.DupeClasses);
        
        if(bLoadData){
            this.uniqueRecords = this.uniqueRecords || [];
            this.dupeRecords = this.dupeRecords || [];
            
            UniqueRecords_ = `<h2>Unique Records</h2>`;
            DupeRecords_ = `<h2>Dupe Records</h2>`;
            
            for(let $_File in this.Base.mModsRecords){
                tempData = this.Base.mModsRecords[$_File];
                this.Base.ProjectData.Data = this.Base.ProjectData.Data || JSON.parse(JSON.stringify(this.Base.mModsRecords));
                this.Base.ProjectData.Data[$_File] = this.Base.ProjectData.Data[$_File] || JSON.parse(JSON.stringify(this.Base.mModsRecords[$_File]));
                if(JSON.stringify(this.Base.ProjectData.Data[$_File][0].mModIds) !== JSON.stringify(this.Base.mModsRecords[$_File][0].mModIds)){
                    this.Base.ProjectData.Data[$_File] = JSON.parse(JSON.stringify(this.Base.mModsRecords[$_File]));
                }
                if(this.Base.ProjectData.Data[$_File][0].mIgnore){
                    this.Base.mModsRecords[$_File][0].mIgnore = this.Base.mModsRecords[$_File][0].mIgnore || {};
                    if(JSON.stringify(this.Base.ProjectData.Data[$_File][0].mIgnore) !== JSON.stringify(this.Base.mModsRecords[$_File][0].mIgnore)){
                        this.Base.mModsRecords[$_File][0].mIgnore = JSON.parse(JSON.stringify(this.Base.ProjectData.Data[$_File][0].mIgnore));
                    }
                }
                
                tempConfig = this.Base.ProjectData.Data[$_File];
        
                this.Base.ProjectData.Data[$_File][0].bToUpdate = true;
                if(tempConfig[0].bUseVanilla){
                    this.Base.mModsRecords[$_File][0].bUseVanilla = true;
                    Style = `hasoriginal`;
                }else if( tempConfig[0].mModIds[this.Base.ProjectData.PrimaryMod] ){
                    Style = `hasoriginal`;
                }
                
                if(mIgnoreFromMastery && mIgnoreFromMastery[$_File]){
                    Style = `hasmastery`;
                }else if(tempConfig[0].bIgnore){
                    Style = `ignore`;
                    this.Base.mModsRecords[$_File][0].bIgnore = true;
                }else if(tempConfig[0].bToUpdate){
                    if(tempConfig[0].Timestamp < tempData[0].Timestamp || tempConfig[0].bIsNew){
                        if(Style !== `hasoriginal`){
                            Style = `toupdate`;
                            if(tempConfig[0].bIsNew){
                                Style = `new`;
                            }
                        }
                    }else{
                        this.Base.ProjectData.Data[$_File][0].bToUpdate = false;
                        Style = `noupdate`;
                    }
                }else{
                    Style = `noupdate`;
                }
                this.Base.mModsRecords[$_File][0].bIsNew = false;
        
        
                if(this.Base.mModsRecords[$_File].length > 2 || this.Base.mModsRecords[$_File][0].bUseVanilla){
                    if(bLoadData && Style !== `hasmastery`){ // (Style === `toupdate` || Style === `new` || Style === `hasoriginal`) &&
                        this.DupeClasses = this.DupeClasses || {};
                        this.DupeClasses[$_File] = this.DupeClasses[$_File] || {Mods: {}, Merged: false, Fields: {}};
                        let bHasDupeFields = false,
                            TempTPL,
                            mArrayTPL = this.mArrayTPL,
                            mFieldPairs = this.mFieldPairs,
                            bIsArray = false;
                        
                        for(let kIndex in this.Base.mModsRecords[$_File]){
                            if(parseInt(kIndex) && bLoadData){
                                let TempClass = new WZ.GrimDawn.cData(`${appConfig.get(`Merger.Paths.Sources`)}/${tempData[kIndex].Mod}/database/${$_File}`);
                                
                                TempTPL = TempClass.__getField(`templateName`);
    
                                // lists like LootTables need special treatment
                                //bIsArray = (mArrayTPL[TempTPL]);
                                
                                for(let kField in TempClass.getData()){
                                    let TempFieldValue = TempClass.__getField(kField),
                                        TempValue,
                                        ArrayFieldName = kField.replace(/\d+$/, "");
                                    
                                    // make sure values don't cause false positives (10.0 and 10.000000 should be the same, which they are converted to a float they are 10.0 and 10.0)
                                    TempValue = (isNaN(TempFieldValue) || TempFieldValue === ``) ? TempFieldValue : parseFloat(TempFieldValue);
    
                                    // make sure arrays with numbers don't get false positives
                                    if(Array.isArray(TempValue)){
                                        for(let kTempIndex in TempValue){
                                            TempValue[kTempIndex] = (isNaN(TempValue[kTempIndex]) || TempValue[kTempIndex] === ``) ? TempValue[kTempIndex] : parseFloat(TempValue[kTempIndex]);
                                        }
                                    }
    
                                    bIsArray = (mArrayTPL[TempTPL] && mFieldPairs[ArrayFieldName]);
                                    
                                    if(tempConfig[0].bUseVanilla || tempData[kIndex].Mod !== this.Base.ProjectData.PrimaryMod){
                                        
                                        this.DupeClasses[$_File].Fields[kField] = this.DupeClasses[$_File].Fields[kField] || [];

                                        if(this.DupeClasses[$_File].Fields[kField][0]){
                                            if(JSON.stringify(this.DupeClasses[$_File].Fields[kField][0].Value) !== JSON.stringify(TempValue)){
                                                this.DupeClasses[$_File].Fields[kField].push({
                                                    Mod: tempData[kIndex].Mod,
                                                    Value: TempValue
                                                });
                                                bHasDupeFields = true;
                                            }
                                        }else{
                                            this.DupeClasses[$_File].Fields[kField].push({
                                                Mod: tempData[kIndex].Mod,
                                                Value: TempValue
                                            });
                                        }
                                    }
                                    if(bIsArray && bHasDupeFields) { // LIST \\
        
                                        if (typeof mFieldPairs[ArrayFieldName] === `string` && TempValue !== ``) {
                                            this.DupeClasses[$_File].Arrays = this.DupeClasses[$_File].Arrays || {};
                                            this.DupeClasses[$_File].Arrays[ArrayFieldName] = this.DupeClasses[$_File].Arrays[ArrayFieldName] || {};
            
                                            let FieldPairName = (mFieldPairs[ArrayFieldName] !== ``) ? mFieldPairs[ArrayFieldName] : false,
                                                mFieldPair = false,
                                                TempFieldPairValue = TempClass.__getField(`${FieldPairName}${kField.replace(ArrayFieldName, ``)}`);
            
            
                                            if (TempFieldPairValue) {
                                                TempFieldPairValue = (isNaN(TempFieldPairValue) || TempFieldPairValue === ``) ? TempFieldPairValue : parseFloat(TempFieldPairValue);
                                                mFieldPair = {};
                                                mFieldPair[FieldPairName] = TempFieldPairValue;
                                            }
                                            if (this.DupeClasses[$_File].Arrays[ArrayFieldName][TempValue]) {
                                                if (tempData[kIndex].Mod === tempConfig.PrimaryMod) { // primary mod will override pair value
                                                    this.DupeClasses[$_File].Arrays[ArrayFieldName][TempValue][FieldPairName] = TempFieldPairValue;
                                                }
                                            } else {
                                                this.DupeClasses[$_File].Arrays[ArrayFieldName][TempValue] = (mFieldPair) ? mFieldPair : true; // typeof x === `boolean` to check if it's an object/map
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(bHasDupeFields || tempData[0].mModIds[this.Base.ProjectData.PrimaryMod] || tempConfig[0].bUseVanilla){
                            this.dupeRecords.push($_File);
                            DupeRecords_ += `<label id="${$_File}" class="${Style}MergeFile" onclick="_cms.GoToEdit('${$_File}');">${$_File}</label>`;
                            
                            // the data class used to generate the DBR
                            this.DupeClasses[$_File].Merged = new WZ.GrimDawn.cData(
                                (tempConfig[0].bUseVanilla) ? `${WZ.GrimDawn.tFn.getPaths().Core}/${$_File}` :
                                `${appConfig.get(`Merger.Paths.Sources`)}/${
                                    (tempData[0].mModIds[this.Base.ProjectData.PrimaryMod]) ?
                                        this.Base.ProjectData.PrimaryMod : tempData[1].Mod
                                }/database/${$_File}`
                            ) ;
                            this.DupeClasses[$_File].Merged.changeFilePath(`${WZ.GrimDawn.tFn.getPaths().Mod.split(`/mods/`)[0]}/mods/${this.Base.ProjectName}/database/${$_File}`);
                            //console.log( this.DupeClasses[$_File]);
                        }else{
                            this.uniqueRecords.push($_File);
                            UniqueRecords_ += `<label id="${$_File}" class="${Style}MergeFile" onclick="_cms.GoToEdit('${$_File}');">${$_File}</label>`;
                        }
                    }
                }else if(Style !== `hasmastery`){
                    this.uniqueRecords.push($_File);
                    UniqueRecords_ += `<label id="${$_File}" class="${Style}MergeFile" onclick="_cms.GoToEdit('${$_File}');">${$_File}</label>`;
                    //console.log($_File);
                }
            }
            
            
        }
        
        //if(this.bToSave){
            this.Base.SaveProjectConfig();
            this.bToSave = false;
        //}
        
        this.UniqueRecords_ = UniqueRecords_ || this.UniqueRecords_;
        this.DupeRecords_ = DupeRecords_ || this.DupeRecords_;
        
        let gloss = {
            OnOut: function(){
                return `${this.NewFile} | ${this.FileToUpdate} | ${this.OldFile} | ${this.HasOriginal} | ${this.IgnoreFile}`;
            },
            NewFile: `<span class="newMergeFile">New File</span>`,
            FileToUpdate: `<span class="toupdateMergeFile">File To Update</span>`,
            OldFile: `<span class="noupdateMergeFile">Old File (no Update)</span>`,
            HasOriginal: `<span class="hasoriginalMergeFile">Has Original</span>`,
            IgnoreFile: `<span class="ignoreMergeFile">Ignore File</span>`
        };
        
        out_ = `<div class="MergerDBRContainer" style="display: block;">${gloss.OnOut()}</div><div class="MergerDBRContainer" style="display: inline-block;vertical-align: top;">${this.DupeRecords_}</div> <div class="MergerDBRContainer" style="display: inline-block;vertical-align: top;">${( this.bShowUniqueRecords ) ? this.UniqueRecords_ : `<h2>Unique Records</h2><p>Use the button on the right "Show Records" to enable/disable unique records listing. <br />Disabled by default because it increases loading times, but still has some use if some records should not be copied.</p>`}</div>`;
        //console.log(this.DupeClasses);
        return out_;
    },
    
    content_: function(InContentType){
        this.contentType = InContentType || this.contentType;
        let out_ = `Loading...`;
        
        //this.Anchor = `records/items/faction/weapons/guns1h/f005_gun1h.dbr`;
        if(this.Base.ProjectName){
            if(this.contentType){
                out_ = this.Content_Edit();
            }else{
                out_ = this.Content_Main();
            }
        }else{
            out_ = `You need to select a Project first.`;
        }
        
        if(this.Anchor){
            let Anchor = this.Anchor;
            setTimeout(function(){
                location.href = "#"+Anchor;
            }, 10);
            //document.getElementById(this.Anchor).scrollIntoView();
        }
        
        return out_;
    },
    
    OnGenerateDBR: function(){
        let PrimaryMod = this.Base.ProjectData.PrimaryMod,
            mUniqueRecords = this.uniqueRecords,
            mDupeRecords = this.dupeRecords,
            mData = this.Base.ProjectData.Data,
            //mIgnoreFromMastery = this.Base.ProjectData.mIgnoreFromMastery,
            TempFilePath, TempModName,
            TempPathSource,
            HomePathSource = `${appConfig.get(`Merger.Paths.Sources`)}`,
            HomePathTarget = `${WZ.GrimDawn.tFn.getPaths().Mod.split(`/mods/`)[0]}/mods/${this.Base.ProjectName}/database`;
        
        // UNIQUE \\
        for(let kIndex in mUniqueRecords){
            TempFilePath = mUniqueRecords[kIndex];
            //  && (mIgnoreFromMastery && !mIgnoreFromMastery[TempFilePath])
            if(mData[TempFilePath][0].bToUpdate && !mData[TempFilePath][0].bIgnore ){
                TempModName = mData[TempFilePath][1].Mod;
                /*
                fs.copy(`${HomePathSource}/${TempModName}/database/${TempFilePath}`, `${HomePathTarget}/${TempFilePath}`, err => {
                    if (err) return console.error(err);
                    console.log('success!');
                });
                */
                
                try {
                    fs.copySync(`${HomePathSource}/${TempModName}/database/${TempFilePath}`, `${HomePathTarget}/${TempFilePath}`);
                    //console.log(`${HomePathTarget}/${TempFilePath}`);
                    //console.log('success!')
                } catch (err) {
                    console.error(err);
                    wzNotify.err(`Unable to copy a unique File.`,`An Error Copying Files!`);
                }
            }
        }
        // DUPE \\
        let TempData, TempClass, iCounter, TempMap, TempFieldName, TempPairName, TempPairValue;
        
        for(let kIndex in mDupeRecords){
            TempFilePath = mDupeRecords[kIndex];
            TempData = this.DupeClasses[TempFilePath];
            TempClass = TempData.Merged;
            TempMap = {};
            // && (mIgnoreFromMastery && !mIgnoreFromMastery[TempFilePath])
            if(mData[TempFilePath][0].bToUpdate){
                // Array \\
                if(TempData.Arrays){
                    for(let kArrayFieldName in TempData.Arrays){
                        iCounter = 1;
                        for(let kFieldName in TempData.Arrays[kArrayFieldName]){
                            if(mData[TempFilePath][0].mIgnore && mData[TempFilePath][0].mIgnore[kArrayFieldName] && mData[TempFilePath][0].mIgnore[kArrayFieldName][kFieldName]){
                                //console.log(`ignore array field`);
                            }else{
                                //console.log(kFieldName);
                                TempFieldName = `${kArrayFieldName}${iCounter}`;
                                TempPairName = false;
                                if(typeof TempData.Arrays[kArrayFieldName][kFieldName] !== `boolean`){
                                    // PairName & PairValue
                                    for(let kPairName in TempData.Arrays[kArrayFieldName][kFieldName]){
                                        TempPairName = `${kPairName}${iCounter}`;
                                        TempPairValue = TempData.Arrays[kArrayFieldName][kFieldName][kPairName];
                                    }
                                }
                    
                                TempMap[TempFieldName] = kFieldName;
                                if(TempPairName){
                                    TempMap[TempPairName] = TempPairValue;
                                }
                    
                                iCounter++;
                            }
                        }
                        // mData[TempFilePath][1]
                    }
                }
                // Non-Array \\
                for(let kModId in mData[TempFilePath]){
                    if(mData[TempFilePath][kModId].Fields){
                        for(let kFieldName in mData[TempFilePath][kModId].Fields){
                            if(Array.isArray(mData[TempFilePath][kModId].Fields[kFieldName])){
                                // ToDo Array special case
                            }
                            TempMap[kFieldName] = mData[TempFilePath][kModId].Fields[kFieldName];
                        }
                    }
                }
    
                TempClass.editDBR(TempMap);
                console.log(TempClass);
            }
            TempClass.saveDBR();
        }
        
        // override JSON.Data
        this.Base.ProjectData.Data = this.Base.mModsRecords;
        
        this.Base.SaveProjectConfig();
        
        this.DupeClasses = false;
        wzReloadCMS(10);
    },
    
    GenerateDbr: function(){
        wzLoadingCMS(true);
        //let $this = this;
        setTimeout(function(){
            _cms.OnGenerateDBR();
        }, 10);
    },
    ReturnToMainView: function(){
        this.contentType = false;
        wzReloadCMS(10);
    },
    ResetDataLoader: function(){
        this.DupeClasses = false;
        wzReloadCMS(10);
    },
    ShowUniqueRecords: function(bInShowUniqueRecords){
        this.bShowUniqueRecords = bInShowUniqueRecords || false;
        wzReloadCMS(10);
    },
    ResetTimestamps: function(){
        let mData = this.Base.ProjectData.Data;
        
        for(let kRecordName in this.Base.ProjectData.Data){
            this.Base.ProjectData.Data[kRecordName][0].Timestamp = 0;
        }
        
        this.Base.SaveProjectConfig();
    
        this.DupeClasses = false;
        wzReloadCMS(10);
    },
    
    sidebarBtns_: function(){
        let ReturnToMainViewBTN = {},
            ResetDataLoaderBTN = {},
            ShowUniqueRecordsBTN = {},
            GenerateDbrBTN = {},
            ResetTimestampsBTN = {};
        
        if(this.contentType){
            ReturnToMainViewBTN = {
                "ONCLICK": `_cms.ReturnToMainView()`,
                "TEXT": "Back"
            };
        }else{
            if(this.Base.ProjectName){
                ResetDataLoaderBTN = {
                    "ONCLICK": `_cms.ResetDataLoader()`,
                    "TEXT": "Reload Data"
                };
                GenerateDbrBTN = {
                    "ONCLICK": `_cms.GenerateDbr()`,
                    "TEXT": "Generate DBR"
                };
                ResetTimestampsBTN = {
                    "ONCLICK": `_cms.ResetTimestamps()`,
                    "TEXT": "Reset Timestamps"
                };
                if(this.bShowUniqueRecords){
                    ShowUniqueRecordsBTN = {
                        "ONCLICK": `_cms.ShowUniqueRecords(false)`,
                        "TEXT": "Hide Records"
                    };
                }else{
                    ShowUniqueRecordsBTN = {
                        "ONCLICK": `_cms.ShowUniqueRecords(true)`,
                        "TEXT": "Show Records"
                    };
                }
            }
            
        }
        
        
        return [
            GenerateDbrBTN,
            ReturnToMainViewBTN,
            ResetDataLoaderBTN,
            ShowUniqueRecordsBTN,
            ResetTimestampsBTN
        ];
    },
    sidebarList_: function(){
        return {}
    }
    
};
