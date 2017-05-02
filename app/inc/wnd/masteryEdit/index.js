/**
 * Created by WareBare on 4/29/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    contentType: `Properties`,
    title: `Edit Mastery`,
    wndId: `masteryEdit`,
    Settings: {
        height: `1000px`,
        width: `750px`,
    },
    formData: {},
    //skillConfig: new eConfig({name: `gd-skills`}),
    
    femalepc01: `records/creatures/pc/femalepc01.dbr`,
    malepc01: `records/creatures/pc/malepc01.dbr`,
    //_mMateria: false,
    
    nav_: function(){
        let tempClass;
    
        tempClass = wzStorageGD.__get(this.malepc01);
        this.skillTree = tempClass.__getField(`skillTree${_cms.curSwitch}`);
        tempClass = wzStorageGD.__get(this.skillTree);
        this.classTraining = tempClass.__getField(`skillName1`);
        
        //this._mMateria = _cms.Base._mMateria;
        //this.currentMateria = _cms.Base.currentMateria;
        
        //this._tagsSkills = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,`Tags`);
        
        return [
            `Properties`
        ];
    }
    
};
