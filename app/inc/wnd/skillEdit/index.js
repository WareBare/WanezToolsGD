/**
 * Created by WareBare on 4/7/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    contentType: `UI`, //
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
        if(!this._mSkill.getField(`UI`,`skillName`) && this.contentType !== `UI`){
            this.contentType = `UI`;
            setTimeout(() => {
                wzWND(`skillEdit`).refresh();
            },10);
        }
        //this.dataNewField = Object.assign( {'':``},wzTemplates.__getGroupFields(this._mSkill.getField(`logic`,`templateName`),[`Offensive Parameters`,`Defensive Parameters`,`Retaliation Parameters`,`Character Parameters`,`Skill Parameters`,`Modifiers`,`Projectile Config`,`Spawn Config`,`Spark Config`]) );
        //console.log(this._mSkill.aSkills.buff);
        return [
            `UI`,
            `${(this._mSkill.getField(`UI`,`skillName`)) ? `` : `.`}Files`,
            `${(this._mSkill.getField(`UI`,`skillName`)) ? `` : `.`}Config`,
            `${(this._mSkill.getField(`UI`,`skillName`)) ? `` : `.`}Tags`,
            `${(this._mSkill.getField(`UI`,`skillName`)) ? `` : `.`}Properties`,
            `${(this._mSkill.getField(`logic`,`spawnObjects`)) ? `` : `.`}Pet Properties`
        ];
    }
    
};
