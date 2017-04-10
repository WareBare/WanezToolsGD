/**
 * Created by WareBare on 4/7/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `UI`,
    //formTags: false,
    
    forms: {},
    
    content_: function(){
        let out_,tempOpt = {};
        //this.formTags = _cms.Base._tagsSkills;
    
        if(this._mSkill.getField(`UI`,`skillName`)) tempOpt[`${this._mSkill.getField(`UI`,`skillName`).replace(`${this._mUI.getLogicPath()}/`,``)}`] = `${this._mSkill.getField(`UI`,`skillName`)}`;
        
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            //title: `Skill UI`,
            isWnd: this.wndId,
            isModule: this._mSkill,
            _tags: this._tagsSkills,
            onChange: {
                //custom: `submitForm(this)`
            },
            items: {
                'UI File': {
                    'UI::FileDescription': {
                        label: `FileDescription`,
                        type: `text`
                    },
                    'UI::isCircular': {
                        label: `isCircular`,
                        type: `checkBox`
                    },
                    'UI::skillName': {
                        label: `skillName`,
                        type: `listBoxLarge`,
                        data: Object.assign({'':``},tempOpt,this._mUI.getSkillFiles()),
                        dataUseValue: true,
                        dataPath: this._mUI.getLogicPath()
                    }
                }
            }
        });
        out_ = this.forms.main_form.create();
        //console.log(`${WZ.GrimDawn.tFn.getPaths().Mod}/${this._mSkill.getSkillPaths().logicRelPath}`);
        
        return out_;
    }
    
};
