/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aGear extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath,$type){
        super($saveFilePath);
        
        let objData = {
                AccessoryAmulet: {
                    dropSound: `records/sounds/items/spak_itemdropjewelrynecklace.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropjewelrynecklace.dbr`,
                    dropSoundWater: `records/sounds/objects/loot/spak_itemdropwaterplunksm.dbr`
                },
                AccessoryMedal: {
                    bitmap: `items/gearaccessories/medals/a03_medal_mark.tex`,
                    dropSound: `records/sounds/items/spak_itemdropjewelryring.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropjewelryring.dbr`,
                    dropSoundWater: `records/sounds/objects/loot/spak_itemdropwaterplunksm.dbr`,
                    mesh: `items/gearaccessories/medals/medal_mark_01a.msh`
                },
                AccessoryOffhand: {
                    dropSound: `records/sounds/items/spak_itemdropgeneric.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropgeneric.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
                },
                AccessoryRing: {
                    dropSound: `records/sounds/items/spak_itemdropjewelryring.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropjewelryring.dbr`,
                    dropSoundWater: `records/sounds/objects/loot/spak_itemdropwaterplunksm.dbr`
                },
                AccessoryShield: {
                    hitSound: `records/sounds/items/shield/shield01_slam.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/sword1h_swipe.dbr`,
                    defensiveBlockChance: `15.0`,
                    defensiveBlock: `25.0`,
                    blockAbsorption: `100.0`,
                    blockRecoveryTime: `0.8`,
                    blockSound: `records/sounds/items/shield/shield01_block.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponwood.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponwood.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                },
                AccessoryWaist: {
                    actorHeight: `1.0`,
                    actorRadius: `1.0`,
                    dropSound: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
                },
                ArmorChest: {
                    armorClassification: `Light`,
                    actorHeight: `1.0`,
                    actorRadius: `1.0`,
                    dropSound: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
                },
                ArmorFeet: {
                    armorClassification: `Light`,
                    actorHeight: `1.0`,
                    actorRadius: `1.0`,
                    dropSound: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
                },
                ArmorHands: {
                    armorClassification: `Light`,
                    actorHeight: `1.0`,
                    actorRadius: `1.0`,
                    dropSound: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
                },
                ArmorHead: {
                    armorClassification: `Light`,
                    actorHeight: `1.0`,
                    actorRadius: `1.0`,
                    dropSound: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
                },
                ArmorLegs: {
                    armorClassification: `Light`,
                    actorHeight: `1.0`,
                    actorRadius: `1.0`,
                    dropSound: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
                },
                ArmorShoulders: {
                    armorClassification: `Light`,
                    actorHeight: `1.0`,
                    actorRadius: `1.0`,
                    dropSound: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdroparmormetalsm.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`
                },
                Weapon1HAxe: {
                    actorHeight: `0.5`,
                    actorRadius: `0.5`,
                    scale: `1.0`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`,
                    hitSound: `records/sounds/items/weaponattacks/spak_blunt_impact.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/spak_blunt_swing.dbr`,
                    weaponTrail: `records/fx/fxtrails/defaultsword_fxtrail.dbr`
                },
                Weapon1HDagger: {
                    actorHeight: `0.5`,
                    actorRadius: `0.5`,
                    scale: `1.0`,
                    bitmap: `items/gearweapons/swords1h/bitmaps/a00_sword001.tex`,
                    hitSound: `records/sounds/items/weaponattacks/sword1h_impactdefault.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/sword1h_swipe.dbr`,
                    weaponTrail: `records/fx/fxtrails/defaultsword_fxtrail.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`,
                    mesh: `items/gearweapons/swords1h/sword1h_000a.msh`
                },
                Weapon1HGun: {
                    actorRadius: `0.5`,
                    actorHeight: `0.5`,
                    scale: `1.0`,
                    basicProjectileName: `records/fx/itemfx/projectiles/gun1h_projectiledefault_fx01.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/spak_pistol_shot.dbr`,
                    attackEffect: `records/fx/itemfx/equipmentfx/gun2h_muzzleflashdefault_fx01.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                },
                Weapon1HMace: {
                    actorRadius: `0.5`,
                    actorHeight: `0.5`,
                    scale: `1.0`,
                    hitSound: `records/sounds/items/weaponattacks/spak_blunt_impact.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/spak_blunt_swing.dbr`,
                    weaponTrail: `records/fx/fxtrails/defaultsword_fxtrail.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponwood.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponwood.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                },
                Weapon1HScepter: {
                    actorRadius: `0.5`,
                    actorHeight: `0.5`,
                    scale: `1.0`,
                    hitSound: `records/sounds/items/weaponattacks/spak_blunt_impact.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/spak_blunt_swing.dbr`,
                    weaponTrail: `records/fx/fxtrails/defaultsword_fxtrail.dbr`,
                    itemCostName: `records/game/itemcostformulas_caster.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                },
                Weapon1HSword: {
                    actorRadius: `0.5`,
                    actorHeight: `0.5`,
                    scale: `1.0`,
                    hitSound: `records/sounds/items/weaponattacks/sword1h_impactdefault.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/sword1h_swipe.dbr`,
                    weaponTrail: `records/fx/fxtrails/defaultsword_fxtrail.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                },
                Weapon2HAxe: {
                    actorRadius: `0.5`,
                    actorHeight: `0.5`,
                    scale: `1.0`,
                    hitSound: `records/sounds/items/weaponattacks/spak_blunt_impact.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/spak_blunt_swing.dbr`,
                    weaponTrail: `records/fx/fxtrails/defaultsword_fxtrail.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                },
                Weapon2HGun: {
                    actorRadius: `0.5`,
                    actorHeight: `0.5`,
                    scale: `1.0`,
                    basicProjectileName: `records/fx/itemfx/projectiles/gun2h_projectiledefault_fx01.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/spak_rifle_shot.dbr`,
                    attackEffect: `records/fx/itemfx/equipmentfx/gun2h_muzzleflashdefault_fx01.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                },
                Weapon2HMace: {
                    actorRadius: `0.5`,
                    actorHeight: `0.5`,
                    scale: `1.0`,
                    hitSound: `records/sounds/items/weaponattacks/spak_blunt_impact.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/spak_blunt_swing.dbr`,
                    weaponTrail: `records/fx/fxtrails/defaultsword_fxtrail.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                },
                Weapon2HSword: {
                    actorRadius: `0.5`,
                    actorHeight: `0.5`,
                    scale: `1.0`,
                    hitSound: `records/sounds/items/weaponattacks/sword1h_impactdefault.dbr`,
                    swipeSound: `records/sounds/items/weaponattacks/sword1h_swipe.dbr`,
                    weaponTrail: `records/fx/fxtrails/defaultsword_fxtrail.dbr`,
                    dropSound: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSound3D: `records/sounds/items/spak_itemdropweaponmetal.dbr`,
                    dropSoundWater: `records/sounds/items/spak_itemdropwaterplunklg.dbr`
                }
            },
            objTPL = {
                AccessoryAmulet: `database/templates/jewelry_amulet.tpl`,
                AccessoryMedal: `database/templates/jewelry_medal.tpl`,
                AccessoryOffhand: `database/templates/weapon_offhand.tpl`,
                AccessoryRing: `database/templates/jewelry_ring.tpl`,
                AccessoryShield: `database/templates/weaponarmor_shield.tpl`,
                AccessoryWaist: `database/templates/armor_waist.tpl`,
                ArmorChest: `database/templates/armor_chest.tpl`,
                ArmorFeet: `database/templates/armor_feet.tpl`,
                ArmorHands: `database/templates/armor_hands.tpl`,
                ArmorHead: `database/templates/armor_head.tpl`,
                ArmorLegs: `database/templates/armor_legs.tpl`,
                ArmorShoulders: `database/templates/armor_shoulders.tpl`,
                Weapon1HAxe: `database/templates/weapon_axe.tpl`,
                Weapon1HDagger: `database/templates/weapon_dagger.tpl`,
                Weapon1HGun: `database/templates/weapon_ranged1h.tpl`,
                Weapon1HMace: `database/templates/weapon_mace.tpl`,
                Weapon1HScepter: `database/templates/weapon_scepter.tpl`,
                Weapon1HSword: `database/templates/weapon_sword.tpl`,
                Weapon2HAxe: `database/templates/weapon_axe2h.tpl`,
                Weapon2HGun: `database/templates/weapon_ranged2h.tpl`,
                Weapon2HMace: `database/templates/weapon_mace2h.tpl`,
                Weapon2HSword: `database/templates/weapon_sword2h.tpl`
            };
        
        this.opt = {
            hidePrefixName: `0`,
            hideSuffixName: `0`,
            itemLevel: `1`,
            itemClassification: `Common`,
            itemCost: `100`,
            itemCostName: `records/game/itemcostformulas.dbr`,
            levelRequirement: `1`,
            maxTransparency: `0.5`,
            outlineThickness: `0.035`,
            physicsFriction: `5.0`,
            physicsMass: `1.0`,
            scale: `1.0`,
            strengthRequirement: `0`,
            intelligenceRequirement: `0`,
            dexterityRequirement: `0`
        };
        
        Object.assign(this.opt,objData[$type]);
        
        this.fetchTemplate(objTPL[$type]);
        this.editDBR(this.opt);
    }
    
};

