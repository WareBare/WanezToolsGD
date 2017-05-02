/**
 * Created by WareBare on 4/27/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    contentType: `Qualifiers`,
    title: `Edit Materia`,
    wndId: `materiaEdit`,
    Settings: {
        height: `1000px`,
        width: `750px`,
    },
    
    skillConfig: new eConfig({name: `gd-skills`}),
    
    _mMateria: false,
    
    nav_: function(){
        this._mMateria = _cms.Base._mMateria;
        this.currentMateria = _cms.Base.currentMateria;
        
        //this._tagsSkills = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,`Tags`);
        
        return [
            `Qualifiers`,
            `Properties`
        ];
    }
    
};
