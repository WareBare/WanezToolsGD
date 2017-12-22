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
            TempClass,
            TempTag;
        
        for(let kType in this.mData.Items){
            TempTypeData = this.mData.Items[kType];
            
            for(let kMasteryFolder in TempTypeData.Mastery){
                TempMasteryData = TempTypeData.Mastery[kMasteryFolder];
                
                for(let kFileId in TempTypeData.aDefaults){ // TempMasteryData
                    TempDBR = Object.assign({}, TempTypeData.Default, TempTypeData.aDefaults[kFileId].DBR, TempMasteryData[kFileId] || {});
                    
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
                    })}/${FileNameTPL.wzReplace({
                        TYPE_NAME: kType.toLowerCase(),
                        TYPE_COUNT: (`0${parseInt(kFileId) + 1}`).slice(-2),
                        PREFIX: ``,
                        SUFFIX: ``
                    })}`;
                    
                    // UI FILE \\
                    TempClass = new libWZ.GrimDawn.Assets.aSkillButton(`${PathTPL.wzReplace({
                        BASE_FOLDER: `ui`,
                        SUB_DIRECTORY: ``,
                        MASTERY_FOLDER: kMasteryFolder.toLowerCase()
                    })}/${FileNameTPL.wzReplace({
                        TYPE_NAME: kType.toLowerCase(),
                        TYPE_COUNT: (`0${parseInt(kFileId) + 1}`).slice(-2),
                        PREFIX: `skill00_`,
                        SUFFIX: ``
                    })}`);
                    TempClass.__setField(`FileDescription`, `${kType.toLowerCase()}_${(`0${parseInt(kFileId) + 1}`).slice(-2)}`);
                    TempClass.__setField(`isCircular`, `1`);
                    TempClass.__setField(`bitmapNameUp`, `ui/skills/skillallocation/skills_buttonborderround01.tex`);
                    TempClass.__setField(`bitmapNameDown`, `ui/skills/skillallocation/skills_buttonborderrounddown01.tex`);
                    TempClass.__setField(`bitmapNameInFocus`, `ui/skills/skillallocation/skills_buttonborderroundover01.tex`);
                    TempClass.__setField(`bitmapPositionX`, TempTypeData.aDefaults[kFileId].Coords[0]);
                    TempClass.__setField(`bitmapPositionY`, TempTypeData.aDefaults[kFileId].Coords[1]);
                    TempClass.__setField(`skillName`, TempFilePath);
                    // save class (SKILL BUTTON)
                    this.aMasteryData.push(TempClass);
                    
                    TempClass = new libWZ.GrimDawn.Assets[TempTypeData.Settings.Asset](TempFilePath);
    
                    TempClass.editDBR(TempDBR);
                    TempClass.__setField(`skillMaxLevel`, TempTypeData.Settings.aRanks[0]);
                    TempClass.__setField(`skillUltimateLevel`, TempTypeData.Settings.aRanks[1]);
                    TempClass.__setField(`skillTier`, TempTypeData.aDefaults[kFileId].SkillTier);
                    
                    // TAGS \\
                    TempTag = TagNameTPL.wzReplace({
                        MASTERY_FOLDER: kMasteryFolder.toUpperCase(),
                        TYPE_NAME: kType,
                        TYPE_COUNT: (`0${parseInt(kFileId) + 1}`).slice(-2)
                    });
                    this._Tags.__setField(TempTag, SkillNameTPL.wzReplace({
                        MASTERY_NAME: this.mData.Settings.MasteryNames[kMasteryFolder],
                        TYPE_NAME: kType,
                        SUFFIX: TempTypeData.aDefaults[kFileId].NameSuffix
                    }));
                    TempClass.__setField(`skillDisplayName`, TempTag);
                    if(kType === `Modifier`){
                        TempClass.__setField(`skillBaseDescription`, TagDescTPL.wzReplace({
                            MASTERY_FOLDER: kMasteryFolder.toUpperCase(),
                            TYPE_NAME: kType,
                            TYPE_COUNT: (`0${parseInt(kFileId) + 1}`).slice(-2)
                        }));
                    }else{
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