/**
 * Created by Ware on 11/5/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkill_PetModifier extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {};
        
        this.fetchTemplate(`database/templates/skillsecondary_petmodifier.tpl`);
        this.editDBR(this.opt);
    }
    
};

