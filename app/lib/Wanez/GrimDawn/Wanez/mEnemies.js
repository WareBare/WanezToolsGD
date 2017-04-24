/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mEnemies extends libWZ.GrimDawn.cModule{
    
    constructor($strType,$enemiesModule = false){
        super();
        
        this.iType = $strType;
        //this.isDefault = ($strType.includes(`default`)) ? true : false;
        this.isDefault = ($strType.includes(`default`));
        let strType = $strType.split('_'),
            aMonsterPowerMul = {
                'type': {
                    'a': 0,
                    'b': 20,
                    'c': 66
                },
                'mode': {
                    'heroic': 0,
                    'epic': 100
                },
                'difficulty': {
                    'normal': 0,
                    'hard': 25,
                    'elite': 50
                }
            };
        this.biosMul = this.fn.mathMulGD(1,2,[ aMonsterPowerMul.type[strType[0]],aMonsterPowerMul.mode[strType[1]],(strType[2] === `default`) ? aMonsterPowerMul.difficulty.normal : aMonsterPowerMul.difficulty[strType[2]] ]);
        
        //console.log(this.biosMul);
        //console.log(aMonsterPowerMul.mode[strType[1]]);
        
        this.pathAssets = { // todo
            "skills": `${dirAssets}/wzEntities/skills`
        };
        
        this.aPaths = {
            "enemiesSource": {
                "anomalies": "records/creatures/anomalies",
                "enemies": "records/creatures/enemies",
                "skills": "",
                "controllers": "records/controllers/enemy",
                "heroChests": "",
                "bossChests": ""
            },
            "enemiesDGA": {
                "anomalies": `mod_wanez/_dga/difficulties/${$strType}/enemies/anomaly/`,
                "enemies": `mod_wanez/_dga/difficulties/${$strType}/enemies`,
                "skills": `mod_wanez/_dga/difficulties/${$strType}/enemies/skills`,
                "controllers": "mod_wanez/_dga/controllers/enemy",
                "heroChests": `mod_wanez/_dga/difficulties/${$strType}/enemies/containers`,
                "bossChests": `mod_wanez/_dga/creatures/enemies/${$strType}/containers`
            },
            "enemiesChests": {
                "Hero": `mod_wanez/_dga/difficulties/${$strType}/enemies/skills/chest_hero_default_01.dbr`,
                'BossMini': `mod_wanez/_dga/difficulties/${$strType}/enemies/skills/chest_boss_mini_01.dbr`,
                "BossDefault": `mod_wanez/_dga/difficulties/${$strType}/enemies/skills/chest_boss_default_01.dbr`,
                'BossChallenge': `mod_wanez/_dga/difficulties/${$strType}/enemies/skills/chest_boss_challenge_01.dbr`,
                'BossRaid': `mod_wanez/_dga/difficulties/${$strType}/enemies/skills/chest_boss_raid_01.dbr`,
                'Nemesis': `mod_wanez/_dga/difficulties/${$strType}/enemies/skills/chest_nemesis_default_01.dbr`
            }
        };
        this.aFolders = {
            "Main": "",
            "Hero": "/hero",
            "Nemesis": "/nemesis",
            "Boss": "/boss&quest",
            "Bios": "/bios"
        };
        
        this.aEnemies = ($enemiesModule) ? this.iniEnemiesDGA($enemiesModule) : this.iniEnemiesCore();
        console.log(this.aEnemies);
    }
    
    dbrPathChanges($tempClass,$type,$fileName){
        let tempEditDBR = {},
            newType = $type;
        
        if($type !== "Bios" && $type !== "Skills"){
            if($tempClass.getData().controller){
                tempEditDBR.controller = $tempClass.getData().controller.replace(this.aPaths.enemiesSource.controllers,this.aPaths.enemiesDGA.controllers);
            }
            if($tempClass.getData().characterAttributeEquations){
                tempEditDBR.characterAttributeEquations = $tempClass.getData().characterAttributeEquations.replace(this.aPaths.enemiesSource.enemies,this.aPaths.enemiesDGA.enemies);
            }
            
            tempEditDBR.factions = "mod_wanez/faction/controller_dga.dbr";
            tempEditDBR.dissolveTime = `1.000000`;
            tempEditDBR.deleteBehavior = `Dissolve`;
            // remove Quests
            let aQuestFields = ["questFile{COUNT}","taskUID{COUNT}"],
                skillField = "skillName{COUNT}",skillLevelField = "skillLevel{COUNT}",
                tempReplace,tempSkill,tempSkillSlotData,
                foundSkillSlot = false,skillsFree = false,consoleTrue = false,nextSkillSlot = false;
            for(let i = 1;i <= 10;i++){
                tempReplace = {"COUNT":i};
                aQuestFields[0].wzOut(tempReplace);
                aQuestFields[1].wzOut(tempReplace);
            }
            if($type === "Common" || $type === "Champion" || $type === "Hero"){
                //if(this.iType != "default") tempEditDBR.dropItems = 0;
            }
            // CHANGE CHEST ON DEATH \\
            if($type === "BossMini" || $type === "Hero" || $type === "BossDefault" || $type === `Nemesis`){
                for(let i = 1; i<=17;i++){
                    tempSkill = $tempClass.getData()[skillField.wzOut({"COUNT":i})];
                    if(typeof tempSkill === "undefined"){
                        skillsFree = true;
                    }else if($type === "BossMini" || $type === "Hero" || $type === "BossDefault"){
                        if(tempSkill.includes("hero_chest_all_01.dbr") ||
                            tempSkill.includes("hero_chest_all_direni01") ||
                            tempSkill.includes("hero_chest_equippedreduced_01") ||
                            tempSkill.includes("hero_chest_low_01") ||
                            tempSkill.includes("boss_chest_01.dbr") ||
                            tempSkill.includes("boss_chest_02.dbr") ||
                            tempSkill.includes("boss_chest_03.dbr") ||
                            tempSkill.includes("boss_chest_easy_01.dbr") ||
                            tempSkill.includes("boss_chest_easy_kyzogg.dbr")){
                            foundSkillSlot = i;
                        }
                        
                        if( tempSkill.includes("boss_chest_02.dbr") ){
                            newType = "BossChallenge";
                        }
                        if( tempSkill.includes("boss_chest_03.dbr") ){
                            newType = "BossRaid";
                        }
                    }
                    
                    if(skillsFree && !nextSkillSlot){
                        if(!foundSkillSlot){
                            foundSkillSlot = i;
                        }else{
                            nextSkillSlot = {};
                            nextSkillSlot[skillField.wzOut({"COUNT":i})] = ``;
                            nextSkillSlot[skillLevelField.wzOut({"COUNT":i})] = 0;
                        }
                    }
                }
                
                if($fileName === `warden01.dbr`){
                    tempEditDBR.poolToSpawnOnDeath = this.aPaths.skills+'/dp_wardenphase2.dbr';
                    newType = "BossRaid";
                }else if($fileName === `nemesis_undead_02a.dbr`){
                    tempEditDBR.poolToSpawnOnDeath = this.aPaths.skills+'/dp_nemesis_skeletalgolem_phase2.dbr';
                }else if($fileName === `warden02.dbr` || $fileName === `nemesis_undead_02b.dbr`){
                    newType = `Phase`;
                }else{
                    if(foundSkillSlot && !this.isDefault){
                        tempEditDBR[skillField.wzOut({"COUNT":foundSkillSlot})] = this.aPaths.enemiesChests[newType];
                        tempEditDBR[skillLevelField.wzOut({"COUNT":foundSkillSlot})] = 1;
                    }
                }
                
                if(!foundSkillSlot) console.log("ERROR: no Empty Skill!");
            }
            
            tempEditDBR.onDie = "wanez.DGA.dbr.onDie"+newType;
        }else if($type === "Skills"){
            let tempDiffRep = {'DIFFICULTY':this.iType};
            if($tempClass.getData().spawnObjects){
                tempEditDBR.spawnObjects = $tempClass.getData().spawnObjects.wzOut(tempDiffRep);
            }
            if($tempClass.getData().name1){
                tempEditDBR.name1 = $tempClass.getData().name1.wzOut(tempDiffRep);
            }
            if($tempClass.getData().name2){
                tempEditDBR.name2 = $tempClass.getData().name2.wzOut(tempDiffRep);
            }
            if($tempClass.getData().name3){
                tempEditDBR.name3 = $tempClass.getData().name3.wzOut(tempDiffRep);
            }
            if($tempClass.getData().name4){
                tempEditDBR.name4 = $tempClass.getData().name4.wzOut(tempDiffRep);
            }
            if($tempClass.getData().name5){
                tempEditDBR.name5 = $tempClass.getData().name5.wzOut(tempDiffRep);
            }
        }else if($type === "Bios"){
            tempEditDBR.characterStrength = `(${$tempClass.getData().characterStrength})*${this.biosMul}`;
            tempEditDBR.characterDexterity = `(${$tempClass.getData().characterDexterity})*${this.biosMul}`;
            tempEditDBR.characterIntelligence = `(${$tempClass.getData().characterIntelligence})*${this.biosMul}`;
            tempEditDBR.characterLife = `(${$tempClass.getData().characterLife})*${this.biosMul}`;
            tempEditDBR.characterMana = `(${$tempClass.getData().characterMana})*${this.biosMul}`;
            tempEditDBR.characterOffensiveAbility = `(${$tempClass.getData().characterOffensiveAbility})*${this.biosMul}`;
            tempEditDBR.characterDefensiveAbility = `(${$tempClass.getData().characterDefensiveAbility})*${this.biosMul}`;
        }
        
        console.info(`Enemy Data Changed!`);
        
        return [tempEditDBR,newType];
    }
    
    iniEnemiesDGA($enemiesModule){
        let objEnemies = {"Trap":{},"Pet":{},"Common":{},"Champion":{}, "Hero":{},"Nemesis":{},"BossMini":{},"BossDefault":{},"BossChallenge":{},"BossRaid":{},"Bios":{},"Anomaly":{},"Misc":{},"Phase":{},"Skills":{}},
            //objFolders = {"Trap":"Main","Pet":"Main","Common":"Main","Champion":"Main","Hero":"Hero","Nemesis":"Nemesis","Quest":"Boss","Boss":"Boss","Bios":"Bios"},
            tempClass,tempEditDBR,tempPath,tempFilePath,tempObj;
        
        for(let $_Key in $enemiesModule){
            
            for(let $_FileName in $enemiesModule[$_Key]){
                //tempClass = $enemiesModule[$_Key][$_FileName];
                tempEditDBR = this.dbrPathChanges($enemiesModule[$_Key][$_FileName],$_Key,$_FileName);
                tempPath = this.aPaths.enemiesDGA.enemies+"/"+tempEditDBR[1].toLowerCase();
                tempFilePath = `${this.fn.getPaths().Mod}/${tempPath}/${$_FileName}`;
                tempObj = $enemiesModule[$_Key][$_FileName].getData();
                tempClass = new libWZ.GrimDawn.cData(tempFilePath,false,tempEditDBR[0],tempObj);
                // remove loot
                if(!this.isDefault) {
                    if($_Key === `Common` || $_Key === `Champion` || $_Key === `Hero` || $_Key === `Nemesis` || $_Key === `BossMini` || $_Key === `BossDefault` || $_Key === `BossChallenge` || $_Key === `BossRaid` || $_Key === `Anomaly` || $_Key === `Phase`) this.removeLoot(tempClass);
                }
                
                objEnemies[tempEditDBR[1]][$_FileName] = tempClass;
            }
            
        }
        console.log(objEnemies.BossChallenge);
        
        return objEnemies;
    }
    
    removeLoot($tempClass){
        
        let objDBR = {},
            aStr = ["chanceToEquip{TYPE}", "chanceToEquip{TYPE}Item{COUNT}", "loot{TYPE}Item{COUNT}"],
            aTypes = ["Head","Chest","Shoulders","Hands","Legs","Feet","RightHand","LeftHand","Finger1","Finger2","Misc1","Misc2","Misc3"],
            tempType;
        
        for(let $_Index in aTypes){
            tempType = aTypes[$_Index];
            for(let $_Index02 in aStr){
                
                if($_Index02 === 0){
                    objDBR[aStr[$_Index02].wzOut({"TYPE":tempType})] = 0.0;
                }else{
                    for(let i = 1; i <=6; i++){
                        objDBR[aStr[$_Index02].wzOut({"TYPE":tempType,"COUNT":i})] = ($_Index02 === 1) ? 0 : "";
                    }
                }
            }
        }
        
        $tempClass.editDBR(objDBR);
        
    }
    
    propertyChanges(){
        // TODO
    }
    
    iniEnemiesCore(){
        let objFiles = {},
            objEnemies = {"Trap":{},"Pet":{},"Common":{},"Champion":{},"Hero":{},"Nemesis":{},"BossMini":{},"BossDefault":{},"BossChallenge":{},"BossRaid":{},"Bios":{},"Anomaly":{},"Misc":{},"Phase":{},"Skills":{}},
            tempClass,tempKey,tempEditDBR;
        
        for( let $_Key in this.aFolders ){
            objFiles[$_Key] = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Core}/${this.aPaths.enemiesSource.enemies}${this.aFolders[$_Key]}`,true);
        }
        objFiles.Anomaly = wzIO.dir_get_contentsSync(`${this.fn.getPaths().Core}/${this.aPaths.enemiesSource.anomalies}`,true);
        
        objFiles.Skills = wzIO.dir_get_contentsSync(this.pathAssets.skills,true);
        
        for(let $_Key in objFiles){
            
            for( let $_FileName in objFiles[$_Key] ){
                tempClass = new libWZ.GrimDawn.cData(objFiles[$_Key][$_FileName]);
                tempKey = $_Key;
                if($_Key === "Main"){
                    if($_FileName.includes("summon")){
                        tempKey = "Pet";
                    }else if($_FileName.includes("trap")){
                        tempKey = "Trap";
                    }else{
                        tempKey = tempClass.getData().monsterClassification || "Common";
                    }
                    
                }else if($_Key === "Boss"){
                    if(tempClass.getData().monsterClassification === "Quest"){
                        tempKey = "BossDefault";
                    }else if(tempClass.getData().monsterClassification === "Hero"){
                        tempKey = "BossMini";
                    }else{
                        tempKey = "Misc";
                    }
                }
                
                objEnemies[tempKey][$_FileName] = tempClass;
            }
            
        }
        
        
        
        return objEnemies;
    }
    
    getEnemies(){
        return this.aEnemies;
    }
    
    prepForLuaTempPack($type,$aTempPacks){
        $aTempPacks = $aTempPacks || {};
        let tempEnemy,tempEnemyName;
        
        for(let $_Name in this.aEnemies[$type]){
            tempEnemy = this.aEnemies[$type][$_Name];
            tempEnemyName = $_Name.split('_');
            $aTempPacks[tempEnemyName[0]] = $aTempPacks[tempEnemyName[0]] || {"Common":[],"Champion":[],"Hero":[]};
            
            $aTempPacks[tempEnemyName[0]][$type].push($_Name);
        }
        
        return $aTempPacks;
    }
    prepForLuaTempEnemy($type){
        let aTemp = [],tempEnemy,tempEnemyName;
        
        for(let $_Name in this.aEnemies[$type]){
            tempEnemy = this.aEnemies[$type][$_Name];
            //tempEnemyName = $_Name.split('_');
            //$aTempPacks[tempEnemyName[0]] = $aTempPacks[tempEnemyName[0]] || {"Common":[],"Champion":[],"Hero":[]};
            
            //$aTempPacks[tempEnemyName[0]][$type].push($_Name);
            aTemp.push($_Name);
        }
        
        return aTemp;
    }
    prepForLuaTempAnomaly(){
        return {
            'AetherCrystals': [
                `aethercrystal_a01.dbr`,
                `aethercrystal_a02.dbr`,
                `aethercrystal_a03.dbr`,
                `aethercrystalsmall_a01.dbr`,
                `aethercrystalsmall_a02.dbr`
            ]
        }
    }
    prepForLua(){
        
        let aPacks = [],aNameToId = {},i = 1,objEnemies,
            aAnomalies = [],
            aTempPacks = this.prepForLuaTempPack(`Common`);
        
        aTempPacks = this.prepForLuaTempPack(`Champion`,aTempPacks);
        aTempPacks = this.prepForLuaTempPack(`Hero`,aTempPacks);
        
        for(let $_Name in aTempPacks){
            if(aTempPacks[$_Name].Common.length > 0 && aTempPacks[$_Name].Champion.length > 0 && aTempPacks[$_Name].Hero.length > 0){
                aPacks.push(aTempPacks[$_Name]);
                aNameToId['pack_'+$_Name] = i;
                i++;
            }
        }
        
        
        
        objEnemies = {
            'aAnomalies': this.prepForLuaTempAnomaly(),
            'aPacks': aPacks,
            'aBossMini': this.prepForLuaTempEnemy(`BossMini`),
            'aBossDefault': this.prepForLuaTempEnemy(`BossDefault`),
            'aBossChallenge': this.prepForLuaTempEnemy(`BossChallenge`),
            'aBossRaid': this.prepForLuaTempEnemy(`BossRaid`),
            'aNemesis': this.prepForLuaTempEnemy(`Nemesis`)
        };
        
        return [objEnemies,{'Enemies':aNameToId}];
    }
    saveEnemies($dataMisc){
        
        this.aDataMisc = this.prepForLua();
        $dataMisc = $dataMisc || false;
        
        // prepare tags,lua,luaFN for saving (outside this class)
        if($dataMisc){
            let tempArray = this.aDataMisc || [this.aTags,this.aLua,this.aLuaFN];
            for( let $_Index in tempArray ){
                if(tempArray[$_Index]){
                    for( let $_fieldName in tempArray[$_Index] ){
                        $dataMisc[$_Index].editData($_fieldName,tempArray[$_Index][$_fieldName]);
                    }
                }
            }
        }
        
        //console.log(this.aDataMisc);
        
        /*
         this.aModuleData = [
         this.prepEnemies()
         ];
         */
        this.aModuleData = this.aEnemies;
        this.saveModule($dataMisc);
        
    }
    
};
