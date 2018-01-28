/**
 * Created by Ware on 12/15/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mMastery extends libWZ.GrimDawn.cModule {
    
    /**
     * aValue:
     * 0 - Converter
     */
    constructor(_InTags) {
        super();
    
        this.mData = appData[`wz-mastery`];
        this._Tags = _InTags;
        
        this.aConverters = [];
        this.aModifiers = [];
        this.aPassives = [];
        
        this.aMasteryData = [];
        
        this.iniMastery();
        
        this.aModuleData = [
            this.aMasteryData
        ];
    }
    
    iniMastery(){
        //Log(this.mData);
    
    
        // Increased Projectiles [Intensify]
        // Additional Summon [Embolden]
        // Affects additional targets (Chains/Cleave) [Maximize]
        // Increased Duration [Extended]
    
        // Increased AoE [Enlarged]
        // Chance to Pierce [Imbued]
        // Weapon Damage + Leech [Empowered]
        // CD Reduction [Quicken]
        
        let PathTPL = `mod_wanez/_mastery/{BASE_FOLDER}/{MASTERY_FOLDER}{SUB_DIRECTORY}`,
            FileNameTPL = `{PREFIX}{TYPE_NAME}_{TYPE_COUNT}{SUFFIX}.dbr`,
            TagNameTPL = `tagWzMastery_{MASTERY_FOLDER}_Skill_{TYPE_NAME}{TYPE_COUNT}_NAME`,
            TagDescTPL = `tagWzMastery_{MASTERY_FOLDER}_Skill_{TYPE_NAME}{TYPE_COUNT}_DESC`,
            SkillNameTPL = `{MASTERY_NAME} - {TYPE_NAME} {SUFFIX}`,
            TempFilePath,
            TempTypeData,
            TempMasteryData,
            TempDBR,
            TempTempDBR,
            TempClass,
            TempClassPetMod,
            TempClassBuff,
            TempTag;
        
        for(let kType in this.mData.Items){
            TempTypeData = this.mData.Items[kType];
            
            for(let kMasteryFolder in TempTypeData.Mastery){
                TempMasteryData = TempTypeData.Mastery[kMasteryFolder];
                
                for(let kFileId in TempTypeData.aDefaults){ // TempMasteryData
                    TempTempDBR = Object.assign({}, TempTypeData.Default, TempTypeData.aDefaults[kFileId].DBR, TempMasteryData[kFileId] || {});
                    TempDBR = {};
                    for(let kTempKeyword in TempTempDBR){
                        //Log(TempTempDBR[kTempKeyword]);
                        TempDBR[kTempKeyword.wzReplace({
                            DAMAGE_TYPE_00: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][0][0],
                            DAMAGE_TYPE_00_SLOW: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][0][1],
                            DAMAGE_TYPE_00_ALT: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][0][2],
                            DAMAGE_TYPE_00_ALT2: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][0][3],
                            DAMAGE_TYPE_01: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][1][0],
                            DAMAGE_TYPE_01_SLOW: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][1][1],
                            DAMAGE_TYPE_01_ALT: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][1][2],
                            DAMAGE_TYPE_02: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][2][0],
                            DAMAGE_TYPE_02_SLOW: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][2][1],
                            DAMAGE_TYPE_02_ALT: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][2][2],
                            DAMAGE_TYPE_03: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][3][0],
                            DAMAGE_TYPE_03_SLOW: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][3][1],
                            DAMAGE_TYPE_03_ALT: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][3][2]
                        })] = (typeof TempTempDBR[kTempKeyword] === `string`) ? TempTempDBR[kTempKeyword].wzReplace({
                            DAMAGE_TYPE_00: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][0][0],
                            DAMAGE_TYPE_00_SLOW: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][0][1],
                            DAMAGE_TYPE_00_ALT: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][0][2],
                            DAMAGE_TYPE_00_ALT2: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][0][3],
                            DAMAGE_TYPE_01: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][1][0],
                            DAMAGE_TYPE_01_SLOW: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][1][1],
                            DAMAGE_TYPE_01_ALT: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][1][2],
                            DAMAGE_TYPE_02: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][2][0],
                            DAMAGE_TYPE_02_SLOW: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][2][1],
                            DAMAGE_TYPE_02_ALT: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][2][2],
                            DAMAGE_TYPE_03: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][3][0],
                            DAMAGE_TYPE_03_SLOW: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][3][1],
                            DAMAGE_TYPE_03_ALT: this.mData.Settings.mMasteryDamageTypes[kMasteryFolder][3][2]
                        }) : ``;
                    }
                    //Log(TempDBR);
                    //Log(isNaN(kFileId));
                    for(let kKeyword in TempDBR){
                        if( this.mData.aValues[ TempDBR[kKeyword] ] ){
                            TempDBR[kKeyword] = this.mData.aValues[ TempDBR[kKeyword] ];
                        }
                    }
                    
                    // prepare path for skill file (required in UI file)
                    TempFilePath = `${PathTPL.wzReplace({
                        BASE_FOLDER: `skills`,
                        SUB_DIRECTORY: `/wz`,
                        MASTERY_FOLDER: kMasteryFolder.toLowerCase()
                    })}/${(isNaN(kFileId)) ? `${kFileId}.dbr` : FileNameTPL.wzReplace({
                        TYPE_NAME: kType.toLowerCase(),
                        TYPE_COUNT: (`0${parseInt(kFileId) + 1}`).slice(-2),
                        PREFIX: ``,
                        SUFFIX: ``
                    })}`;
                    
                    // PetMod check
                    TempClassPetMod = false;
                    if(TempTypeData.aDefaults[kFileId].bIsPet){
                        TempClassPetMod = new libWZ.GrimDawn.Assets.aSkill_PetModifier(TempFilePath.replace(`.dbr`, `_petmod.dbr`));
                        TempClassPetMod.__setField(`petSkillName`, TempFilePath);
                        this.aMasteryData.push(TempClassPetMod);
                        //Log(TempClassPetMod);
                    }
                    // Buff check
                    TempClassBuff = false;
                    if(TempTypeData.Settings.Asset === `aSkillBuff_passive`){
                        TempClassBuff = new libWZ.GrimDawn.Assets.aSkill_BuffRadius(TempFilePath.replace(`_buff.dbr`, `.dbr`));
                        TempClassBuff.__setField(`buffSkillName`, TempFilePath);
                        this.aMasteryData.push(TempClassBuff);
                    }else if(TempTypeData.Settings.Asset === `aSkillBuff_Debuff`){
                        if(kFileId === `buff_defensive_modifier2_buff`){
                            //TempClassBuff = new libWZ.GrimDawn.Assets.aSkillSecondary_OnHitBuffRadius(TempFilePath.replace(`_buff.dbr`, `.dbr`));
                        }else{
                            //TempClassBuff = new libWZ.GrimDawn.Assets.aSkillSecondary_BuffRadius(TempFilePath.replace(`_buff.dbr`, `.dbr`));
                        }
                        TempClassBuff = new libWZ.GrimDawn.Assets.aSkillSecondary_OnHitBuffRadius(TempFilePath.replace(`_buff.dbr`, `.dbr`));
                        TempClassBuff.__setField(`buffSkillName`, TempFilePath);
                        this.aMasteryData.push(TempClassBuff);
                    }
                    
                    // UI FILE \\
                    TempClass = new libWZ.GrimDawn.Assets.aSkillButton(`${PathTPL.wzReplace({
                        BASE_FOLDER: `ui`,
                        SUB_DIRECTORY: ``,
                        MASTERY_FOLDER: kMasteryFolder.toLowerCase()
                    })}/${(isNaN(kFileId)) ? `skill00_${kFileId}.dbr` : FileNameTPL.wzReplace({
                        TYPE_NAME: kType.toLowerCase(),
                        TYPE_COUNT: (`0${parseInt(kFileId) + 1}`).slice(-2),
                        PREFIX: `skill00_`,
                        SUFFIX: ``
                    })}`);
                    Log(TempFilePath);
                    TempClass.__setField(`FileDescription`, `${kType.toLowerCase()}_${(`0${parseInt(kFileId) + 1}`).slice(-2)}`);
                    TempClass.__setField(`isCircular`, (TempTypeData.Settings.bIsSquare) ? `0` : `1` );
                    TempClass.__setField(`bitmapNameUp`, (TempTypeData.Settings.bIsSquare) ? `ui/skills/skillallocation/skills_buttonborder01.tex` : `ui/skills/skillallocation/skills_buttonborderround01.tex`);
                    TempClass.__setField(`bitmapNameDown`, (TempTypeData.Settings.bIsSquare) ? `ui/skills/skillallocation/skills_buttonborderdown01.tex` : `ui/skills/skillallocation/skills_buttonborderrounddown01.tex`);
                    TempClass.__setField(`bitmapNameInFocus`, (TempTypeData.Settings.bIsSquare) ? `ui/skills/skillallocation/skills_buttonborderover01.tex` : `ui/skills/skillallocation/skills_buttonborderroundover01.tex`);
                    TempClass.__setField(`bitmapPositionX`, TempTypeData.aDefaults[kFileId].Coords[0]);
                    TempClass.__setField(`bitmapPositionY`, TempTypeData.aDefaults[kFileId].Coords[1]);
                    TempClass.__setField(`skillName`, (TempClassPetMod) ? TempFilePath.replace(`.dbr`, `_petmod.dbr`) : ( (TempClassBuff) ? TempFilePath.replace(`_buff.dbr`, `.dbr`) : TempFilePath ));
                    // save class (SKILL BUTTON)
                    this.aMasteryData.push(TempClass);
                    
                    // SKILL FILE \\
                    TempClass = new libWZ.GrimDawn.Assets[TempTypeData.Settings.Asset](TempFilePath);
                    
                    TempClass.editDBR(TempDBR);
                    TempClass.__setField(`skillMaxLevel`, TempTypeData.Settings.aRanks[0]);
                    TempClass.__setField(`skillUltimateLevel`, TempTypeData.Settings.aRanks[1]);
                    TempClass.__setField(`skillTier`, TempTypeData.aDefaults[kFileId].SkillTier);
                    
                    // TAGS \\
                    TempTag = TagNameTPL.wzReplace({
                        MASTERY_FOLDER: kMasteryFolder.toUpperCase(),
                        TYPE_NAME: (isNaN(kFileId)) ? `` : kType,
                        TYPE_COUNT: (isNaN(kFileId)) ? kFileId : (`0${parseInt(kFileId) + 1}`).slice(-2)
                    });
                    if(kType === `Buff_Active` || kType === `Buff_Modifier` ||  kType === `Buff_BuffSelfToggled` ||  kType === `Buff_DeBuff`){
                        this._Tags.__setField(TempTag, `${this.mData.Settings.MasteryNames[kMasteryFolder]}'s ${TempTypeData.aDefaults[kFileId].NameSuffix}`);
                        //Log( `${this.mData.Settings.MasteryNames[kMasteryFolder]}'s ${TempTypeData.aDefaults[kFileId].NameSuffix}` );
                    }else{
                        this._Tags.__setField(TempTag, SkillNameTPL.wzReplace({
                            MASTERY_NAME: this.mData.Settings.MasteryNames[kMasteryFolder],
                            TYPE_NAME: kType,
                            SUFFIX: TempTypeData.aDefaults[kFileId].NameSuffix
                        }));
                    }
                    
                    TempClass.__setField(`skillDisplayName`, TempTag);
                    if(kType === `Modifier`) {
                        TempClass.__setField(`skillBaseDescription`, TagDescTPL.wzReplace({
                            MASTERY_FOLDER: kMasteryFolder.toUpperCase(),
                            TYPE_NAME: kType,
                            TYPE_COUNT: (`0${parseInt(kFileId) + 1}`).slice(-2)
                        }));
                    }/*else if(kType === `Buff_Active` || kType === `Buff_Modifier`){
                        TempClass.__setField(`skillBaseDescription`, TagDescTPL.wzReplace({
                            MASTERY_FOLDER: kMasteryFolder.toUpperCase(),
                            TYPE_NAME: ``,
                            TYPE_COUNT: kFileId
                        }));
                    }*/else{
                        TempClass.__setField(`skillBaseDescription`, TagDescTPL.wzReplace({
                            MASTERY_FOLDER: `X`,
                            TYPE_NAME: kType,
                            TYPE_COUNT: `X`
                        }));
                    }
                    
    
                    // prepare for pet bonus if required
                    if(TempTypeData.Settings.bHasPetBonus){
                        // prepare path for petbonus file (required in skill file)
                        TempFilePath = `${PathTPL.wzReplace({
                            BASE_FOLDER: `skills`,
                            SUB_DIRECTORY: `/wz`,
                            MASTERY_FOLDER: kMasteryFolder.toLowerCase()
                        })}/${FileNameTPL.wzReplace({
                            TYPE_NAME: kType.toLowerCase(),
                            TYPE_COUNT: (`0${parseInt(kFileId) + 1}`).slice(-2),
                            PREFIX: ``,
                            SUFFIX: `_petbonus`
                        })}`;
                        TempClass.__setField(`petBonusName`, TempFilePath);
                    }
                    // save class (SKILL)
                    this.aMasteryData.push(TempClass);
                    
                    // PET BONUS \\
                    if(TempTypeData.Settings.bHasPetBonus) {
                        TempClass = new libWZ.GrimDawn.Assets.aPetBonus(TempFilePath);
                        TempClass.editDBR(TempDBR);
                        // save class (PET BONUS)
                        this.aMasteryData.push(TempClass);
                    }
                }
            }
        }
        //Log(this.aMasteryData);
    }
    
};