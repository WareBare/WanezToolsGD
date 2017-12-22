/**
 * Created by Ware on 12/16/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aSkillButton extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            FileDescription: `00`,
            bitmapNameDown: `ui/skills/skillallocation/skills_buttonborderdown01.tex`,
            bitmapNameInFocus: `ui/skills/skillallocation/skills_buttonborderover01.tex`,
            bitmapNameUp: `ui/skills/skillallocation/skills_buttonborder01.tex`,
            bitmapPositionX: `0`,
            bitmapPositionY: `0`,
            isCircular: `0`,
            //skillName: `0`,
            skillOffsetX: `4`,
            skillOffsetY: `4`,
            soundNameDown: `records/sounds/ui/spak_buttonskillincrement.dbr`
        };
        
        this.fetchTemplate(`database/templates/ingameui/skillbutton.tpl`);
        this.editDBR(this.opt);
    }
    
};

