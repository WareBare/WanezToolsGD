/**
 * Created by Ware on 11/8/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mPhasingBeasts extends libWZ.GrimDawn.cModule{
    
    constructor(_InTags){
        super();
    
        //this.Directory = `mod_wanez/_events/phasing`;
        this.DirectoryMateria = `mod_wanez/_events/phasing/items/materia`;
        this.DirectoryMateriaSkills = `mod_wanez/_events/phasing/items/materia/skills`;
        this.DirectoryMateriaIcons = `wanez/items/materia/phasing`;
        
        let cTagsVanilla = new libWZ.GrimDawn.cData(`${appConfig.get(`GrimDawn.Paths.Game`)}/resources/text_en/tags_items.txt`, `Tags`),
            cTagsGDX1 = new libWZ.GrimDawn.cData(`${appConfig.get(`GrimDawn.Paths.Game`)}/mods/gdx1/resources/text_en/tagsgdx1_items.txt`, `Tags`);
        this.mTagsCoreItems = Object.assign(cTagsVanilla.getData(), cTagsGDX1.getData());
        //Log(this.cTagsCoreItems);
        
        this.mMateriaReplacements = {
            'characterOffensiveAbility': `characterDefensiveAbility`,
            'characterOffensiveAbilityModifier': `characterDefensiveAbilityModifier`,
            'characterDeffensiveAbility': `characterOffensiveAbility`,
            'characterDeffensiveAbilityModifier': `characterOffensiveAbilityModifier`,
            'characterLifeRegen': `characterManaRegen`,
            'characterLifeRegenModifier': `characterManaRegenModifier`,
            'characterManaRegen': `characterLifeRegen`,
            'characterManaRegenModifier': `characterLifeRegenModifier`,
            'characterLife': `characterMana`,
            'characterLifeModifier': `characterManaModifier`,
            'characterMana': `characterLife`,
            'characterManaModifier': `characterLifeModifier`,
            'characterAttackSpeed': `characterSpellCastSpeed`,
            'characterSpellCastSpeed': `characterAttackSpeed`,
            'characterStrength': `characterStrengthModifier`,
            'characterStrengthModifier': `characterStrength`,
            'characterDexterity': `characterDexterityModifier`,
            'characterDexterityModifier': `characterDexterity`,
            'characterIntelligence': `characterIntelligenceModifier`,
            'characterIntelligenceModifier': `characterIntelligence`,
            'characterLightRadius': `characterIncreasedExperience`,
            'characterIncreasedExperience': `characterLightRadius`,
            'characterConstitution': `characterConstitutionModifier`,
            'characterConstitutionModifier': `characterConstitution`,
            'Cold': `Poison`,
            'SlowCold': `SlowPoison`,
            'SlowColdDuration': `SlowPoisonDuration`,
            'Poison': `Cold`,
            'SlowPoison': `SlowCold`,
            'SlowPoisonDuration': `SlowColdDuration`,
            'Lightning': `Life`,
            'SlowLightning': `SlowLife`,
            'SlowLightningDuration': `SlowLifeDuration`,
            'Life': `Lightning`,
            'SlowLife': `SlowLightning`,
            'SlowLifeDuration': `SlowLightningDuration`,
            'Fire': [`Aether`, `Chaos`],
            'SlowFire': [`Aether`, `Chaos`],
            'SlowFireDuration': ``,
            'Aether': `Fire`,
            'Chaos': `Fire`,
            'Physical': `Pierce`,
            'Pierce': `Physical`,
            'SlowBleeding': `SlowPhysical`,
            'SlowBleedingDuration': `SlowPhysicalDuration`,
            'SlowPhysical': `SlowBleeding`,
            'SlowPhysicalDuration': `SlowBleedingDuration`
        };
        this.mFieldNameTemplates = [
            `{DAMAGE_TYPE}`,
            `offensive{DAMAGE_TYPE}Min`,
            `offensive{DAMAGE_TYPE}Max`,
            `offensive{DAMAGE_TYPE}Chance`,
            `offensive{DAMAGE_TYPE}XOR`,
            `offensive{DAMAGE_TYPE}Global`,
            `offensive{DAMAGE_TYPE}Modifier`,
            `offensive{DAMAGE_TYPE}ModifierChance`,
            
            `defensive{DAMAGE_TYPE}`,
            `defensive{DAMAGE_TYPE}Chance`,
            `defensive{DAMAGE_TYPE}Modifier`,
            `defensive{DAMAGE_TYPE}ModifierChance`,
            `defensive{DAMAGE_TYPE}Duration`,
            `defensive{DAMAGE_TYPE}DurationChance`,
            `defensive{DAMAGE_TYPE}DurationModifier`,
            `defensive{DAMAGE_TYPE}DurationModifierChance`,
            `defensive{DAMAGE_TYPE}MaxResist`
        ];
    
        this.ePhasingConfig = new eConfig({name: `wz-phasing`});
        this._Tags = _InTags;
        
        this.aFiles = false;
        this.mBaseFiles = {};
        this.aBeasts = [];
        this.aProxies = [];
        this.aMateria =[];
        this.aItemsConcept = [];
        this.aItemsGear = [];
        this.aItemsAffixes = [];
        // monsterClassification
        
        //this.iniBeasts();
        this.iniMateria();
        this.iniItemsConcept();
        this.iniItemsGear();
        this.iniItemsAffixes();
        
        this.aModuleData = [
            this.aBeasts,
            this.aProxies,
            this.aMateria,
            this.aItemsConcept,
            this.aItemsGear,
            this.aItemsAffixes
        ];
    }
    
    /**
     * get Beasts from Core files
     */
    iniBeasts(){
        let mBeastSettings = this.ePhasingConfig.get(`Beasts.Settings`),
            mBeasts = this.ePhasingConfig.get(`Beasts.Items`),
            _TempBeast, _TempBio, _TempProxyPool, TempSkillName, TempSkillLevel, TempChestLevel, mTempEquations, TempDescriptionTag,
            mCleanLoot = {},
            tplTag = `tagWzEvents_PhasingBeasts_{BEAST_ID}`,
            aBeasts = [];
    
        mCleanLoot[`chanceToEquipHead`] = ``;
        mCleanLoot[`chanceToEquipChest`] = ``;
        mCleanLoot[`chanceToEquipShoulders`] = ``;
        mCleanLoot[`chanceToEquipHands`] = ``;
        mCleanLoot[`chanceToEquipLegs`] = ``;
        mCleanLoot[`chanceToEquipFeet`] = ``;
        mCleanLoot[`chanceToEquipRightHand`] = ``;
        mCleanLoot[`chanceToEquipLeftHand`] = ``;
        mCleanLoot[`chanceToEquipFinger1`] = ``;
        mCleanLoot[`chanceToEquipFinger2`] = ``;
        mCleanLoot[`chanceToEquipMisc1`] = ``;
        mCleanLoot[`chanceToEquipMisc2`] = ``;
        mCleanLoot[`chanceToEquipMisc3`] = ``;
        for(let i = 1; i <= 6; i++){
            mCleanLoot[`chanceToEquipHeadItem${i}`] = ``;
            mCleanLoot[`lootHeadItem${i}`] = ``;
            mCleanLoot[`chanceToEquipChestItem${i}`] = ``;
            mCleanLoot[`lootChestItem${i}`] = ``;
            mCleanLoot[`chanceToEquipShouldersItem${i}`] = ``;
            mCleanLoot[`lootShouldersItem${i}`] = ``;
            mCleanLoot[`chanceToEquipHandsItem${i}`] = ``;
            mCleanLoot[`lootHandsItem${i}`] = ``;
            mCleanLoot[`chanceToEquipLegsItem${i}`] = ``;
            mCleanLoot[`lootLegsItem${i}`] = ``;
            mCleanLoot[`chanceToEquipFeetItem${i}`] = ``;
            mCleanLoot[`lootFeetItem${i}`] = ``;
            mCleanLoot[`chanceToEquipRightHandItem${i}`] = ``;
            mCleanLoot[`lootRightHandItem${i}`] = ``;
            mCleanLoot[`chanceToEquipLeftHandItem${i}`] = ``;
            mCleanLoot[`lootLeftHandItem${i}`] = ``;
            mCleanLoot[`chanceToEquipFinger1Item${i}`] = ``;
            mCleanLoot[`lootFinger1Item${i}`] = ``;
            mCleanLoot[`chanceToEquipFinger2Item${i}`] = ``;
            mCleanLoot[`lootFinger2Item${i}`] = ``;
            mCleanLoot[`chanceToEquipMisc1Item${i}`] = ``;
            mCleanLoot[`lootMisc1Item${i}`] = ``;
            mCleanLoot[`chanceToEquipMisc2Item${i}`] = ``;
            mCleanLoot[`lootMisc2Item${i}`] = ``;
            mCleanLoot[`chanceToEquipMisc3Item${i}`] = ``;
            mCleanLoot[`lootMisc3Item${i}`] = ``;
        }
        
        let mEnemyRanksToPool = {
                a: [1, 0, `records/proxies/lv3_strong+.dbr`],
                b: [2, 1, `records/proxies/lv5_elitechampion+.dbr`],
                c: [3, 2, `records/proxies/lv6_hero+.dbr`],
                d: [4, 3, `records/proxies/lv7_uber hero+.dbr`],
                e: [5, 4, `records/proxies/lv8_boss+.dbr`]
            },
            aProxyPools = [
                false,
                wzStorageGD.__get(`mod_wanez/_events/phasing/proxies/pools/proxypool_wave01a.dbr`),
                wzStorageGD.__get(`mod_wanez/_events/phasing/proxies/pools/proxypool_wave01b.dbr`),
                wzStorageGD.__get(`mod_wanez/_events/phasing/proxies/pools/proxypool_wave01c.dbr`),
                wzStorageGD.__get(`mod_wanez/_events/phasing/proxies/pools/proxypool_wave02a.dbr`),
                wzStorageGD.__get(`mod_wanez/_events/phasing/proxies/pools/proxypool_wave00.dbr`)
            ];
        
        
        for(let kBeastId in mBeasts){
            //Log(parseInt(kBeastId) + 1);
            for(let kRankId in mBeastSettings.Ranks){
                //Log(kRankId);
                _TempProxyPool = aProxyPools[mEnemyRanksToPool[kRankId][0]];
                if(_TempProxyPool){
                    _TempProxyPool.__setField(`name${parseInt(kBeastId) + 1}`, `${mBeastSettings.Paths.Target}/${mBeasts[kBeastId].Target}${kRankId}.dbr`);
                    _TempProxyPool.__setField(`levelVarianceEquation${parseInt(kBeastId) + 1}`, mEnemyRanksToPool[kRankId][2]);
                    _TempProxyPool.__setField(`weight${parseInt(kBeastId) + 1}`, `100`);
                    _TempProxyPool.__setField(`minPlayerLevel${parseInt(kBeastId) + 1}`, `1`);
                }
                _TempProxyPool = aProxyPools[mEnemyRanksToPool[kRankId][1]];
                if(_TempProxyPool){
                    _TempProxyPool.__setField(`nameChampion${parseInt(kBeastId) + 1}`, `${mBeastSettings.Paths.Target}/${mBeasts[kBeastId].Target}${kRankId}.dbr`);
                    _TempProxyPool.__setField(`levelVarianceEquationChampion${parseInt(kBeastId) + 1}`, mEnemyRanksToPool[kRankId][2]);
                    _TempProxyPool.__setField(`weightChampion${parseInt(kBeastId) + 1}`, `100`);
                    _TempProxyPool.__setField(`minPlayerLevelChampion${parseInt(kBeastId) + 1}`, `50`);
                }
                TempSkillLevel = 0;
                TempChestLevel = 0;
                mTempEquations = {};
                _TempBeast = new libWZ.GrimDawn.cData(`/${mBeastSettings.Paths.Source}/${mBeasts[kBeastId].Source}.dbr`);
        
                // CLEAN-UP
                _TempBeast.editDBR(mCleanLoot);
                for(let i = 1; i <= 17; i++){
                    TempSkillName = _TempBeast.__getField(`skillName${i}`);
                    if(TempSkillName.includes(`_chest_`)){
                        TempSkillLevel = i;
                    }else if( (!TempSkillName || TempSkillName === ``) && TempSkillLevel){
                        _TempBeast.__setField(`skillName${TempSkillLevel}`, _TempBeast.__getField(`skillName${i - 1}`));
                        _TempBeast.__setField(`skillLevel${TempSkillLevel}`, _TempBeast.__getField(`skillLevel${i - 1}`));
                        _TempBeast.__setField(`skillName${i - 1}`, ``);
                        _TempBeast.__setField(`skillLevel${i - 1}`, ``);
                        TempSkillLevel = 0;
                        TempChestLevel = i - 1;
                    }
                }
                
                // TAG
                TempDescriptionTag = tplTag.wzReplace({
                    BEAST_ID: (`00${kBeastId}`).slice(-3)
                });
                _TempBeast.__setField(`description`, TempDescriptionTag);
                this._Tags.__setField(TempDescriptionTag, mBeasts[kBeastId].NameTag);
                
                // BIO & EQUATIONS
                _TempBio = new libWZ.GrimDawn.cData(`/${_TempBeast.__getField(`characterAttributeEquations`)}`);
                mTempEquations[`characterStrength`] = _TempBio.__getField(`characterStrength`);
                mTempEquations[`characterDexterity`] = _TempBio.__getField(`characterDexterity`);
                mTempEquations[`characterIntelligence`] = _TempBio.__getField(`characterIntelligence`);
                mTempEquations[`characterLife`] = _TempBio.__getField(`characterLife`);
                mTempEquations[`characterMana`] = _TempBio.__getField(`characterMana`);
                mTempEquations[`characterLifeRegen`] = _TempBio.__getField(`characterLifeRegen`);
                mTempEquations[`characterManaRegen`] = _TempBio.__getField(`characterManaRegen`);
                mTempEquations[`characterOffensiveAbility`] = _TempBio.__getField(`characterOffensiveAbility`);
                mTempEquations[`characterDefensiveAbility`] = _TempBio.__getField(`characterDefensiveAbility`);
            
                _TempBeast.changeFilePath(`${libWZ.GrimDawn.tFn.getPaths().Mod}/${mBeastSettings.Paths.Target}/${mBeasts[kBeastId].Target}${kRankId}.dbr`);
    
                // BIO & EQUATIONS
                _TempBio.changeFilePath(`${libWZ.GrimDawn.tFn.getPaths().Mod}/${mBeastSettings.Paths.Target}/bios/bio_${mBeasts[kBeastId].Target}${kRankId}.dbr`);
                for(let kFieldName in mBeastSettings.Ranks[kRankId].EquationMultiplier){
                    _TempBio.__setField(kFieldName, `(${mTempEquations[kFieldName]})*${mBeastSettings.Ranks[kRankId].EquationMultiplier[kFieldName]}`);
                }
                this.aBeasts.push(_TempBio);
                // CHEST FOR HERO/BOSS/NEMESIS
                if(mBeastSettings.Ranks[kRankId].ChestSkill){
                    _TempBeast.__setField(`skillName${TempChestLevel}`, mBeastSettings.Ranks[kRankId].ChestSkill);
                    _TempBeast.__setField(`skillLevel${TempChestLevel}`, `1`);
                }else{
                    _TempBeast.__setField(`skillName${TempChestLevel}`, ``);
                    _TempBeast.__setField(`skillLevel${TempChestLevel}`, ``);
                }
    
                _TempBeast.__setField(`scale`, parseInt(_TempBeast.__getField(`scale`)) * mBeastSettings.Ranks[kRankId].ScaleMultiplier);
                //_TempBeast.__setField(`baseTexture`, `wanez/creatures/phasing/phasing_dif.tex`);
               //_TempBeast.__setField(`specTexture`, `wanez/creatures/phasing/phasing_glow.tex`);
                _TempBeast.__setField(`factions`, `mod_wanez/faction/controller_dga.dbr`);
                _TempBeast.__setField(`deleteBehavior`, ``);
                _TempBeast.__setField(`dissolveTime`, `2.0`);
                _TempBeast.__setField(`dissolveTexture`, ``);
                _TempBeast.__setField(`shader`, `shaders/standardglowskinned.ssh`);
                _TempBeast.__setField(`glowTexture`, `wanez/creatures/phasing/phasing_glow.tex`);
                _TempBeast.__setField(`mapNuggetType`, `Custom`);
                _TempBeast.__setField(`mapNuggetCustom`, `wanez/creatures/phasing/nugget_beast.tex`);
                _TempBeast.__setField(`characterAttributeEquations`, `${mBeastSettings.Paths.Target}/bios/bio_${mBeasts[kBeastId].Target}${kRankId}.dbr`);
                _TempBeast.editDBR(mBeastSettings.Ranks[kRankId].DBR);
                this.aBeasts.push(_TempBeast);
            }
            
        }
        //this.aBeasts = aBeasts;
        //Log(aBeasts);
        this.aProxies = aProxyPools;
    }
    
    checkIfViableField($value){
        let isViable = false;
        if( $value !== '0' &&
            $value !== '0.0' &&
            $value !== '0.000000' &&
            $value !== '' &&
            typeof $value !== 'undefined'){
            // inside
            isViable = true;
        }
        return isViable;
    }
    
    
    
    iniMateria(){
        
        
        /*
         relicBitmap,items/craftingparts/components/component_a69_blacktallow_b.tex
         shardBitmap,items/craftingparts/components/component_a69_blacktallow_a.tex,
         itemText,tagCompA051Desc,
         */
        let mFiles, aMateria = [], TempReplacements, TempSkillReplacements, TempFieldValue, TempClass, TempSkillClass, TempTagOld, TempTagNew, TempResult, bBlockConversion = false,
            aTdyn_Common = [],
            aTdyn_Magical = [],
            aTdyn_Rare = [];
    
        try{
            mFiles = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Core}/records/items/materia`);
        }catch(err){}
        
        //Log(mFiles);
        
        for(let kFileName in mFiles){
            TempClass = new libWZ.GrimDawn.cData(mFiles[kFileName]);
    
            TempSkillClass = false;
            TempFieldValue = TempClass.__getField(`itemSkillName`);
            if( this.checkIfViableField(TempFieldValue) ){
                try{
                    TempSkillClass = new libWZ.GrimDawn.cData(`/${TempFieldValue}`);
            
            
                    TempSkillClass.changeFilePath(`${libWZ.GrimDawn.tFn.getPaths().Mod}/${this.DirectoryMateriaSkills}/${TempFieldValue.replace(/^.*[\\\/]/, '')}`);
    
                    TempClass.__setField(`itemSkillName`, `${this.DirectoryMateriaSkills}/${TempFieldValue.replace(/^.*[\\\/]/, '')}`);
                }catch(err){console.log(err);}
            }
            
            if(TempClass.__getField(`templateName`) === `database/templates/itemrelic.tpl`){
                TempReplacements = {};
                TempSkillReplacements = {};
                for(let kTemplateId in this.mFieldNameTemplates){
                    
                    for(let kSearchFor in this.mMateriaReplacements){
                        TempResult = Array.isArray(this.mMateriaReplacements[kSearchFor]) ? this.mMateriaReplacements[kSearchFor] : [this.mMateriaReplacements[kSearchFor]];
    
                        for(let kIndex in TempResult){
                            //Log(TempResult[kIndex]);
                            TempFieldValue = TempClass.__getField(this.mFieldNameTemplates[kTemplateId].wzReplace({
                                DAMAGE_TYPE: kSearchFor
                            }));
                            if(TempFieldValue && this.checkIfViableField(TempFieldValue)){
                                TempReplacements[this.mFieldNameTemplates[kTemplateId].wzReplace({
                                    DAMAGE_TYPE: TempResult[kIndex]
                                })] = TempFieldValue;
                            }
    
                            if(TempSkillClass){
                                TempFieldValue = TempSkillClass.__getField(this.mFieldNameTemplates[kTemplateId].wzReplace({
                                    DAMAGE_TYPE: kSearchFor
                                }));
                                if(TempFieldValue && this.checkIfViableField(TempFieldValue)){
                                    TempSkillReplacements[this.mFieldNameTemplates[kTemplateId].wzReplace({
                                        DAMAGE_TYPE: TempResult[kIndex]
                                    })] = TempFieldValue;
                                }
                            }
                        }
    
                        TempClass.__setField(this.mFieldNameTemplates[kTemplateId].wzReplace({
                            DAMAGE_TYPE: kSearchFor
                        }), ``);
                        if(TempSkillClass){
                            TempSkillClass.__setField(this.mFieldNameTemplates[kTemplateId].wzReplace({
                                DAMAGE_TYPE: kSearchFor
                            }), ``);
                        }
                        
                        
                    }
                    
                }
    
                // NEW FILEPATH
                TempClass.changeFilePath(`${libWZ.GrimDawn.tFn.getPaths().Mod}/${this.DirectoryMateria}/${kFileName}`);
                // BITMAP CHANGES
                TempClass.__setField(`relicBitmap`, `${this.DirectoryMateriaIcons}/${TempClass.__getField(`relicBitmap`).replace(/^.*[\\\/]/, '')}`);
                TempClass.__setField(`shardBitmap`, `${this.DirectoryMateriaIcons}/${TempClass.__getField(`shardBitmap`).replace(/^.*[\\\/]/, '')}`);
                // todo TAG CHANGES
                TempTagOld = TempClass.__getField(`itemText`);
                TempTagNew = TempTagOld.replace(`tag`, `tagWzEvents_ItemsMateriaPhasing_`);
                this._Tags.__setField(TempTagNew, `${this.mTagsCoreItems[TempTagOld]}`);
                TempClass.__setField(`itemText`, TempTagNew);
    
                TempTagOld = TempClass.__getField(`description`);
                TempTagNew = TempTagOld.replace(`tag`, `tagWzEvents_ItemsMateriaPhasing_`);
                this._Tags.__setField(TempTagNew, `${this.mTagsCoreItems[TempTagOld]} ^b(Phasing)`);
                TempClass.__setField(`description`, TempTagNew);
    
                // AutoLoot
                TempClass.__setField(`onPickUp`,[`wanez.AutoPickUp.OnPickUp`]);
                TempClass.__setField(`onDrop`,[`wanez.AutoPickUp.OnDrop`]);
                TempClass.__setField(`onAddToWorld`, `wanez.AutoPickUp.OnAddToWorld`);
                TempClass.__setField(`onDestroy`, `wanez.AutoPickUp.OnDestroy`);
                
                // CONVERSION
                bBlockConversion = false;
                TempFieldValue = TempClass.__getField(`conversionOutType`);
                if(TempFieldValue && this.checkIfViableField(TempFieldValue)){
                    if(Array.isArray(this.mMateriaReplacements[TempFieldValue])){
                        TempClass.__setField(`conversionInType2`, TempClass.__getField(`conversionInType`));
                        TempClass.__setField(`conversionPercentage2`, TempClass.__getField(`conversionPercentage`));
                        TempClass.__setField(`conversionOutType2`, this.mMateriaReplacements[TempFieldValue][1]);
                        
                        TempClass.__setField(`conversionOutType`, this.mMateriaReplacements[TempFieldValue][0]);
                        bBlockConversion = true;
                    }else{
                        TempClass.__setField(`conversionOutType`, this.mMateriaReplacements[TempFieldValue]);
                    }
                    
                }
                TempFieldValue = TempClass.__getField(`conversionOutType2`);
                if(TempFieldValue && this.checkIfViableField(TempFieldValue) && !bBlockConversion){
                    TempClass.__setField(`conversionOutType2`, this.mMateriaReplacements[TempFieldValue]);
                }
                
                //Log(TempReplacements);
                TempClass.editDBR(TempReplacements);
    
                //Log(TempClass.__getField(`itemClassification`));
                if(TempClass.__getField(`itemClassification`) === `Common`){
                    aTdyn_Common.push(`${this.DirectoryMateria}/${kFileName}`);
                }else if(TempClass.__getField(`itemClassification`) === `Magical`){
                    aTdyn_Magical.push(`${this.DirectoryMateria}/${kFileName}`);
                }else{
                    aTdyn_Rare.push([`${this.DirectoryMateria}/${kFileName}`, 100]);
                }
    
                if(TempSkillClass) {
                    TempSkillClass.editDBR(TempSkillReplacements);
                    this.aMateria.push(TempSkillClass);
                }
                this.aMateria.push(TempClass);
            }
        }
        
        //Log(aTdyn_Common);
        //Log(aTdyn_Magical);
        //Log(aTdyn_Rare);
        this.aMateria.push(this.EditTdyn(`/mod_wanez/_events/phasing/items/loottables/tdyn_materia_a01.dbr`, aTdyn_Common));
        this.aMateria.push(this.EditTdyn(`/mod_wanez/_events/phasing/items/loottables/tdyn_materia_b01.dbr`, aTdyn_Magical));
        this.aMateria.push(this.EditTdyn(`/mod_wanez/_events/phasing/items/loottables/tdyn_materia_c01.dbr`, aTdyn_Rare));
        //this.aMateria = aMateria;
        //Log(this.aMateria);
        
    }
    
    iniItemsConcept(){
        let mConverters = this.ePhasingConfig.get(`Converters`),
            mModifiers = this.ePhasingConfig.get(`Modifiers`),
            aTdyn_Converters_01 = [],
            aTdyn_Modifiers_1120 = [],
            aTdyn_Modifiers_2130 = [];
    
        // START GENERATION
        aTdyn_Converters_01 = aTdyn_Converters_01.concat(this.GenerateItemsConcept(`converter`, mConverters[`20`], 20));
        aTdyn_Modifiers_1120 = aTdyn_Modifiers_1120.concat(this.GenerateItemsConcept(`modifier`, mModifiers[`20`], 20));
    
        // TDYN
        this.aItemsConcept.push(this.EditTdyn(`/mod_wanez/_events/phasing/items/loottables/tdyn_converters_01.dbr`, aTdyn_Converters_01));
        this.aItemsConcept.push(this.EditTdyn(`/mod_wanez/_events/phasing/items/loottables/tdyn_modifiers_1120.dbr`, aTdyn_Modifiers_1120));
        this.aItemsConcept.push(this.EditTdyn(`/mod_wanez/_events/phasing/items/loottables/tdyn_modifiers_2130.dbr`, aTdyn_Modifiers_2130));
        Log(this.aItemsConcept);
    }
    
    iniItemsGear(){
        let Path = `mod_wanez/_events/phasing/items/gear`,
            mGearDataSettings = this.ePhasingConfig.get(`Gear.Settings`),
            aGearDataItems = this.ePhasingConfig.get(`Gear.Items`),
            mDefaultSlotFields = {
                'ArmorChest': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_torso_a01.tex`,
                    
                    'armorMaleMesh': `items/geartorso/torso_heavy_002-01c_m.msh`,
                    'armorFemaleMesh': `items/geartorso/torso_heavy_002-01c_f.msh`,
                    
                    'mesh': `items/geartorso/torso_heavy_002-01c_m.msh`,
                    'shader': `shaders/standardglowskinned.ssh`,
                    'baseTexture': `wanez/items/phasing/t_set_torso_a01_d.tex`,
                    'bumpTexture': `items/geartorso/torso_heavy_002-01_m_11a_nml.tex`,
                    'glowTexture': `wanez/items/phasing/t_set_torso_a01_e.tex`
                },
                'ArmorLegs': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_legs_a01.tex`,
                    
                    'armorMaleMesh': `items/gearlegs/legs_002a_01.msh`,
                    'armorFemaleMesh': `items/gearlegs/legs_002a_01.msh`,
                    
                    'mesh': `items/gearlegs/legs_002a_01.msh`,
                    'baseTexture': `items/gearlegs/legs_006a_dif.tex`,
                    'bumpTexture': `items/gearlegs/legs_006a_nml.tex`
                },
                'ArmorShoulders': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_shoulders_a01.tex`,
                    
                    'armorMaleMesh': `items/gearshoulders/shoulders_052a_01.msh`,
                    'armorFemaleMesh': `items/gearshoulders/shouldersf_052a_01.msh`,
                    
                    'mesh': `items/gearshoulders/shoulders_052a_01.msh`,
                    'baseTextures': [
                        `wanez/items/phasing/t_set_shoulders_a01_d.tex`,
                        `wanez/items/phasing/t_set_shoulders_a01_d_energy.tex`,
                        `wanez/items/phasing/t_set_shoulders_a01_d_swords.tex`
                    ]
                },
                'ArmorHands': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_hands_a01.tex`,
                    
                    'armorMaleMesh': `items/gearhands/hands_006d_01_cold.msh`,
                    'armorFemaleMesh': `items/gearhands/handsf_006d_01_cold.msh`,
                    
                    'mesh': `items/gearhands/hands_006d_01_cold.msh`,
                    'shader': `shaders/standardglowskinned.ssh`,
                    'baseTexture': `wanez/items/phasing/t_set_hands_a01_d.tex`,
                    'bumpTexture': `items/gearhands/hands_007z_nml.tex`,
                    'glowTexture': `wanez/items/phasing/t_set_hands_a01_e.tex`
                },
                'ArmorFeet': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_feet_a01.tex`,
                    
                    'armorMaleMesh': `items/gearfeet/feet_009a_01_ghostly.msh`,
                    'armorFemaleMesh': `items/gearfeet/feetf_009a_01_ghostly.msh`,
                    
                    'mesh': `items/gearfeet/feet_009a_01_ghostly.msh`,
                    'baseTexture': `wanez/items/phasing/t_set_feet_a01_d.tex`
                },
                'ArmorHead': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_head_a01.tex`,
                    
                    'armorMaleMesh': `items/gearhead/head_003_04a.msh`,
                    'armorFemaleMesh': `items/gearhead/headf_003_04a.msh`,
                    
                    'mesh': `items/gearhead/head_003_04a.msh`,
                    'shader': `shaders/standardglowskinned.ssh`,
                    'baseTexture': `wanez/items/phasing/t_set_head_a01_d.tex`,
                    'glowTexture': `wanez/items/phasing/t_set_head_a01_e.tex`
                },
                'AccessoryWaist': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_waist_a01.tex`,
                    
                    'armorMaleMesh': `items/gearaccessories/waist/belt.msh`,
                    'armorFemaleMesh': `items/gearaccessories/waist/belt.msh`,
                    
                    'mesh': `items/gearaccessories/waist/belt.msh`,
                    'baseTexture': `wanez/items/phasing/set_waist_a01.tex`
                },
                'AccessoryAmulet': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_neck_a01.tex`,
                    
                    'mesh': `items/gearaccessories/rings/ring.msh`
                },
                'AccessoryRing': {
                    'bitmap': `wanez/items/phasing/bitmaps/set_finger_a01.tex`,
                    
                    'mesh': `items/gearaccessories/rings/ring.msh`
                }
            },
            aRecipes = [],
            TempSetMemberPath,
            TempRecipePath,
            TempLoottablePath,
            aTempLoottableItems,
            cTempLootTable,
            FileNameTPL = `{TYPE}_{MASTERY_ENUM}{SLOT_NAME}_{FILE_PREFIX}{VARIATION}`,
            TagNameTPL = `tagWzEvents_PhasingItemsGear_{MASTERY_ENUM}_{SLOT_NAME}_{TYPE}`,
            mTempItemData,
            TempTagName,
            TempVariationTag,
            TempRankTag,
            TempItemClass,
            TempRecipeClass,
            TempSetBonusClass,
            TempBlacksmithClass,
            TempFileName,
            TempPassiveDBR,
            TempSetBonusFileName,
            aTempSetMembers;
        
        // 20_armorchest_c01.dbr
        for(let kRankId in mGearDataSettings.mItemRanks){
    
            TempRankTag = TagNameTPL.wzReplace({
                MASTERY_ENUM: `Set`,
                SLOT_NAME: (`0${kRankId}`).slice(-2),
                TYPE: `TIER`
            });
            this._Tags.__setField(TempRankTag, mGearDataSettings.mItemRanks[kRankId].TierName);
            
            // SetId == MasteryEnumeration
            for(let kSetId in aGearDataItems){
    
                aTempLoottableItems = [];
                if(mGearDataSettings.mItemRanks[kRankId].UpgradeIndex){
                
                }else{
                    cTempLootTable = new libWZ.GrimDawn.cData(`${dirAssets}/wzEvents/tdyn_${mGearDataSettings.mItemRanks[kRankId].FilePrefix}00.dbr`);
                    
                    cTempLootTable.editDBR(aGearDataItems[kSetId].tdyn_DBR);
                    cTempLootTable.changeFilePath(`${libWZ.GrimDawn.tFn.getPaths().Mod}/${Path}/loottables/tdyn_${mGearDataSettings.mItemRanks[kRankId].FilePrefix}${kSetId}.dbr`);
                }
                // VARIATION \\
                for(let kVariationId in aGearDataItems[kSetId].aSetNames){
                    TempVariationTag = TagNameTPL.wzReplace({
                        MASTERY_ENUM: kSetId,
                        SLOT_NAME: (`0${kVariationId}`).slice(-2),
                        TYPE: `STYLE`
                    });
                    this._Tags.__setField(TempVariationTag, aGearDataItems[kSetId].aSetNames[kVariationId]);
    
                    TempSetBonusFileName = `${Path}/${FileNameTPL.wzReplace({
                        TYPE: `setbonus`,
                        MASTERY_ENUM: kSetId,
                        SLOT_NAME: ``,
                        FILE_PREFIX: mGearDataSettings.mItemRanks[kRankId].FilePrefix,
                        VARIATION: (`0${parseInt(kVariationId)+1}`).slice(-2)
                    })}.dbr`;
                    
                    aTempSetMembers = [];
                    // SLOTS / PIECES \\
                    for(let kSlotName in mDefaultSlotFields){
                        // Item
                        TempSetMemberPath = `${Path}/${FileNameTPL.wzReplace({
                            TYPE: `item`,
                            MASTERY_ENUM: kSetId,
                            SLOT_NAME: `_${kSlotName.toLowerCase()}`,
                            FILE_PREFIX: mGearDataSettings.mItemRanks[kRankId].FilePrefix,
                            VARIATION: (`0${parseInt(kVariationId)+1}`).slice(-2)
                        })}.dbr`;
                        TempItemClass = new libWZ.GrimDawn.Assets.aGear(TempSetMemberPath, kSlotName);
                        
                        TempItemClass.editDBR(mDefaultSlotFields[kSlotName]);
                        TempItemClass.editDBR(aGearDataItems[kSetId].DBR);
                        TempItemClass.editDBR(mGearDataSettings.mItemRanks[kRankId].DBR[kSlotName]);
                        if(aGearDataItems[kSetId].Slots[kSlotName].DBR){
                            TempItemClass.editDBR(aGearDataItems[kSetId].Slots[kSlotName].DBR);
                        }
                        TempItemClass.__setField(`itemSetName`, TempSetBonusFileName);
                        TempItemClass.__setField(`itemLevel`, mGearDataSettings.mItemRanks[kRankId].CharacterLevel);
                        TempItemClass.__setField(`levelRequirement`, mGearDataSettings.mItemRanks[kRankId].CharacterLevel);
                        if(kSlotName.includes(`Armor`)) TempItemClass.__setField(`armorClassification`, aGearDataItems[kSetId].ArmorClassificationName);
                        TempItemClass.__setField(`itemClassification`, mGearDataSettings.mItemRanks[kRankId].ItemClassificationName);
                        
                        // PASSIVES \\
                        for(let kAugmentIndex in mGearDataSettings.aPassives){
                            TempItemClass.__setField(`augmentSkillName${parseInt(kAugmentIndex) + 1}`, `${aGearDataItems[kSetId].ClassDirectory}/wz/${mGearDataSettings.aPassives[kAugmentIndex]}`);
                            TempItemClass.__setField(`augmentSkillLevel${parseInt(kAugmentIndex) + 1}`, mGearDataSettings.mItemRanks[kRankId].SkillLevel);
                        }
                        
                        // TAG \\
                        TempItemClass.__setField(`itemQualityTag`, TempRankTag);
                        TempItemClass.__setField(`itemStyleTag`, TempVariationTag);
                        TempTagName = TagNameTPL.wzReplace({
                            MASTERY_ENUM: kSetId,
                            SLOT_NAME: kSlotName,
                            TYPE: `NAME`
                        });
                        this._Tags.__setField(TempTagName, `${aGearDataItems[kSetId].ItemName} ${aGearDataItems[kSetId].Slots[kSlotName].Name}`);
                        TempItemClass.__setField(`itemNameTag`, TempTagName);
    
                        aTempSetMembers.push(TempSetMemberPath);
                        this.aItemsGear.push(TempItemClass);
                        
                        // mod_wanez/_events/phasing/items/gear/affixes/affixtable_x{ENUM}.dbr [prefixTableName1]
                        if(mGearDataSettings.mItemRanks[kRankId].UpgradeIndex){
                            // mGearDataSettings.mItemRanks[ mGearDataSettings.mItemRanks[kRankId].UpgradeIndex ].FilePrefix
    
                            TempRecipePath = `${Path}/blueprints/${FileNameTPL.wzReplace({
                                TYPE: `blueprint`,
                                MASTERY_ENUM: kSetId,
                                SLOT_NAME: `_${kSlotName.toLowerCase()}`,
                                FILE_PREFIX: mGearDataSettings.mItemRanks[kRankId].FilePrefix,
                                VARIATION: (`0${parseInt(kVariationId)+1}`).slice(-2)
                            })}.dbr`;
                            TempRecipeClass = new libWZ.GrimDawn.Assets.aBlueprint(TempRecipePath, kSlotName);
    
                            aRecipes.push(TempRecipePath);
                            // mod_wanez/_events/phasing/items/craft_phasingessence.dbr
                            
                            // loottable (for Blueprints)
                            cTempLootTable = new libWZ.GrimDawn.cData(`${dirAssets}/wzEvents/tdyn_${mGearDataSettings.mItemRanks[kRankId].FilePrefix}00.dbr`);
    
                            TempLoottablePath = `${Path}/loottables/tdyn_${mGearDataSettings.mItemRanks[kRankId].FilePrefix}${kSetId}_${kSlotName.toLowerCase()}_${mGearDataSettings.mItemRanks[kRankId].FilePrefix}${(`0${parseInt(kVariationId)+1}`).slice(-2)}.dbr`;
                            cTempLootTable.changeFilePath(`${libWZ.GrimDawn.tFn.getPaths().Mod}/${TempLoottablePath}`);
                            cTempLootTable.editDBR(aGearDataItems[kSetId].tdyn_DBR);
                            
                            // records/items/questitems/scrapmetal.dbr
                            // use in blueprint: TempLoottablePath
                            TempRecipeClass.__setField(`artifactName`,TempLoottablePath);
                            TempRecipeClass.__setField(`forcedRandomArtifactName`,TempSetMemberPath);
                            TempRecipeClass.__setField(`artifactCreateQuantity`,`1`);
                            TempRecipeClass.__setField(`artifactCreationCost`,`100000`);
                            TempRecipeClass.__setField(`reagentBaseBaseName`,TempSetMemberPath);
                            TempRecipeClass.__setField(`reagentBaseQuantity`,`1`);
                            TempRecipeClass.__setField(`reagent1BaseName`,`mod_wanez/_events/phasing/items/craft_phasingessence.dbr`);
                            TempRecipeClass.__setField(`reagent1Quantity`,`1`);
                            
                            this.aItemsGear.push(this.EditTdyn(cTempLootTable, [TempSetMemberPath]));
                            cTempLootTable = false;
                            
                            this.aItemsGear.push(TempRecipeClass);
                        }else{
                            // loottable (for drop)
                            aTempLoottableItems.push(TempSetMemberPath);
                        }
                    }
    
                    // SetBonus
                    TempSetBonusClass = new libWZ.GrimDawn.Assets.aSetBonus(`${TempSetBonusFileName}`);
                    TempSetBonusClass.__setField(`setMembers`, aTempSetMembers);
                    
                    // TAG \\
                    TempTagName = TagNameTPL.wzReplace({
                        MASTERY_ENUM: `${kSetId}_SetBonus`,
                        SLOT_NAME: `${mGearDataSettings.mItemRanks[kRankId].FilePrefix}${(`0${kVariationId}`).slice(-2)}`,
                        TYPE: `NAME`
                    });
                    this._Tags.__setField(TempTagName, `${mGearDataSettings.mItemRanks[kRankId].TierName} ${aGearDataItems[kSetId].ItemName} ${aGearDataItems[kSetId].aSetNames[kVariationId]}`);
                    TempSetBonusClass.__setField(`setName`, TempTagName);
    
                    TempTagName = TagNameTPL.wzReplace({
                        MASTERY_ENUM: `${kSetId}_SetBonus`,
                        SLOT_NAME: `x${(`0${kVariationId}`).slice(-2)}`,
                        TYPE: `DESC`
                    });
                    this._Tags.__setField(TempTagName, aGearDataItems[kSetId].SetDescription);
                    
                    TempSetBonusClass.__setField(`setDescription`, TempTagName);
    
                    let TempSetIndexBonusValues;
                    // mGearDataSettings.aSetBonus
                    // aGearDataItems[kSetId].SetBonus
                    
                    // kRankId
                    // kVariationId
                    // aGearDataItems[kSetId].ClassTraining
                    // aGearDataItems[kSetId].ClassDirectory
                    for(let kKeyword in mGearDataSettings.SetBonusDBRReplace[kRankId]){
                        TempSetIndexBonusValues = mGearDataSettings.SetBonusDBRReplace[kRankId][kKeyword];
                        
                        if(kKeyword === `augmentMastery`){
                            TempSetBonusClass.__setField(`augmentMasteryName1`, `${aGearDataItems[kSetId].ClassDirectory}/${aGearDataItems[kSetId].ClassTraining}`);
                            TempSetBonusClass.__setField(`augmentMasteryLevel1`, TempSetIndexBonusValues);
                        }else if(kKeyword === `augmentSkill`){
                            for(let kAugmentIndex in mGearDataSettings.aModifiers[kVariationId]){
                                TempSetBonusClass.__setField(`augmentSkillName${parseInt(kAugmentIndex) + 1}`, `${aGearDataItems[kSetId].ClassDirectory}/wz/${mGearDataSettings.aModifiers[kVariationId][kAugmentIndex]}`);
                                TempSetBonusClass.__setField(`augmentSkillLevel${parseInt(kAugmentIndex) + 1}`, TempSetIndexBonusValues);
                            }
                        }else if(kKeyword === `augmentAllLevel`){
                            TempSetBonusClass.__setField(`augmentAllLevel`, TempSetIndexBonusValues);
                        }
                    }
                    
                    this.aItemsGear.push(TempSetBonusClass);
                }
                
                if(cTempLootTable){
                    this.aItemsGear.push(this.EditTdyn(cTempLootTable, aTempLoottableItems));
                }
            }
            
        }
        
        //Log(this.aItemsGear);
        //Log(this._Tags);
    }
    iniItemsAffixes(){
        let mAffixData = this.ePhasingConfig.get(`Affixes`),
            mModifiersData = mAffixData.Modifiers,
            TempAffixFileName,
            aTempMasteryData,
            aTempAffixPaths,
            cTempAffixClass,
            cTempAffixTableClass;
        
        // todo MODIFIERS \\
        for(let kMasteryEnum in mModifiersData.Items){
            cTempAffixTableClass = new libWZ.GrimDawn.Assets.aLootRandomizerTable(`${mModifiersData.Path}/${mModifiersData.AffixTableFileTPL.wzReplace({
                ENUM: kMasteryEnum
            })}`);
            aTempAffixPaths = [];
            for(let kIndex in mModifiersData.Items[kMasteryEnum]){
                aTempMasteryData = mModifiersData.Items[kMasteryEnum][kIndex];
    
                for(let kCount in aTempMasteryData[kIndex].modifierSkillName){
                    TempAffixFileName = mModifiersData.AffixFileTPL.wzReplace({
                        ENUM: kMasteryEnum,
                        INDEX: (`0${kIndex}`).slice(-2),
                        COUNT: (`0${kCount}`).slice(-2)
                    });
                    cTempAffixClass = new libWZ.GrimDawn.Assets.aLootRandomizer(`${mModifiersData.Path}/modifiers/${TempAffixFileName}`);
                    aTempAffixPaths.push(`${mModifiersData.Path}/modifiers/${TempAffixFileName}`);
    
                    cTempAffixClass.__setField(`modifiedSkillName1`, aTempMasteryData[kIndex].modifiedSkillName);
                    cTempAffixClass.__setField(`modifierSkillName1`, aTempMasteryData[kIndex].modifierSkillName[kCount]);
                    
                    this.aItemsAffixes.push(cTempAffixClass);
                }
                
            }
            this.aItemsAffixes.push(this.editAffixTable(cTempAffixTableClass, aTempAffixPaths));
        }
        
        let mSkillsData = mAffixData.Skills,
            TempRankPrefix;
        
        // todo SKILLS \\
        for(let kIndex in mSkillsData.Items){
            
            for(let kRankId in mSkillsData.Settings.aRankPrefixes){
            
            }
        }
    }
    
    GenerateItemsConcept(InType, InData, InId){
        let Path = `mod_wanez/_events/phasing/items/${InType}`,
            FolderUpgraded = `upgraded`,
            FolderBlueprints = `blueprints`,
            SkillLevelRegular = 7,
            SkillLevelUpgraded = 15,
            mSetDBRForType = {
                'converter': {
                    'medal': `1`,
                    'waist': `1`,
                    'relicBitmap': `wanez/items/materia/component_converter_b.tex`,
                    'description': `tagWzItems_PhasingConcept_Converter_NAME`,
                    'itemText': `tagWzItems_PhasingConcept_Converter_DESC`
                },
                'modifier': {
                    'waist': `1`,
                    'head': `1`,
                    'shoulders': `1`,
                    'hands': `1`,
                    'chest': `1`,
                    'legs': `1`,
                    'feet': `1`,
                    'relicBitmap': `wanez/items/materia/component_modifier_b.tex`,
                    'description': `tagWzItems_PhasingConcept_Modifier_NAME`,
                    'itemText': `tagWzItems_PhasingConcept_Modifier_DESC`
                }
            },
            aItemsDBR = [],
            TempItemClass,
            TempItemName;
        
        for(let kIndex in InData){
            TempItemName = `${InType}_${InId}_${(`0${kIndex}`).slice(-2)}.dbr`;
            aItemsDBR.push([`${Path}/comp_${TempItemName}`, 100]);
            
            // BASE ITEM \\
            TempItemClass = new libWZ.GrimDawn.Assets.aMateria(`${Path}/comp_${TempItemName}`);
            TempItemClass.__setField(`augmentSkillName1`, InData[kIndex]);
            TempItemClass.__setField(`augmentSkillLevel1`, SkillLevelRegular);
            TempItemClass.__setField(`itemClassification`, `Epic`);
            TempItemClass.editDBR(mSetDBRForType[InType]);
            // todo TAGS with custom name
            this.aItemsConcept.push(TempItemClass);
            
            // UPGRADE \\
            TempItemClass = new libWZ.GrimDawn.Assets.aMateria(`${Path}/${FolderUpgraded}/comp_${TempItemName}`);
            TempItemClass.__setField(`augmentSkillName1`, InData[kIndex]);
            TempItemClass.__setField(`augmentSkillLevel1`, SkillLevelUpgraded);
            TempItemClass.__setField(`itemClassification`, `Legendary`);
            TempItemClass.editDBR(mSetDBRForType[InType]);
            this.aItemsConcept.push(TempItemClass);
    
            // BLUEPRINT \\
            TempItemClass = new libWZ.GrimDawn.Assets.aBlueprint(`${Path}/${FolderBlueprints}/blueprint_${TempItemName}`);
            TempItemClass.__setField(`artifactName`, `${Path}/${FolderUpgraded}/comp_${TempItemName}`);
            TempItemClass.__setField(`artifactCreateQuantity`, `1`);
            TempItemClass.__setField(`artifactCreationCost`, `100000`);
            // REAGENT - BASE ITEM
            TempItemClass.__setField(`reagentBaseBaseName`, `${Path}/comp_${TempItemName}`);
            TempItemClass.__setField(`reagentBaseQuantity`, `1`);
            // REAGENT - ESSENCE
            TempItemClass.__setField(`reagent1BaseName`, `mod_wanez/_events/phasing/items/craft_phasingessence.dbr`);
            TempItemClass.__setField(`reagent1Quantity`, `1`);
            this.aItemsConcept.push(TempItemClass);
            
        }
        
        return aItemsDBR;
    }
    
    
};
