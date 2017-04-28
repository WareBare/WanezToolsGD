/**
 * Created by WareBare on 4/27/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    contentType: `UI`,
    title: `Edit Skill`,
    wndId: `skillEdit`,
    
    skillConfig: new eConfig({name: `gd-skills`}),
    
    _mMateria: false,
    
    nav_: function(){
        this._mMateria = _cms.Base._mMateria;
        
        //this._tagsSkills = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,`Tags`);
        
        return [
            `Qualifiers`
        ];
    }
    
};
