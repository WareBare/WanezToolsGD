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
            pathSkillIcon = `${this._mUI.getLogicPath().replace(WZ.GrimDawn.tFn.getPaths().MasterySkills,`${WZ.GrimDawn.tFn.getPaths().MasteryIcons}`)}`,BuffClass = false,
            newFile = new WZ.GrimDawn.Assets[`aSkill_${$type}`](`${this._mUI.getLogicPath()}/${fileName}`);
        //console.log(`${pathSkillIcon}/skillicon_${this._mSkill.getField(`UI`,`FileDescription`)}_down.tex`);
        if(this._mSkill.getField(`UI`,`FileDescription`) && this._mSkill.aSkills.buff){
            BuffClass = wzStorageGD.__get(this._mSkill.aSkills.buff[0]);
            if(BuffClass && BuffClass.__getField(`templateName`).includes(`pet`)){
                newFile = new WZ.GrimDawn.Assets[`aSkill_${$type}`](`${this._mUI.getLogicPath()}/pets/${fileName}`);
            }else{
                // todo buffs
            }
        }
        
        let ToolDefault,
            SkillIconUp = `${pathSkillIcon}/skillicon_${this._mSkill.getField(`UI`,`FileDescription`)}_up.tex`,
            SkillIconDown = `${pathSkillIcon}/skillicon_${this._mSkill.getField(`UI`,`FileDescription`)}_down.tex`,
            SkillDisplayName = ``,
            SkillBaseDescription = ``,
            MasteryName = pathSkillIcon.split('/').pop().trim().toUpperCase(),
            SkillFileName = this._mSkill.getField(`UI`,`FileDescription`).wzCapitalize().replace(`_`, ``);
        
        if(app.getName() === `Electron`){
            // todo DEV make public if this becomes a thing
            switch ($type){
                case `Modifier`:
                    ToolDefault = `waneztools/icons/skillicon_modifier_{TYPE}.tex`;
                    break;
                case `ProjectileModifier`:
                    ToolDefault = `waneztools/icons/skillicon_modifier_{TYPE}.tex`;
                    break;
                case `Transmuter`:
                    ToolDefault = `waneztools/icons/skillicon_transmuter_{TYPE}.tex`;
                    break;
                case `ProjectileTransmuter`:
                    ToolDefault = `waneztools/icons/skillicon_transmuter_{TYPE}.tex`;
                    break;
                case `Passive`:
                    ToolDefault = `waneztools/icons/skillicon_passive_{TYPE}.tex`;
                    break;
                case `Pet Modifier`:
                    ToolDefault = `waneztools/icons/skillicon_petmodifier_{TYPE}.tex`;
                    break;
                case `Converter`:
                    ToolDefault = `waneztools/icons/skillicon_converter_{TYPE}.tex`;
                    break;
                default:
                    ToolDefault = false;
                    break;
            }
            SkillDisplayName = `tagWzMastery_${MasteryName}_SkillName_${SkillFileName}`;
            SkillBaseDescription = `tagWzMastery_${MasteryName}_SkillDescription_${SkillFileName}`;
        }
        //Log(SkillBaseDescription);
        
        if(ToolDefault){
            SkillIconUp = ToolDefault.wzReplace({
                TYPE: `up`
            });
            SkillIconDown = ToolDefault.wzReplace({
                TYPE: `down`
            });
        }
        if($type !== `PetModifier`){
            newFile.editDBR({
                skillDownBitmapName: SkillIconDown,
                skillUpBitmapName: SkillIconUp,
                skillDisplayName: SkillDisplayName,
                skillBaseDescription: SkillBaseDescription
            },true);
            
            if(BuffClass){
                BuffClass.__setField(`petSkillName`,`${this._mUI.getLogicPath()}/pets/${fileName}`);
                BuffClass.saveDBR();
            }
        }
        
        newFile.saveDBR();
        if(BuffClass){
            let WndId = this.wndId;
            setTimeout(() => {
                wzCMS(appConfig.get('cms'));
                if(WndId){
                    wzWND(WndId).refresh();
                }
            },10);
        }else{
            wzWND(this.wndId).refresh();
        }
        
    },
    
    content_: function(){
        let out_,tempOpt = {},NewFileButtonGroup_ = ``, bHasModifiers = false, bShowButtons = false;
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
                        type: `textLarge`
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
    
        NewFileButtonGroup_ = `Creating new files will use the FileDescription for the filename. File Extension (*.dbr) is added.<br />`;
        if(this._mSkill.getField(`UI`,`FileDescription`) && !this._mSkill.aSkills.logic){
            try{
                let fileName = `${this._mSkill.getField(`UI`,`FileDescription`)}.dbr`;
                fs.accessSync(`${this._mUI.getLogicPath()}/${fileName}`, fs.F_OK);
            }catch(err){
                if(this._mSkill.getField(`UI`,`FileDescription`) && this._mSkill.aSkills.buff){
                    if(wzStorageGD.__get(this._mSkill.aSkills.buff[0]).__getField(`templateName`).includes(`pet`)){
                        bShowButtons = true;
                        bHasModifiers = true;
                    }else{
                        // todo buffs
                    }
                }else{
                    NewFileButtonGroup_ += `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('PetModifier');">Pet Modifier</span>`;
                }
               
                bShowButtons = true;
                bHasModifiers= true;
            }
        }
        /*
        if(this._mSkill.getField(`UI`,`FileDescription`) && this._mSkill.aSkills.buff){
            if(wzStorageGD.__get(this._mSkill.aSkills.buff[0]).__getField(`templateName`).includes(`pet`)){
                bShowButtons = true;
                bHasModifiers = true;
            }else{
                // todo buffs
            }
        }
        */
        if(bHasModifiers){
            NewFileButtonGroup_ += `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('Modifier');">Modifier</span>`;
            NewFileButtonGroup_ += `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('ProjectileModifier');">Proj. Modifier</span>`;
            NewFileButtonGroup_ += `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('Transmuter');">Transmuter</span>`;
            NewFileButtonGroup_ += `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('ProjectileTransmuter');">Proj. Transmuter</span>`;
            NewFileButtonGroup_ += `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().createNewSkillFile('Passive');">Passive</span>`;
        }
        
        out_ = `${(bShowButtons) ? NewFileButtonGroup_ : ``}${this.forms.main_form.create()}`;
        //console.log(`${WZ.GrimDawn.tFn.getPaths().Mod}/${this._mSkill.getSkillPaths().logicRelPath}`);
        
        return out_;
    }
    
};
