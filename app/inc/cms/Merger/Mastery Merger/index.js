/**
 * Created by Ware on 10/18/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

/*
 * this.Base.ProjectData
 *  |-- Mods: obj
 *  |-- Data: obj
 *  |-- PrimaryMod: str
 *  ------------------------
 *  |-- mIgnoreFromMastery
 *      |-- `record`: true
 *  |-- Masteries
 *      |-- `SkillTreePath`
 *          //|-- SkillTreePath: `relative path to skill tree: _classtree_class.dbr` -> key for mSkillTrees and referenced in malepc01.dbr
 *          |-- ClassTrainingPath: `relative path to: _classtraining_class.dbr` -> for enum, name and desc
 *          |-- ClassTablePath: `relative path to: classtable.dbr` -> in ui for mastery name and desc
 *          |-- ModName: str -> for path and radio button
 *          |-- Enum: str (because of the 0 in 01... . convert to int if not needed)
 */
module.exports = {
    tplContent: {},
    
    mIgnoreVanillaMasteries: {
        'records/skills/playerclass01/_classtree_class01.dbr': `01`,
        'records/skills/playerclass02/_classtree_class02.dbr': `02`,
        'records/skills/playerclass03/_classtree_class03.dbr': `03`,
        'records/skills/playerclass04/_classtree_class04.dbr': `04`,
        'records/skills/playerclass05/_classtree_class05.dbr': `05`,
        'records/skills/playerclass06/_classtree_class06.dbr': `06`,
        'records/skills/playerclass07/_classtree_class07.dbr': `07`,
        'records/skills/playerclass08/_classtree_class08.dbr': `08`
    },
    
    aSelectionButtonCoords: [
        [  0,  0],
        [ 28, 19],
        [ 28, 59],
        [ 28, 99],
        [ 28,139],
        [ 28,179],
        [ 28,219],
        [ 28,259],
        [ 28,299],
        [ 28,339],
        [ 28,379],
        [ 28,419],
        [ 28,459],
        [ 28,499],
        [195,239],
        [195,279],
        [195,319],
        [195,359],
        [195,399],
        [195,439],
        [195,479],
        [774, 19],
        [774, 59],
        [774, 99],
        [774,139],
        [774,179],
        [774,219],
        [774,259],
        [774,299],
        [774,339],
        [774,379],
        [774,419],
        [774,459],
        [774,499],
        [607,239],
        [607,279],
        [607,319],
        [607,359],
        [607,399],
        [607,439],
        [607,479],
    ],
    
    ClassSelectionTable: {
        masteryMasteryButtons: `records/ui/skills/classselection/skills_classselectionbutton{ENUM}.dbr`,
        masteryMasteryText: `records/ui/skills/classselection/skills_classselectiontext{ENUM}.dbr`,
        
        // masteryMasterySelectedBitmapNames,X.tex,
        // Vanilla: ui/skills/skillallocation/skills_classimage{ENUM}.tex
        // PlaceHolder: WanezTools/ui/skills/classselection/skills_classimage00.tex
        masteryMasterySelectedDescriptionTags: `tagSkillClassDescription{ENUM}`,
        
        // # records/ui/skills/classselection/skills_classselectionscrollbox.dbr
        ScrollBoxCoords: [230, 20],
        // # records/ui/skills/classselection/skills_classselectionimage.dbr
        MasteryImageCoords: [379, 211] // bitmapName,,
        
    },
    
    // # records/ui/skills/classselection/skills_classselectionbackgroundimage.dbr
    // ClassSelectionBackgroundImage,merger/ui/skills/classselection/skills_classselectionbackgroundimage.tex,
    
    // # BUTTONS
    // bitmapNameUp
    // bitmapNameDown
    // bitmapNameInFocus
    // bitmapNameDisabled
    // ---
    // rolloverStyleName,records/ui/styles/rollover/style_default.dbr,
    // textStyleName,records/ui/styles/text/style_special_skillnames.dbr,
    // rolloverTag,tagMergerClassModName{MOD_NAME},
    
    // _classtraining_class.dbr
    // |-- skillDisplayName     - tagClass01SkillName00A
    // |-- skillBaseDescription - tagClass01SkillDescription00A
    
    // classtable.dbr
    // |-- skillTabTitle           - tagSkillClassName01
    // |-- skillPaneDescriptionTag - tagSkillClassDescription01
    
    OnComboBoxEnumChange: function(el, InSkillTreeRecord){
        //console.log(InSkillTreeRecord);
        //console.log(el.value);
    
        this.Base.ProjectData.Masteries[InSkillTreeRecord].Enum = el.value;
        this.Base.SaveProjectConfig();
        
        wzReloadCMS(10);
    },
    
    OnMasteryMergerRadioChange: function(el, InSkillTreeRecord){
        if(el.checked) this.Base.ProjectData.Masteries[InSkillTreeRecord].ModName = el.value;
        this.Base.SaveProjectConfig();
    },
    
    Content_Main: function(){
        let out_ = ``,
            MasteryData = this.Base.ProjectData.Masteries || {},
            MergerPath = appConfig.get(`Merger.Paths.Sources`),
            TempTags, TempTagFiles,
            mSkillTrees = {},
            TempMaleData,
            TempPath,
            TempSkillTreeClass,
            TempTrainingClass;
        //console.log(this.Base.ProjectData);
        //console.log(this.Base.mModsRecords);
        this.Base.mTags = this.Base.mTags || {};
        this.aMasteryEnum = [];
        
        // load malepc01.dbr
        if(this.Base.mModsRecords[`records/creatures/pc/malepc01.dbr`]){
            
            for(let kModName in this.Base.mModsRecords[`records/creatures/pc/malepc01.dbr`][0].mModIds){
                // load tags and merge them per mod (since I won't know where the needed tags are)
                TempTags = {};
                try{
                    TempTagFiles = fs.readdirSync(`${MergerPath}/${kModName}/source/text_en/`);
                    //console.log(TempTagFiles);
                    for(let kIndex in TempTagFiles){
                        Object.assign(TempTags, JSON.parse(JSON.stringify( new WZ.GrimDawn.cData(`${MergerPath}/${kModName}/source/text_en/${TempTagFiles[kIndex]}`, `Tags`).getData() ) ));
                    }
                }catch(err){ console.log(err); }
                this.Base.mTags[kModName] = JSON.parse(JSON.stringify(TempTags));
                
                // load skilltrees
                TempMaleData = new WZ.GrimDawn.cData(`${MergerPath}/${kModName}/database/records/creatures/pc/malepc01.dbr`).getData();
                for(let kFieldName in TempMaleData){
                    if(kFieldName.startsWith(`skillTree`) && TempMaleData[kFieldName] !== ``){
                        mSkillTrees[ TempMaleData[kFieldName] ] = mSkillTrees[ TempMaleData[kFieldName] ] || {};
    
                        if(this.mIgnoreVanillaMasteries[ TempMaleData[kFieldName] ] && !mSkillTrees[ TempMaleData[kFieldName] ][`Vanilla`]){
                            mSkillTrees[ TempMaleData[kFieldName] ][`Vanilla`] = `${WZ.GrimDawn.tFn.getPaths().Core}`;
                        }
                        if(this.Base.mModsRecords[ TempMaleData[kFieldName] ]){
                            mSkillTrees[ TempMaleData[kFieldName] ][kModName] = `${MergerPath}/${kModName}/database`;
                        }
                    }
                }
            }
            //console.log(mSkillTrees);
            
            // OUTPUT \\
            let aTempMasteryEnum = [], iCounter, TempMasteryMods_,
                MasterySetupFrameTPL = `<div class="MergerDBR"><div style="display: inline-block; vertical-align: top;"><h2>Set Enum</h2>{MASTERIES_SETUP}</div><div style="display: inline-block; vertical-align: top;"><h2>With Enum</h2>{MASTERY_ENUMED}</div></div>`,
                MasterySetupTPL = `<fieldset><legend>Enumeration: {ENUM}</legend>{RECORD_SKILL_TREE}<br /><select onchange="_cms.OnComboBoxEnumChange(this,'{RECORD_SKILL_TREE}');"><option value="0">New Enum</option>{COMBO_ITEMS}</select>{MASTERY_MODS}</fieldset>`,
                MasteryModTPL = `<label class="masteryMergerRadio"><input type="radio" onchange="_cms.OnMasteryMergerRadioChange(this, '{RECORD_SKILL_TREE}');" name="{RECORD_SKILL_TREE}" value="{MOD_NAME}"{CHECKED} /><span>{MOD_NAME}</span></label>`,
                MasterySetupFrame_ = ``,
                MasterySetups_ = ``,
                MasteryMods_ = ``,
                TempMasteryMod_ = ``,
                //tplComboBoxEnum = `<select onchange="_cms.OnComboBoxEnumChange(this,'{}');"><option value="0">New Enum</option>{ITEMS}</select>`,
                tplComboBoxItem = `<option value="{ENUM}">{ENUM}</option>`,
                ComboBoxEnumItems_ = ``;
            for(let kSkillTreeRecord in mSkillTrees){
                iCounter = 0;
                MasteryData[kSkillTreeRecord] = MasteryData[kSkillTreeRecord] || {
                        ModName: false,
                        Enum: (this.mIgnoreVanillaMasteries[kSkillTreeRecord]) ? this.mIgnoreVanillaMasteries[kSkillTreeRecord]: `00`
                        // ${Math.floor(Math.random() * 29) + 1}
                    };
                TempMasteryMod_ = ``;
                for(let kMasteryName in mSkillTrees[kSkillTreeRecord]){
                    if(!MasteryData[kSkillTreeRecord].ModName && iCounter === 0){
                        MasteryData[kSkillTreeRecord].ModName = kMasteryName;
                    }
                    TempMasteryMod_ += MasteryModTPL.wzReplace({
                        MOD_NAME: kMasteryName,
                        // (!MasteryData[kSkillTreeRecord].ModName && iCounter === 0) ||
                        CHECKED: ( (MasteryData[kSkillTreeRecord].ModName === kMasteryName) ) ? ` checked` : ``
                    });
                    iCounter++;
                }
                TempMasteryMods_ = MasterySetupTPL.wzReplace({
                    ENUM: MasteryData[kSkillTreeRecord].Enum,
                    
                    MASTERY_MODS: TempMasteryMod_
                });
                TempMasteryMods_ = TempMasteryMods_.wzReplace({
                    RECORD_SKILL_TREE: kSkillTreeRecord
                });
                if( parseInt(MasteryData[kSkillTreeRecord].Enum) && !aTempMasteryEnum[parseInt(MasteryData[kSkillTreeRecord].Enum)] ){
                    aTempMasteryEnum[ parseInt(MasteryData[kSkillTreeRecord].Enum) ] = TempMasteryMods_;
                    this.aMasteryEnum.push(kSkillTreeRecord);
                }else{
                    MasteryMods_ += TempMasteryMods_;
                }
            }
            MasterySetups_ = MasteryMods_;
            MasteryMods_ = ``;
            for(let kEnum in aTempMasteryEnum){
                MasteryMods_ += aTempMasteryEnum[kEnum];
            }
            //this.aMasteryEnum = aTempMasteryEnum;
            
            MasterySetupFrame_ = MasterySetupFrameTPL.wzReplace({
                MASTERIES_SETUP: MasterySetups_,
                MASTERY_ENUMED: MasteryMods_
            });
            
            for(let i = 1; i <= 40; i++){
                if(!aTempMasteryEnum[i]){
                    ComboBoxEnumItems_ += tplComboBoxItem.wzReplace({
                        ENUM: i
                    });
                }
            }
            
            out_ += MasterySetupFrame_.wzReplace({
                COMBO_ITEMS: ComboBoxEnumItems_
            });
            this.mClassTags = TempTags;
            
            this.Base.ProjectData.Masteries = MasteryData;
            this.Base.SaveProjectConfig();
        }else{
            out_ = `There is no "records/creatures/pc/malepc01.dbr" in your selected Mods and therefore no Masteries to merge!`;
        }
        
        
        return out_;
    },
    
    content_: function(InContentType){
        this.contentType = InContentType || this.contentType;
        let out_ = `Loading...`;
    
        if(this.Base.ProjectName){
            if(this.contentType){
                //out_ = this.Content_Edit();
            }else{
                out_ = this.Content_Main();
            }
        }else{
            out_ = `You need to select a Project first.`;
        }
        
        return out_;
    },
    
    OnGenerateMasteries: function(){
        //this.Base.mTags[kModName]
        
        // TempClassTree TempModName TempClassTablePath _TempClassTree
        
        let aData = [],
            MergerPath = appConfig.get(`Merger.Paths.Sources`),
            VanillaPath = WZ.GrimDawn.tFn.getPaths().Core,
            ModPath = `${WZ.GrimDawn.tFn.getPaths().Mod.split(`/mods/`)[0]}/mods/${this.Base.ProjectName}/database`,
            PrimaryMod = this.Base.ProjectData.PrimaryMod,
            
            AssetsSourcePath = `${dirAssets}/merger/source`,
            AssetsAssetsPath = `${dirAssets}/merger/assets`,
            ProjectSourcePath = `${WZ.GrimDawn.tFn.getPaths().Mod.split(`/mods/`)[0]}/mods/${this.Base.ProjectName}/source/WanezTools/ui/skills/classselection`,
            ProjectAssetsPath = `${WZ.GrimDawn.tFn.getPaths().Mod.split(`/mods/`)[0]}/mods/${this.Base.ProjectName}/assets/WanezTools/ui/skills/classselection`,
            bCopyAssets = true,
            aMasterySelectButton = [],
            aMasterySelectText = [],
            aMasterySelectedImages = [],
            aMasterySelectedDescriptionTags = [],
            
            ModsRecords = this.Base.mModsRecords,
            MasteryData = this.Base.ProjectData.Masteries,
            aMasteryEnums = this.aMasteryEnum,
            TempImageClass, TempComboTag,
            mClassTags = this.Base.mTags,
            mNewTags = {},
            mIgnoreFromMastery = {},
            
            mMasterTables = {},
            mClassSelectionTables = {},
            
            MalePCPath = (ModsRecords[`records/creatures/pc/malepc01.dbr`] && ModsRecords[`records/creatures/pc/malepc01.dbr`][0].mModIds[PrimaryMod]) ? `${MergerPath}/${PrimaryMod}/database/records/creatures/pc/malepc01.dbr` : `${VanillaPath}/records/creatures/pc/malepc01.dbr`,
            FemalePCPath = (ModsRecords[`records/creatures/pc/femalepc01.dbr`] && ModsRecords[`records/creatures/pc/femalepc01.dbr`][0].mModIds[PrimaryMod]) ? `${MergerPath}/${PrimaryMod}/database/records/creatures/pc/femalepc01.dbr` : `${VanillaPath}/records/creatures/pc/femalepc01.dbr`,
            SkillsMasterTablePath = (ModsRecords[`records/ui/skills/skills_mastertable.dbr`] && ModsRecords[`records/ui/skills/skills_mastertable.dbr`][0].mModIds[PrimaryMod]) ? `${MergerPath}/${PrimaryMod}/database/records/ui/skills/skills_mastertable.dbr` : `${VanillaPath}/records/ui/skills/skills_mastertable.dbr`,
            SkillsClassSelectionTablePath = (ModsRecords[`records/ui/skills/classselection/skills_classselectiontable.dbr`] && ModsRecords[`records/ui/skills/classselection/skills_classselectiontable.dbr`][0].mModIds[PrimaryMod]) ? `${MergerPath}/${PrimaryMod}/database/records/ui/skills/classselection/skills_classselectiontable.dbr` : `${VanillaPath}/records/ui/skills/classselection/skills_classselectiontable.dbr`,
            // load basic files
            _MalePC = new WZ.GrimDawn.cData(MalePCPath),
            _FemalePC = new WZ.GrimDawn.cData(FemalePCPath),
            _SkillsMasterTable = new WZ.GrimDawn.cData(SkillsMasterTablePath),
            _SkillsClassSelectionTable = new WZ.GrimDawn.cData(SkillsClassSelectionTablePath),
    
            _SkillsClassSelectionScrollBox = new WZ.GrimDawn.cData(`${VanillaPath}/records/ui/skills/classselection/skills_classselectionscrollbox.dbr`),
            _SkillsClassSelectionImage = new WZ.GrimDawn.cData(`${VanillaPath}/records/ui/skills/classselection/skills_classselectionimage.dbr`),
            _SkillsClassSelectionBackgroundImage = new WZ.GrimDawn.cData(`${VanillaPath}/records/ui/skills/classselection/skills_classselectionbackgroundimage.dbr`),
            
            
            _SkillsClassSelectionButton = new WZ.GrimDawn.cData(`${VanillaPath}/records/ui/skills/classselection/skills_classselectionbutton01.dbr`),
            _SkillsClassSelectionText = new WZ.GrimDawn.cData(`${VanillaPath}/records/ui/skills/classselection/skills_classselectiontext01.dbr`),
            
            TempBasePath, mData;
        
        // Scroll BOX
        _SkillsClassSelectionScrollBox.__setField(`positionX`, `230`);
        _SkillsClassSelectionScrollBox.__setField(`positionY`, `20`);
        _SkillsClassSelectionScrollBox.changeFilePath(`${ModPath}/records/ui/skills/classselection/skills_classselectionscrollbox.dbr`);
        
        // IMAGE
        _SkillsClassSelectionImage.__setField(`bitmapPositionX`,`379`);
        _SkillsClassSelectionImage.__setField(`bitmapPositionY`,`211`);
        _SkillsClassSelectionImage.__setField(`bitmapName`, ``);
        _SkillsClassSelectionImage.changeFilePath(`${ModPath}/records/ui/skills/classselection/skills_classselectionimage.dbr`);
        
        // Background IMAGE
        _SkillsClassSelectionBackgroundImage.__setField(`bitmapName`, `waneztools/ui/skills/classselection/skills_classselectionbackgroundimage.tex`);
        _SkillsClassSelectionBackgroundImage.changeFilePath(`${ModPath}/records/ui/skills/classselection/skills_classselectionbackgroundimage.dbr`);
        
        // Selection BUTTON
        _SkillsClassSelectionButton.__setField(`bitmapNameUp`,`waneztools/ui/skills/classselection/skills_buttonclassselectionup02.tex`);
        _SkillsClassSelectionButton.__setField(`bitmapNameDown`,`waneztools/ui/skills/classselection/skills_buttonclassselectiondown02.tex`);
        _SkillsClassSelectionButton.__setField(`bitmapNameInFocus`,`waneztools/ui/skills/classselection/skills_buttonclassselectionover02.tex`);
        _SkillsClassSelectionButton.__setField(`bitmapNameDisabled`,`waneztools/ui/skills/classselection/skills_buttonclassselectiondisabled02.tex`);
        _SkillsClassSelectionButton.__setField(`rollOverStyleName`,`records/ui/styles/rollover/style_default.dbr`);
        _SkillsClassSelectionButton.__setField(`textStyleName`,`records/ui/styles/text/style_windowtitle01.dbr`);
        
        // Selection TEXT
        _SkillsClassSelectionText.__setField(`textBoxYSize`,`40`);
        _SkillsClassSelectionText.__setField(`textBoxXSize`,`159`);
        
        // change filepath for basic files (to mod)
        _MalePC.changeFilePath(`${ModPath}/records/creatures/pc/malepc01.dbr`);
        _FemalePC.changeFilePath(`${ModPath}/records/creatures/pc/femalepc01.dbr`);
        _SkillsMasterTable.changeFilePath(`${ModPath}/records/ui/skills/skills_mastertable.dbr`);
        _SkillsClassSelectionTable.changeFilePath(`${ModPath}/records/ui/skills/classselection/skills_classselectiontable.dbr`);
    
        mIgnoreFromMastery[`records/creatures/pc/malepc01.dbr`] = true;
        mIgnoreFromMastery[`records/creatures/pc/femalepc01.dbr`] = true;
        mIgnoreFromMastery[`records/ui/skills/skills_mastertable.dbr`] = true;
        mIgnoreFromMastery[`records/ui/skills/classselection/skills_classselectiontable.dbr`] = true;
    
        mIgnoreFromMastery[`records/ui/skills/classselection/skills_classselectionscrollbox.dbr`] = true;
        mIgnoreFromMastery[`records/ui/skills/classselection/skills_classselectionimage.dbr`] = true;
        mIgnoreFromMastery[`records/ui/skills/classselection/skills_classselectionbackgroundimage.dbr`] = true;
        
        mNewTags[`tagWanezTools_MasteryMerger_ModVanilla`] = `Vanilla`;
        mNewTags[`tagWanezTools_MasteryMerger_Mod`] = ``;
        // ClassTrainingPath
        // ClassTablePath
        // MAIN \\
        for(let kEnum in aMasteryEnums){
            aData[parseInt(MasteryData[ aMasteryEnums[kEnum] ].Enum)] = {
                ModName: MasteryData[ aMasteryEnums[kEnum] ].ModName,
                MasteryEnum: {
                    Original: false,
                    New: MasteryData[ aMasteryEnums[kEnum] ].Enum
                },
                ClassTree: {
                    Path: aMasteryEnums[kEnum]
                },
                ClassTraining: {},
                ClassTable: {},
                ClassImage: false
            };
            mData = aData[parseInt(MasteryData[ aMasteryEnums[kEnum] ].Enum)];
            mNewTags[`tagWanezTools_MasteryMerger_Mod${mData.ModName}`] = mData.ModName;
            
            if(mData.ModName === `Vanilla` && this.mIgnoreVanillaMasteries[mData.ClassTree.Path] === mData.MasteryEnum.New) {
                console.log(`Do Not Change Vanilla File: ${mData.ClassTree.Path}`);
                // records/ui/skills/class04/classtable.dbr
                mData.ClassTable.Path = `records/ui/skills/class${mData.MasteryEnum.New}/classtable.dbr`
            }else{
                TempBasePath = (mData.ModName === `Vanilla`) ? `${VanillaPath}` : `${MergerPath}/${mData.ModName}/database`;
                // get `records/skills/playerclass/_classtraining_class.dbr`
                try{
                    mData.ClassTree.Class = new WZ.GrimDawn.cData(`${TempBasePath}/${mData.ClassTree.Path}`);
                    mData.ClassTree.Class.changeFilePath(`${ModPath}/${mData.ClassTree.Path}`);
        
                    mData.ClassTraining.Path = mData.ClassTree.Class.__getField(`skillName1`);
                    mIgnoreFromMastery[ mData.ClassTraining.Path ] = true;
        
                    mData.ClassTraining.Class = new WZ.GrimDawn.cData(`${TempBasePath}/${mData.ClassTraining.Path}`);
                    mData.ClassTraining.Class.changeFilePath(`${ModPath}/${mData.ClassTraining.Path}`);
        
                    mData.MasteryEnum.Original = mData.ClassTraining.Class.__getField(`MasteryEnumeration`).replace(`SkillClass`, ``);
                    mData.ClassTraining.Class.__setField(`MasteryEnumeration`, `SkillClass${mData.MasteryEnum.New}`);
        
                    // TAGS \\
                    mNewTags[`tagClass${mData.MasteryEnum.New}SkillName00`] = mClassTags[mData.ModName][`${mData.ClassTraining.Class.__getField(`skillDisplayName`)}`];
                    mData.ClassTraining.Class.__setField(`skillDisplayName`, `tagClass${mData.MasteryEnum.New}SkillName00`);
                    
                    mNewTags[`tagClass${mData.MasteryEnum.New}SkillDescription00`] = mClassTags[mData.ModName][`${mData.ClassTraining.Class.__getField(`skillBaseDescription`)}`];
                    mData.ClassTraining.Class.__setField(`skillBaseDescription`, `tagClass${mData.MasteryEnum.New}SkillDescription00`);
                }catch(err){ console.log(err); }
    
                if(!mMasterTables[mData.ModName]){
                    try{
                        mMasterTables[mData.ModName] = new WZ.GrimDawn.cData(`${MergerPath}/${mData.ModName}/database/records/ui/skills/skills_mastertable.dbr`);
                    }catch (err){ console.log(err); }
                }
                if(!mClassSelectionTables[mData.ModName]){
                    try{
                        mClassSelectionTables[mData.ModName] = new WZ.GrimDawn.cData(`${MergerPath}/${mData.ModName}/database/records/ui/skills/classselection/skills_classselectiontable.dbr`);
                    }catch (err){ console.log(err); }
                }
                
                try{
                    // get ui file `records/ui/skills/class/classtable.dbr`
                    mData.ClassTable.Path = mMasterTables[mData.ModName].__getField(`skillCtrlPane${parseInt(mData.MasteryEnum.Original)}`);
                    mData.ClassTable.Class = new WZ.GrimDawn.cData(`${MergerPath}/${mData.ModName}/database/${mData.ClassTable.Path}`);
    
                    mData.ClassTable.Class.changeFilePath(`${ModPath}/${mData.ClassTable.Path}`);
                    mIgnoreFromMastery[mData.ClassTable.Path] = true;
                    
                    // TAGS \\
                    mNewTags[`tagSkillClassName${mData.MasteryEnum.New}`] = mClassTags[mData.ModName][`${mData.ClassTable.Class.__getField(`skillTabTitle`)}`];
                    mData.ClassTable.Class.__setField(`skillTabTitle`, `tagSkillClassName${mData.MasteryEnum.New}`);
                    
                    mNewTags[`tagSkillClassDescription${mData.MasteryEnum.New}`] = mClassTags[mData.ModName][`${mClassSelectionTables[mData.ModName].__getField(`masteryMasterySelectedDescriptionTags`)[parseInt(mData.MasteryEnum.Original) - 1]}`];
                    mData.ClassTable.Class.__setField(`skillPaneDescriptionTag`, `tagSkillClassDescription${mData.MasteryEnum.New}`);
    
                    
                    // get ui file `records/ui/skills/class/classimage.dbr`
                    TempImageClass = new WZ.GrimDawn.cData(`${MergerPath}/${mData.ModName}/database/${mData.ClassTable.Class.__getField(`skillPaneMasteryBitmap`)}`);
                    mData.ClassImage = TempImageClass.__getField(`bitmapName`);
                    
                }catch(err){ console.log(err); }
            }
    
            aMasterySelectButton[parseInt(mData.MasteryEnum.New) - 1] = this.ClassSelectionTable.masteryMasteryButtons.wzReplace({
                ENUM: mData.MasteryEnum.New
            });
            aMasterySelectText[parseInt(mData.MasteryEnum.New) - 1] = this.ClassSelectionTable.masteryMasteryText.wzReplace({
                ENUM: mData.MasteryEnum.New
            });
            aMasterySelectedImages[parseInt(mData.MasteryEnum.New) - 1] = (mData.ClassImage) ? mData.ClassImage : `ui/skills/skillallocation/skills_classimage{ENUM}.tex`.wzReplace({ENUM: mData.MasteryEnum.New});
            
            _MalePC.__setField(`skillTree${parseInt(mData.MasteryEnum.New)}`, mData.ClassTree.Path);
            _FemalePC.__setField(`skillTree${parseInt(mData.MasteryEnum.New)}`, mData.ClassTree.Path);
            _SkillsMasterTable.__setField(`skillCtrlPane${parseInt(mData.MasteryEnum.New)}`, mData.ClassTable.Path);
            //mIgnoreFromMastery[mData.ClassTree.Path] = true;
            
            // TAGS COMBO \\ tagSkillClassName0102
            if(mData.MasteryEnum.Original && mData.MasteryEnum.New){
                for(let i = 1; i <= 40; i++){
                    TempComboTag = mClassTags[mData.ModName][`tagSkillClassName${ (`0${i}`).slice(-2) }${mData.MasteryEnum.Original}`];
                    if(!TempComboTag){
                        TempComboTag = mClassTags[mData.ModName][`tagSkillClassName${mData.MasteryEnum.Original}${ (`0${i}`).slice(-2) }`];
                    }
                    if(TempComboTag === `` || TempComboTag === ` ` || TempComboTag === `?` || TempComboTag === "?.?" || (TempComboTag && TempComboTag.startsWith(`?`)) ) TempComboTag = false;
                    if(i < parseInt(mData.MasteryEnum.New) && TempComboTag){
                        mNewTags[`tagSkillClassName${ (`0${i}`).slice(-2) }${mData.MasteryEnum.New}`] = TempComboTag;
                    }else if(i > parseInt(mData.MasteryEnum.New) && TempComboTag){
                        mNewTags[`tagSkillClassName${mData.MasteryEnum.New}${ (`0${i}`).slice(-2) }`] = TempComboTag;
                    }
                }
            }
            
        }
        //console.log(mNewTags);
        for(let i = 1; i <= 40; i++){
            // records/ui/skills/classselection/skills_classselectionbutton{ENUM}.dbr
            mIgnoreFromMastery[this.ClassSelectionTable.masteryMasteryButtons.wzReplace({
                ENUM: (`0${i}`).slice(-2)
            })] = true;
            mIgnoreFromMastery[this.ClassSelectionTable.masteryMasteryText.wzReplace({
                ENUM: (`0${i}`).slice(-2)
            })] = true;
    
            if(!aMasterySelectButton[i - 1]){
                aMasterySelectButton[i - 1] = `ph_waneztools`;
            }
            if(!aMasterySelectText[i - 1]){
                aMasterySelectText[i - 1] = `ph_waneztools`;
            }
            if(!aMasterySelectedImages[i - 1]){
                aMasterySelectedImages[i - 1] = `waneztools/ui/skills/classselection/skills_classimage00.tex`;
            }
            aMasterySelectedDescriptionTags[i - 1] = `tagSkillClassDescription${ (`0${i}`).slice(-2) }`;
            
        }
    
        _SkillsClassSelectionTable.__setField(`masteryMasteryButtons`, aMasterySelectButton);
        _SkillsClassSelectionTable.__setField(`masteryMasteryText`, aMasterySelectText);
        _SkillsClassSelectionTable.__setField(`masteryMasterySelectedBitmapNames`, aMasterySelectedImages);
        _SkillsClassSelectionTable.__setField(`masteryMasterySelectedDescriptionTags`, aMasterySelectedDescriptionTags);
        
        for(let kEnum in aData){
            if(aData[kEnum].ClassTraining.Class){
                aData[kEnum].ClassTraining.Class.saveDBR();
            }
            if(aData[kEnum].ClassTable.Class){
                aData[kEnum].ClassTable.Class.saveDBR();
            }
        }
        
        // SAVE FILES \\
        try{
            // _SkillsClassSelectionTable
            fs.accessSync(`${_SkillsClassSelectionTable.filepath}`);
            bCopyAssets = false;
        }catch(err){
            console.log(`Create ClassSelection DBR`);
    
            _SkillsClassSelectionScrollBox.saveDBR();
            _SkillsClassSelectionImage.saveDBR();
            _SkillsClassSelectionBackgroundImage.saveDBR();
            
            for(let i = 1; i <= 40; i++){
                // BUTTON
                _SkillsClassSelectionButton.changeFilePath(`${ModPath}/records/ui/skills/classselection/skills_classselectionbutton${ (`0${i}`).slice(-2) }.dbr`);
                _SkillsClassSelectionButton.__setField(`bitmapPositionX`, this.aSelectionButtonCoords[i][0]);
                _SkillsClassSelectionButton.__setField(`bitmapPositionY`, this.aSelectionButtonCoords[i][1]);
                _SkillsClassSelectionButton.__setField(`rolloverTag`, `tagWanezTools_MasteryMerger_Mod${(aData[i]) ? aData[i].ModName : ``}`);
                _SkillsClassSelectionButton.saveDBR();
                
                // TEXT
                _SkillsClassSelectionText.changeFilePath(`${ModPath}/records/ui/skills/classselection/skills_classselectiontext${ (`0${i}`).slice(-2) }.dbr`);
                _SkillsClassSelectionText.__setField(`textTag`, `tagSkillClassName${ (`0${i}`).slice(-2) }`);
                _SkillsClassSelectionText.__setField(`textBoxX`, this.aSelectionButtonCoords[i][0]);
                _SkillsClassSelectionText.__setField(`textBoxY`, this.aSelectionButtonCoords[i][1]);
                _SkillsClassSelectionText.saveDBR();
            }
    
        }
        // SAVE TAGS \\
        let _Tags;
        try{
            fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod.split(`/mods/`)[0]}/mods/${this.Base.ProjectName}/source/text_en/aaWT_MergedMastery_${this.Base.ProjectName}.txt`);
            _Tags = new WZ.GrimDawn.cData(`${WZ.GrimDawn.tFn.getPaths().Mod.split(`/mods/`)[0]}/mods/${this.Base.ProjectName}/source/text_en/aaWT_MergedMastery_${this.Base.ProjectName}.txt`,`Tags`);
            
            for(let kTagName in mNewTags){
                if(!_Tags.aData[kTagName] || _Tags.aData[kTagName] === `undefined`){
                    _Tags.aData[kTagName] = mNewTags[kTagName];
                }
                console.log(mNewTags[kTagName]);
            }
        }catch (err){
            _Tags = new WZ.GrimDawn.cData(`${VanillaPath.split(`/database`)[0]}/resources/text_en/tags_skills.txt`,`Tags`);
            _Tags.aData = mNewTags;
            _Tags.changeFilePath(`${WZ.GrimDawn.tFn.getPaths().Mod.split(`/mods/`)[0]}/mods/${this.Base.ProjectName}/source/text_en/aaWT_MergedMastery_${this.Base.ProjectName}.txt`);
        }
        _Tags.dataUpdated = true;
        _Tags.saveData();
        console.log(_Tags);
        _MalePC.saveDBR();
        _FemalePC.saveDBR();
        _SkillsMasterTable.saveDBR();
        _SkillsClassSelectionTable.saveDBR();
        
        if(bCopyAssets){
            fs.copySync(`${AssetsSourcePath}/skills_buttonclassselectiondisabled02.tga`, `${ProjectSourcePath}/skills_buttonclassselectiondisabled02.tga`);
            fs.copySync(`${AssetsSourcePath}/skills_buttonclassselectiondown02.tga`, `${ProjectSourcePath}/skills_buttonclassselectiondown02.tga`);
            fs.copySync(`${AssetsSourcePath}/skills_buttonclassselectionover02.tga`, `${ProjectSourcePath}/skills_buttonclassselectionover02.tga`);
            fs.copySync(`${AssetsSourcePath}/skills_buttonclassselectionup02.tga`, `${ProjectSourcePath}/skills_buttonclassselectionup02.tga`);
            fs.copySync(`${AssetsSourcePath}/skills_classimage00.tga`, `${ProjectSourcePath}/skills_classimage00.tga`);
            fs.copySync(`${AssetsSourcePath}/skills_classselectionbackgroundimage.tga`, `${ProjectSourcePath}/skills_classselectionbackgroundimage.tga`);
    
            fs.copySync(`${AssetsAssetsPath}/skills_buttonclassselectiondisabled02.tex`, `${ProjectAssetsPath}/skills_buttonclassselectiondisabled02.tex`);
            fs.copySync(`${AssetsAssetsPath}/skills_buttonclassselectiondown02.tex`, `${ProjectAssetsPath}/skills_buttonclassselectiondown02.tex`);
            fs.copySync(`${AssetsAssetsPath}/skills_buttonclassselectionover02.tex`, `${ProjectAssetsPath}/skills_buttonclassselectionover02.tex`);
            fs.copySync(`${AssetsAssetsPath}/skills_buttonclassselectionup02.tex`, `${ProjectAssetsPath}/skills_buttonclassselectionup02.tex`);
            fs.copySync(`${AssetsAssetsPath}/skills_classimage00.tex`, `${ProjectAssetsPath}/skills_classimage00.tex`);
            fs.copySync(`${AssetsAssetsPath}/skills_classselectionbackgroundimage.tex`, `${ProjectAssetsPath}/skills_classselectionbackgroundimage.tex`);
        }
        
        //console.log(aData);
        this.Base.ProjectData.mIgnoreFromMastery = mIgnoreFromMastery;
        
        this.Base.SaveProjectConfig();
    },
    GenerateMasteries: function(){
        wzLoadingCMS(true);
        
        setTimeout(function(){
            _cms.OnGenerateMasteries();
        }, 10);
    },
    
    sidebarBtns_: function(){
        let GenerateMasteriesBTN = {};
        
        if(this.Base.ProjectName){
            GenerateMasteriesBTN = {
                "ONCLICK": `_cms.GenerateMasteries()`,
                "TEXT": "Generate"
            };
        }
        
        return [
            GenerateMasteriesBTN
        ];
    },
    sidebarList_: function(){
        return {}
    }
    
};
