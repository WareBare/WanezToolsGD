/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aPylon extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            open: `1`,
            locked: `0`,
            interaction: `OpenClose`,
            direction: `Any`,
            openSound: `records/sounds/environmental/supernatural/riftgate_loop01.dbr`,
            autoClose: `0`,
            openAnimationSpeed: `1.0`,
            closeAnimationSpeed: `1.0`,
            usableRange: `1.0`,
            mesh: `level art/undergrounds/doorobjects/ugdoorobj_challengedungeon_entrance.msh`,
            scale: `1.0`,
            actorRadius: `1.0`,
            actorHeight: `0.0`,
            //baseTexture: `system/textures/invisible.tex`,
            maxTransparency: `0.9`,
            physicsMass: `1.0`,
            outlineThickness: `0.035`,
            physicsFriction: `1.0`
        };
        
        this.fetchTemplate(`database/templates/dungeonentrance.tpl`);
        this.editDBR(this.opt);
    }
    
};
