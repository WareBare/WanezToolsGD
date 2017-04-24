/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    //_wzMisc: new WZ.Core.cData(`${wzDir.Config}/wz-misc.json`,new WZ.Core.Parser.cJSON()),
    miscConfig: new eConfig({name: `wz-misc`}),
    _mDBR: false,
    _tagsCurrent: false,
    _luaFnCurrent: false,
    
    
    saveCurrentData: function(){
        this._mDBR.saveModuleData([this._tagsCurrent,false,this._luaFnCurrent]);
    },
    
    saveDataMisc: function(){
        this._tagsCurrent.saveData();
        this._luaFnCurrent.saveData();
    },
    
    contentDGAScripted: function(){
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(this.miscConfig.get(`_dga.script`),`mod_wanez/_dga/script`);
        this._tagsCurrent = this.Base._tagsDGA;
        this._luaFnCurrent = this.Base._luaFnDGA;
    },
    
    contentDGAItems: function(){
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(this.miscConfig.get(`_dga.items`),`mod_wanez/_dga/items`);
        this._tagsCurrent = this.Base._tagsDGA;
        this._luaFnCurrent = this.Base._luaFnDGA;
        
        let out_ = ``;
        
        out_ += appData.tpl.Buttons.Default.wzParseTPL([
            {
                "ONCLICK": `_cms.setCrafters();`,
                "TEXT": `Blacksmiths`
            },
            {
                "ONCLICK": `_cms.setLootTables();`,
                "TEXT": `LootTables`
            }
        ]);
        
        return out_;
    },
    
    contentDGAAffixes: function(){
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(this.miscConfig.get(`_dga.affixes`),`mod_wanez/_dga/items`);
        this._tagsCurrent = this.Base._tagsDGA;
        this._luaFnCurrent = this.Base._luaFnDGA;
        
        let out_ = ``;
        
        out_ += appData.tpl.Buttons.Default.wzParseTPL([
            {
                "ONCLICK": `_cms.setCrafters();`,
                "TEXT": `Blacksmiths`
            }
        ]);
        
        return out_;
    },
    
    contentEnemyAffixes: function(){
        let ID = [
                [1,"Onslaught","Monsters are faster"],
                [2,"Monster Health","Monsters have more Health"],
                [3,"Monster Damage","Monsters have more Damage"],
                [4,"Monster Regen","Monsters Regenerate faster"],
                [5,"Monster Offensive Ability","Monsters have more Offensive Ability"],
                [6,"Monster Defensive Ability","Monsters have more Defensive Ability"]
            ],
            TYPE=[["b","60000",100]],
            TIER=[[1]],
            SKILL= [
                {}, {
                    "characterRunSpeedModifier": 25,
                    "characterAttackSpeedModifier": 25,
                    "characterSpellCastSpeedModifier": 25
                }, {
                    "characterLifeModifier": 25,
                    "characterManaModifier": 25
                }, {
                    "offensiveTotalDamageModifier": 25
                }, {
                    "characterLifeRegen": 15,
                    "characterLifeRegenModifier": 25,
                    "characterManaRegen": 10,
                    "characterManaRegenModifier": 25
                }, {
                    "characterOffensiveAbilityModifier": 25
                }, {
                    "characterDefensiveAbilityModifier": 25
                }
            ],
            tplAffix;
        
        tplAffix = [
            {
                "tpl": "{TYPE}{AFFIX_3}",
                "wzAsset": "aScroll",
                "fileExt": "dbr",
                "subDir": "/_dga/items/affixes",
                "replace": {
                    "TYPE": TYPE,
                    "AFFIX": ID
                },
                "tags": {
                    "itemText": {
                        "key": "tagWzDGA_ItemsScrolls_AffixB{AFFIX_3}_DESC",
                        "value": "\"Type (II) Affix: You can use this scroll to activate a new affix, you can have multiple affixes of the same type.\"{^n}{^r}{AFFIX_TAG2}"
                    },
                    "description": {
                        "key": "tagWzDGA_ItemsScrolls_AffixB{AFFIX_3}_NAME",
                        "value": "Affix: {AFFIX_TAG} (II)"
                    }
                },
                "luaEvents":{
                    "onDestroy": {
                        "key": "wanez.fn.gDGA.useDGA_AffixB{AFFIX_3}",
                        "value": "wanez.DGA.useDGA_Affix(argObjectId,'{TYPE}',{AFFIX});",
                        "args": "argObjectId"
                    }
                },
                "misc": {
                    "bitmap": "wanez/items/dga_affixes/bitmaps/{TYPE}{AFFIX_3}.tex",
                    "bitmapButtonUp": "wanez/items/dga_affixes/bitmaps/{TYPE}{AFFIX_3}.tex",
                    "bitmapButtonDown": "wanez/items/dga_affixes/bitmaps/{TYPE}{AFFIX_3}.tex"
                }
            },
            {
                "tpl": "tdyn_DGA_Affix_{TYPE}000",
                "wzAsset": "aLootTdyn",
                "fileExt": "dbr",
                "subDir": "/_dga/items/affixes/loottables",
                "replace": {
                    "TYPE": TYPE
                },
                "misc": {
                    "disableLevelLimits": "1",
                    "lootName1": "mod_wanez/_dga/items/affixes/b001.dbr",
                    "lootWeight1": "100",
                    "lootName2": "mod_wanez/_dga/items/affixes/b002.dbr",
                    "lootWeight2": "100",
                    "lootName3": "mod_wanez/_dga/items/affixes/b003.dbr",
                    "lootWeight3": "100",
                    "lootName4": "mod_wanez/_dga/items/affixes/b004.dbr",
                    "lootWeight4": "25",
                    "lootName5": "mod_wanez/_dga/items/affixes/b005.dbr",
                    "lootWeight5": "100",
                    "lootName6": "mod_wanez/_dga/items/affixes/b006.dbr",
                    "lootWeight6": "100"
                }
            },
            {
                "tpl": "craft_DGA_Affix_{TYPE}000",
                "wzAsset": "aScroll",
                "fileExt": "dbr",
                "subDir": "/_dga/items/blueprints",
                "replace": {
                    "TYPE": TYPE
                },
                "tags": {
                    "itemText": {
                        "key": "tagWzDGA_ItemsScrolls_Affix{TYPE}X_DESC",
                        "value": "\"Type (II) Affix: You can use this scroll to activate a new affix, you can have multiple affixes of the same type.{^n}Crafting this will give you a random scroll for an Affix.\"{^n}{^r}This Affix Type will make your enemies stronger"
                    },
                    "description": {
                        "key": "tagWzDGA_ItemsScrolls_Affix{TYPE}X_NAME",
                        "value": "Random DGA Affix (II)"
                    }
                },
                "misc": {
                    "bitmap": "wanez/items/dga_affixes/bitmaps/{TYPE}000.tex",
                    "bitmapButtonUp": "wanez/items/dga_affixes/bitmaps/{TYPE}000.tex",
                    "bitmapButtonDown": "wanez/items/dga_affixes/bitmaps/{TYPE}000.tex"
                }
            },
            {
                "tpl": "Blueprint_DGA_Affix_{TYPE}000",
                "wzAsset": "aBlueprint",
                "fileExt": "dbr",
                "subDir": "/_dga/items/blueprints/global",
                "replace": {
                    "TYPE": TYPE
                },
                "misc": {
                    "artifactName": "mod_wanez/_dga/items/affixes/loottables/tdyn_dga_affix_{TYPE}000.dbr",
                    "forcedRandomArtifactName": "mod_wanez/_dga/items/blueprints/craft_dga_affix_{TYPE}000.dbr",
                    "artifactCreationCost": "100",
                    "reagentBaseBaseName": "mod_wanez/_dga/items/currency/a_001b.dbr",
                    "reagentBaseQuantity": "15",
                    "reagent1BaseName": "",
                    "reagent1Quantity": ""
                }
            },
            {
                "wzAsset": "aMonster",
                "tpl": "{TYPE}{ID_3}_entity_{TIER_2}",
                "fileExt": "dbr",
                "subDir": "/_dga/items/affixes",
                "replace": {
                    "TIER": TIER,
                    "ID": ID,
                    "TYPE": TYPE
                },
                "misc": {
                    "skillName2": "mod_wanez/skills/dga/affix_{TYPE}{ID_3}.dbr",
                    "skillLevel2": "1",
                    "dyingSkillName": "mod_wanez/skills/dga/affix_{TYPE}{ID_3}.dbr",
                    "factions": "mod_wanez/faction/controller_dga.dbr"
                }
            },
            {
                "wzAsset": "aSkill_BuffOther",
                "tpl": "affix_{TYPE}{ID_3}",
                "fileExt": "dbr",
                "subDir": "/skills/dga",
                "replace": {
                    "ID": ID,
                    "TYPE": TYPE
                },
                "misc": {
                    "buffSkillName": "mod_wanez/skills/dga/affix_{TYPE}{ID_3}_buff.dbr"
                }
            },
            {
                "wzAsset": "aSkillBuff_passive",
                "tpl": "affix_{TYPE}{ID_3}_buff",
                "fileExt": "dbr",
                "subDir": "/skills/dga",
                "replace": {
                    "ID": ID,
                    "TYPE": TYPE
                },
                "misc": {
                    "skillActiveDuration": "{TYPE_TAG}",
                    "skillTargetRadius": "{TYPE_TAG2}"
                },
                "skill": SKILL
            }
        ];
        
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(tplAffix,`mod_wanez`);
        this._tagsCurrent = this.Base._tagsDGA;
        this._luaFnCurrent = this.Base._luaFnDGA;
    },
    
    contentGlobalCurrency: function(){
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(this.miscConfig.get(`global.currency`),`mod_wanez/currency`);
        this._tagsCurrent = this.Base._tagsGlobal;
        this._luaFnCurrent = this.Base._luaFnDGA;
    },
    
    contentGear: function(){
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(this.miscConfig.get(`gear.exchange`),`mod_wanez/_gear/exchange`);
        this._tagsCurrent = this.Base._tagsGlobal;
        this._luaFnCurrent = false;
        
        let out_ = ``;
        
        out_ += appData.tpl.Buttons.Default.wzParseTPL([
            {
                "ONCLICK": `_cms.setCrafters();`,
                "TEXT": `Blacksmiths`
            },
            {
                "ONCLICK": `_cms.setLootTables();`,
                "TEXT": `LootTables`
            }
        ]);
        
        return out_;
    },
    
    contentPylons: function(){
        let ID = [
                [1,"Shrine of Enlightenment","Increases Experience Gain"],
                [2,"Shrine of Fleeting","Increases Movement Speed"],
                [3,"Shrine of Celerity","Increases Attack and Casting Speed"],
                [4,"Shrine of Quickening","Increases Cooldown Reduction and Mana Cost Reduction"],
                [5,"Shrine of the Giant","Increases Health and Energy"],
                [6,"Shrine of Trollblood","Increases Health and Energy Regeneration"],
                [7,"Shrine of Precision","Increases Offensive Ability"],
                [8,"Shrine of Avoidance","Increases Defensive Ability"],
                [9,"Shrine of Protection","Increases Armor and Absorption"],
                [10,"Shrine of Power","Increases All Damage"],
                [11,"Shrine of Resistance","Increases Maximum Resistances"],
                [12,"Shrine of Force","Increases Reflect Reduction"]
            ],
            TYPE=[["a","6000;60;120;180;240;300",15]],
            TIER=[[1,2],[2,3],[3,4],[4,5],[5,6]],
            SKILL= [
                {},
                {
                    "characterIncreasedExperience": 150
                }, {
                    "characterRunSpeedModifier": 50,
                    "skillProjectileSpeedModifier": 20
                }, {
                    "characterAttackSpeedModifier": 25,
                    "characterSpellCastSpeedModifier": 25
                }, {
                    "skillCooldownReduction": 25,
                    "skillManaCostReduction": 25
                }, {
                    "characterLifeModifier": 25,
                    "characterManaModifier": 25
                }, {
                    "characterLifeRegen": 15,
                    "characterLifeRegenModifier": 25,
                    "characterManaRegen": 10,
                    "characterManaRegenModifier": 25
                }, {
                    "characterOffensiveAbility": 100,
                    "characterOffensiveAbilityModifier": 25
                }, {
                    "characterDefensiveAbility": 100,
                    "characterDefensiveAbilityModifier": 25
                }, {
                    "defensiveAbsorptionModifier": 25,
                    "defensiveProtectionModifier": 25
                }, {
                    "offensiveTotalDamageModifier": 500
                }, {
                    "defensiveAllMaxResist": 5
                }, {
                    "defensivePercentReflectionResistance": 50
                }
            ],
            tplPylon;
        
        tplPylon = [
            {
                "wzAsset": "aPylon",
                "tpl": "pylon_{TYPE}{ID_3}",
                "fileExt": "dbr",
                "subDir": "/_dga/pylons",
                "replace": {
                    "ID": ID,
                    "TYPE": TYPE
                },
                "tags": {
                    "description": {
                        "key": "tagWzDGA_Pylon_{TYPE}{ID_3}_NAME",
                        "value": "{ID_TAG}"
                    }
                },
                "luaEvents":{
                    "onInteract": {
                        "key": "wanez.fn.gDGA.onInteractPylon_{TYPE}{ID_3}",
                        "value": "wanez.DGA.onInteractPylon(argObjectId,'{TYPE}',{ID});",
                        "args": "argObjectId"
                    }
                },
                "misc":{
                    "description": "tagWzDGA_Pylon_{TYPE}{ID_3}_NAME"
                }
            },
            {
                "wzAsset": "aMonster",
                "tpl": "pylon_{TYPE}{ID_3}_entity_{TIER_2}",
                "fileExt": "dbr",
                "subDir": "/_dga/pylons",
                "replace": {
                    "TIER": TIER,
                    "ID": ID,
                    "TYPE": TYPE
                },
                "misc": {
                    "skillName1": "mod_wanez/skills/dga/pylon_{TYPE}{ID_3}.dbr",
                    "skillLevel1": "{TIER_TAG}",
                    "dyingSkillName": "mod_wanez/skills/dga/pylon_{TYPE}{ID_3}.dbr"
                }
            },
            {
                "wzAsset": "aSkill_BuffOther",
                "tpl": "pylon_{TYPE}{ID_3}",
                "fileExt": "dbr",
                "subDir": "/skills/dga",
                "replace": {
                    "ID": ID,
                    "TYPE": TYPE
                },
                "misc": {
                    "buffSkillName": "mod_wanez/skills/dga/pylon_{TYPE}{ID_3}_buff.dbr"
                }
            },
            {
                "wzAsset": "aSkillBuff_passive",
                "tpl": "pylon_{TYPE}{ID_3}_buff",
                "fileExt": "dbr",
                "subDir": "/skills/dga",
                "replace": {
                    "ID": ID,
                    "TYPE": TYPE
                },
                "tags": {
                    "skillBaseDescription": {
                        "key": "tagWzDGA_Pylon_{TYPE}{ID_3}_DESC",
                        "value": "{ID_TAG2}"
                    },
                    "skillDisplayName": {
                        "key": "tagWzDGA_Pylon_{TYPE}{ID_3}_NAME",
                        "value": "{ID_TAG}"
                    }
                },
                "misc": {
                    "skillActiveDuration": "{TYPE_TAG}",
                    "skillTargetRadius": "{TYPE_TAG2}",
                    "skillUpBitmapName": "wanez/skills/pylons/bitmaps/{TYPE}{ID_3}.tex",
                    "skillDownBitmapName": "wanez/skills/pylons/bitmaps/{TYPE}{ID_3}.tex"
                },
                "skill": SKILL
            }
        ];
        
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(tplPylon,`mod_wanez`);
        this._tagsCurrent = this.Base._tagsGlobal;
        this._luaFnCurrent = this.Base._luaFnDGA;
    },
    contentPylons_new: function(){
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(this.miscConfig.get(`_dga.pylons`),`mod_wanez/_dga/pylons`);
        this._tagsCurrent = this.Base._tagsGlobal;
        this._luaFnCurrent = false;
    },
    contentSkills: function(){
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(this.miscConfig.get(`global.skills`),`mod_wanez/skills`);
        this._tagsCurrent = this.Base._tagsGlobal;
        this._luaFnCurrent = false;
    },
    
    contentGearMaterials: function(){
        this._mDBR = new WZ.GrimDawn.Assets.dbrModule(this.miscConfig.get(`gear.materials`),`mod_wanez/_gear/materials`);
        this._tagsCurrent = this.Base._tagsGlobal;
        this._luaFnCurrent = false;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = '';
        
        
        //this.Base.iniDifficulties();
        
        if(this.contentType){
            if(this.contentType === `DGA_Scripted`){
                out_ = this.contentDGAScripted();
            }else if(this.contentType === `DGA_Items`){
                out_ = this.contentDGAItems();
            }else if(this.contentType === `Global_Currency`){
                out_ = this.contentGlobalCurrency();
            }else if(this.contentType === `DGA_Affixes`){
                out_ = this.contentDGAAffixes();
            }else if(this.contentType === `Enemy_Affixes`){
                out_ = this.contentEnemyAffixes();
            }else if(this.contentType === `Gear`){
                out_ = this.contentGear();
            }else if(this.contentType === `Gear_Materials`){
                out_ = this.contentGearMaterials();
            }else if(this.contentType === `Pylons`){
                out_ = this.contentPylons();
            }
        }
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [
            {
                "ONCLICK": "_cms.saveCurrentData()",
                "TEXT": "S. Data"
            }, {
                "ONCLICK": "_cms.saveDataMisc()",
                "TEXT": "S. Misc"
            }
        ];
    },
    sidebarList_: function(){
        return {
            'DGA_Scripted':[],
            'DGA_Items':[],
            'DGA_Affixes':[],
            'Enemy_Affixes':[],
            'Global_Currency':[],
            'Gear':[],
            'Gear_Materials':[],
            'Pylons':[]
        }
    },
    
    setCrafters: function(){
        this.Base.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_dga/npcs/blacksmith_dga_normal.dbr`),[`mod_wanez/_dga/items/blueprints/normal`,`mod_wanez/_dga/items/blueprints/global`]);
        this.Base.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_dga/npcs/blacksmith_dga_ultimate.dbr`),[`mod_wanez/_dga/items/blueprints/ultimate`,`mod_wanez/_dga/items/blueprints/global`]);
        
        // GEAR \\
        this.Base.saveCrafter(new WZ.GrimDawn.cData(`/mod_wanez/_gear/creatures/npcs/blacksmith_leveling01.dbr`),[`mod_wanez/_gear/items/leveling/blueprints`,`mod_wanez/_gear/exchange/blueprints`]);
    },
    
    setLootTables: function(){
        let pathMateria = `${WZ.GrimDawn.tFn.getPaths().Core}/records/items/materia`,
            filesMateria = fs.readdirSync(`${pathMateria}`),
            filesMateriaCommon = [],filesMateriaRare = [],
            pathRelic = `records/items/gearrelic`,
            filesRelic = fs.readdirSync(`${WZ.GrimDawn.tFn.getPaths().Core}/${pathRelic}`),
            filesRelic002 = [],filesRelic003 = [],filesRelic004 = [];
        
        try{ // todo wzMod data (if there is any in the future)
            fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/records/items/materia`, fs.F_OK);
            Object.assign(filesMateria,fs.readdirSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/records/items/materia`));
        }catch (err){}try{
            fs.accessSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${pathRelic}`, fs.F_OK);
            Object.assign(filesRelic,fs.readdirSync(`${WZ.GrimDawn.tFn.getPaths().Mod}/${pathRelic}`));
        }catch(err){}
        
        for(let $_Index in filesMateria){
            if( filesMateria[$_Index].includes(`compa_`) ){
                filesMateriaCommon.push(`records/items/materia/${filesMateria[$_Index]}`)
            }else if( filesMateria[$_Index].includes(`compb_`) ){
                filesMateriaRare.push(`records/items/materia/${filesMateria[$_Index]}`)
            }
        }
        // Components (Common)
        this.Base.saveLootTable( new WZ.GrimDawn.cData(`/mod_wanez/_gear/exchange/loottables/tdyn_vanilla_002x.dbr`), filesMateriaCommon);
        // Components (Rare)
        this.Base.saveLootTable( new WZ.GrimDawn.cData(`/mod_wanez/_gear/exchange/loottables/tdyn_vanilla_003x.dbr`), filesMateriaRare);
        
        // RELICS \\
        for(let $_Index in filesRelic){
            if( filesRelic[$_Index].match(/^b[0-9]/g) ){
                filesRelic002.push(`${pathRelic}/${filesRelic[$_Index]}`)
            }else if( filesRelic[$_Index].match(/^c[0-9]/g) ){
                filesRelic003.push(`${pathRelic}/${filesRelic[$_Index]}`)
            }else if( filesRelic[$_Index].match(/^d[0-9]/g) ){
                filesRelic004.push(`${pathRelic}/${filesRelic[$_Index]}`)
            }
        }
        this.Base.saveLootTable( new WZ.GrimDawn.cData(`/mod_wanez/_gear/exchange/loottables/tdyn_vanilla_006x.dbr`), filesRelic002);
        this.Base.saveLootTable( new WZ.GrimDawn.cData(`/mod_wanez/_gear/exchange/loottables/tdyn_vanilla_007x.dbr`), filesRelic003);
        this.Base.saveLootTable( new WZ.GrimDawn.cData(`/mod_wanez/_gear/exchange/loottables/tdyn_vanilla_008x.dbr`), filesRelic004);
        
    }
    
};