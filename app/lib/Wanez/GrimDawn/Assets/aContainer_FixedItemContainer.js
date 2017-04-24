/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aContainer_FixedItemContainer extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            idleAnimation: `items/chests/anm/chest01_idle.anm`,
            idleAnimationSpeed: `1.0`,
            openAnimation: `items/chests/anm/chest01_open.anm`,
            openAnimationSpeed: `1.5`,
            openSound: `records/sounds/objects/containers/spak_lootchestwood_a01.dbr`,
            openFxPakName: `records/fx/itemfx/chestopen01_fxpak.dbr`,
            pathableWhenOpen: `1`,
            minLevel: `1`,
            maxLevel: `250`,
            lootClassification: `Champion`,
            mesh: `items/chests/chest01_woodb.msh`,
            scale:`1.4`,
            actorRadius:`1.0`,
            actorHeight:`1.0`,
            maxTransparency:`0.5`,
            castsShadows:`1`,
            outlineThickness:`0.035`,
            physicsMass:`1`,
            physicsFriction:`1`,
            goldGeneratorChance:`100`,
            goldGenerator:`records/items/lootchests/chestloottables/b01_moneygenerator.dbr`
        };
        
        this.fetchTemplate(`database/templates/fixeditemcontainer.tpl`);
        this.editDBR(this.opt);
    }
    
};
