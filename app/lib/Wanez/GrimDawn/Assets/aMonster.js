/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aMonster extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            alertSound: `records/sounds/enemies/vocalizations/spak_manticorealert.dbr`,
            alertSoundChance: `50.0`,
            rallySound: `records/sounds/enemies/vocalizations/spak_manticorevox.dbr`,
            rallySoundChance: `30.0`,
            rampageSound: `records/sounds/enemies/vocalizations/spak_manticorevox.dbr`,
            rampageSoundChance: `30.0`,
            rampageSoundDelay: `5000.0`,
            controller: `records/controllers/pets/controller_hellhound_aggressive.dbr`,
            controllerAggressive: `records/controllers/pets/controller_hellhound_aggressive.dbr`,
            controllerDefensive: `records/controllers/pets/controller_hellhound_defensive.dbr`,
            monsterClassification: `Champion`,
            lifeTime: `1`,
            showStatusWidgetWhenPet: `1`,
            StatusIcon: `ui/skills/icons/class06/skillicon_manticoresummon1up.tex`,
            StatusIconRed: `ui/skills/icons/class06/skillicon_manticoresummon1up_red.tex`,
            waitingAnimDelay: `5000`,
            monsterIconHeight: `3.0`,
            ambushDissolveTexture: `system/textures/cloud.tex`,
            charLevel: `charLevel*1+2`,
            minLevel: `1`,
            maxLevel: `1`,
            experiencePoints: `800`,
            characterGenderProfile: `Native`,
            characterRacialProfile: [`Race007`,`Race012`],
            numAttackSlots: `4`,
            numDefenseSlots: `4`,
            startVisible: `1`,
            distressCall: `1`,
            distressCallRange: `15.0`,
            distressCallTime: `5000`,
            maxDistressCalls: `1`,
            causesAnger: `1`,
            angerMultiplier: `1.0`,
            deathAnimBlendTime: `250.0`,
            UpperHealthDisplayPercentage: `100.0`,
            hitThreshold: `20`,
            attackSound: `records/sounds/enemies/combatbasic/spak_bite_organic.dbr`,
            swipeSound: `records/sounds/enemies/combatbasic/spak_swipe_generic01.dbr`,
            stunSound: `records/sounds/enemies/vocalizations/spak_manticorestun.dbr`,
            lightRig: `records/fx/lightrigs/enemylightrig.dbr`,
            impactSoundChance: `100.0`,
            loopingRunningSoundFadeTime: `1000`,
            avoidForce: `0.5`,
            pathMass: `1.0`,
            minRotationSpeed: `9.0`,
            maxRotationSpeed: `10.0`,
            rotateWhenChatting: `1`,
            walkSpeed: `1.0`,
            deleteBehavior: `Dissolve`,
            dissolveEffect: `records/fx/skillsother/summons/summon_generic01_fx.dbr`,
            dissolveColorR: `30`,
            dissolveColorG: `100`,
            dissolveColorB: `200`,
            dissolveTime: `0.5`,
            dissolveTexture: `fx/textures/distortionsmoke64_01.tex`,
            gibThreshold: `9999`,
            overkillOnDismiss: `1`,
            charAnimationTableName: `records/creatures/enemies/anm/anm_manticore_pet.dbr`,
            criticalHitSound: `records/sounds/enemies/vocalizations/spak_manticorecrit.dbr`,
            deathSound1: `records/sounds/enemies/vocalizations/spak_manticoredeath.dbr`,
            voxSound: `records/sounds/enemies/vocalizations/spak_manticorevox.dbr`,
            voxSoundChance: `50.0`,
            bodyFallSoundChance: `100.0`,
            voiceSound1Chance: `100.0`,
            voiceSound2Chance: `100.0`,
            voiceSound3Chance: `100.0`,
            specialAttackSound1Chance: `100.0`,
            specialAttackSound2Chance: `100.0`,
            specialAttackSound3Chance: `100.0`,
            specialAttackSound4Chance: `100.0`,
            genericSound1Chance: `100.0`,
            genericSound2Chance: `100.0`,
            genericSound3Chance: `100.0`,
            genericSound4Chance: `100.0`,
            footGrass: `records/sounds/enemies/footsteps/spak_footstep_genericdirta01.dbr`,
            footDirt: `records/sounds/enemies/footsteps/spak_footstep_genericdirta01.dbr`,
            footSand: `records/sounds/enemies/footsteps/spak_footstep_genericdirta01.dbr`,
            footSnow: `records/sounds/enemies/footsteps/spak_footstep_genericdirta01.dbr`,
            footStone: `records/sounds/enemies/footsteps/spak_footstep_genericdirta01.dbr`,
            footWood: `records/sounds/human/footsteps/footstepswood.dbr`,
            footWater: `records/sounds/enemies/footsteps/spak_footstep_genericdirta01.dbr`,
            factions: `records/controllers/factions/faction_player.dbr`,
            description: `tagPetManticoreA01`,
            mesh: `fx/meshfx/mineflare_noglow01.msh`,
            scale: `1.0`,
            actorRadius: `0.5`,
            actorHeight: `2.0`,
            maxTransparency: `0.5`,
            castsShadows: `1`,
            outlineThickness: `0.035`,
            physicsMass: `5.0`,
            physicsFriction: `10.0`,
            characterAttributeEquations: `records/skills/playerclass06/pets/bio_manticore_01.dbr`,
            characterBaseAttackSpeedTag: `CharacterAttackSpeedAverage`,
            skillName1: `records/skills/playerclass06/pets/petskill_manticore_scaling.dbr`,
            skillLevel1: `1`
        };
        
        this.fetchTemplate(`database/templates/monster.tpl`);
        this.editDBR(this.opt);
    }
    
};
