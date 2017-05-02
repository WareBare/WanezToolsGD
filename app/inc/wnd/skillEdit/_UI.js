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
    
    createNewSkillFile($type){
        let fileName = `${this._mSkill.getField(`UI`,`FileDescription`)}.dbr`,
            pathSkillIcon = `${this._mUI.getLogicPath().replace(WZ.GrimDawn.tFn.getPaths().MasterySkills,`${WZ.GrimDawn.tFn.getPaths().MasteryIcons}`)}`,
            newFile = new WZ.GrimDawn.Assets[`aSkill_${$type}`](`${this._mUI.getLogicPath()}/${fileName}`);
        console.log(`${pathSkillIcon}/skillicon_${this._mSkill.getField(`UI`,`FileDescription`)}_down.tex`);
        
        newFile.editDBR({
            skillDownBitmapName: `${pathSkillIcon}/skillicon_${this._mSkill.getField(`UI`,`FileDescription`)}_down.tex`,
            skillUpBitmapName: `${pathSkillIcon}/skillicon_${this._mSkill.getField(`UI`,`FileDescription`)}_up.tex`
        },true);
        
        newFile.saveDBR();
        wzWND(this.wndId).refresh();
    },
    
    content_: function(){
        let out_,tempOpt = {},button = ``;
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
        this._mSkill.setSkillTier();
        if(this._mSkill.getField(`UI`,`FileDescription`) && !this._mSkill.aSkills.logic){
            try{
                let fileName = `${this._mSkill.getField(`UI`,`FileDescription`)}.dbr`;
                fs.accessSync(`${this._mUI.getLogicPath()}/${fileName}`, fs.F_OK);
            }catch(err){
                button = `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('Modifier');">New Modifier File</span>`;
                button += `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('Transmuter');">New Transmuter File</span>`;
                button += `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('Passive');">New Passive File</span>`;
            }
            
        }
        
        
        out_ = `Creating new files will use the FileDescription the the name, if no button show up you need to enter a FileDescription or the file exists! File Extension (*.dbr) is added.<br />${button}${this.forms.main_form.create()}`;
        //console.log(`${WZ.GrimDawn.tFn.getPaths().Mod}/${this._mSkill.getSkillPaths().logicRelPath}`);
        
        return out_;
    }
    
};
