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
    
    _mUI: false,
    _mSkill: false,
    _tagsSkills: false,
    
    nav_: function(){
        this._mUI = _cms.Base._mUI;
        this._mSkill = _cms.Base._mSkill;
        this._tagsSkills = _cms.Base._tagsSkills;
        //console.log(this._mSkill.aSkills.buff);
        return [
            `UI`,
            `${(this._mSkill.getField(`UI`,`skillName`)) ? `` : `.`}Files`,
            `Config`,
            `Tags`,
            `.Properties`,
            `${(this._mSkill.getField(`logic`,`spawnObjects`)) ? `` : `.`}Pet Properties`
        ];
    }
    
};
