/**
 * Created by WareBare on 4/7/2017.
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
    
    _mUI: false,
    _mSkill: false,
    _tagsSkills: false,
    
    nav_: function(){
        this._mUI = _cms.Base._mUI;
        
        if(_cms.Base._mSkill){
            this._mSkill = _cms.Base._mSkill;
            _cms.Base._mSkill = false;
        }else{
            this._mSkill = this._mUI.getSkillPerId(this._mSkill.getSkillId());
        }
        
        //this._tagsSkills = _cms.Base._tagsSkills;
        this._tagsSkills = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,`Tags`);
        //console.log(this._mSkill.aSkills.buff);
        return [
            `UI`,
            `${(this._mSkill.getField(`UI`,`skillName`)) ? `` : `.`}Files`,
            `Config`,
            `Tags`,
            `Properties`,
            `${(this._mSkill.getField(`logic`,`spawnObjects`)) ? `` : `.`}Pet Properties`
        ];
    }
    
};
