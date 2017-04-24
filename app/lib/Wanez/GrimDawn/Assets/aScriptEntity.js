/**
 * Created by WareBare on 4/24/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aScriptEntity extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            editorMesh: `creatures/enemies/proxynemesis01.msh`,
            editorScale: `1.0`,
            pathing: `0`
        };
        
        this.fetchTemplate(`database/templates/scriptentity.tpl`);
        this.editDBR(this.opt);
    }
    
};
