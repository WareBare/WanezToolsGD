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
    titlePage: `Files`,
    
    forms: {},
    //submitForm: function($el){
        //console.log(`custom submit: ${$el.value}`);
    //},
    
    OnChangeSkillLinkCheckBox: function(el){
        let ConfigKey = `linkedSkills.${this._mSkill.getSkillPaths().filePathModifierConfig}`,
            _Tags = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,`Tags`),
            TagText_, TagSkills_ = ``, TempSkillName_;
        
        if(el.checked){
            this.skillConfig.set(`${ConfigKey}.${el.value}`, true);
        }else{
            this.skillConfig.delete(`${ConfigKey}.${el.value}`);
        }
    
        // todo DEV enable when it becomes a thing
        if(app.getName() === `Electron`){
            //Log(_Tags.__getField(this._mSkill.getField(`logic`,`skillBaseDescription`)));
            TagText_ = _Tags.__getField(this._mSkill.getField(`logic`,`skillBaseDescription`)).split(`{^n^`)[0];
            
            for(let kSkillName in this.skillConfig.get(ConfigKey)){
                if(TagSkills_ !== ``) TagSkills_ += `{^n}`;
                for(let kSkillId in this._mUI.aSkills){
                    if(this._mUI.aSkills[kSkillId].getSkillPaths().filePathModifierConfig === kSkillName){
                        TempSkillName_ = this._mUI.aSkills[kSkillId].getSkillName();
                    }
                }
                TagSkills_ += `- ${TempSkillName_}`;
            }
            if(TagText_ === ``) {
                TagText_ = `-{^n}{^o}[Affects the following skills and requires one to unlock]`;
            }
            TagText_ = `${TagText_}{^n^t}${TagSkills_}`;
            //Log(TagText_);
            _Tags.__setField(this._mSkill.getField(`logic`,`skillBaseDescription`), TagText_);
            _Tags.saveData();
        }
    },
    
    FillRemainingObjects: function(){
        
        let TempObjectStr, TempPetDBR, TempFileName, TempMap;
        for(let i=1; i <= 4; i++){
            TempObjectStr = `spawnObjects${(i>1) ? i : ``}`;
            if(this._mSkill.getField(`logic`, TempObjectStr) && (TempPetDBR = (Array.isArray(this._mSkill.getField(`logic`, TempObjectStr))) ? this._mSkill.getField(`logic`, TempObjectStr)[0] : this._mSkill.getField(`logic`, TempObjectStr) ) ){
                //Log(TempObjectStr);
                TempMap = {};
                TempMap[TempObjectStr] = [TempPetDBR];
                for(let j=2; j <= parseInt(this._mSkill.getField(`logic`, `skillUltimateLevel`)); j++){
                    TempFileName = TempPetDBR.split(`/`).pop();
                    //Log(TempPetDBR.split(`/`).pop().replace(`01`,`${(`0${j}`).slice(-2)}`));
                    //Log(TempPetDBR.replace(TempFileName, `${TempFileName.replace(`01`,`${(`0${j}`).slice(-2)}`)}`));
    
                    TempMap[TempObjectStr].push( TempPetDBR.replace(TempFileName, `${TempFileName.replace(`01`,`${(`0${j}`).slice(-2)}`)}`) );
                }
            }
            this._mSkill.setField(`logic`, TempMap);
        }
        
        wzWND(this.wndId).refresh();
    },
    
    content_: function(){
        let out_ = ``,tempFormId,tempOpt,tempItems,fieldName;
        
        if(this._mSkill.aSkills.buff){
            for(let $_Index in this._mSkill.aSkills.buff){
                tempItems = {};
                tempOpt = {};
    
                if(this._mSkill.getField(`buff.${$_Index}`,`Class`).includes(`Pet`) || this._mSkill.getField(`buff.${$_Index}`,`Class`).includes(`pet`)){
                    fieldName = `petSkillName`;
                }else{
                    fieldName = `buffSkillName`;
                }
                
                if(this._mSkill.getField(`buff.${$_Index}`,fieldName)) tempOpt[`${this._mSkill.getField(`buff.${$_Index}`,fieldName).replace(`${this._mUI.getLogicPath()}/`,``)}`] = `${this._mSkill.getField(`buff.${$_Index}`,fieldName)}`;
                
                tempItems[`Buff/Pet`] = {};
                tempItems[`Buff/Pet`][`buff.${$_Index}::${fieldName}`] = {
                    label: fieldName,
                    type: `listBoxLarge`,
                    data: Object.assign({'':``},tempOpt,this._mUI.getSkillFiles(true)),
                    dataUseValue: true,
                    dataPath: this._mUI.getLogicPath()
                };
                
                tempFormId = `buff_form_${$_Index}`;
                this.forms[tempFormId] = new WZ.Core.cForm({
                    id: tempFormId,
                    isWnd: this.wndId,
                    isModule: this._mSkill,
                    _tags: this._tagsSkills,
                    onChange: {
                        //custom: `submitForm(this)`
                    },
                    items: tempItems
                });
                out_ += this.forms[tempFormId].create();
            }
        }
        //if(this._mSkill.aSkills.logic && (this._mSkill.getField(`logic`,`Class`).includes(`Pet`) || this._mSkill.getField(`logic`,`Class`).includes(`pet`) || this._mSkill.getField(`logic`,`spawnObjects`)) ){
        if(wzTemplates.hasField(this._mSkill.getField(`logic`,`templateName`), `spawnObjects`) || wzTemplates.hasField(this._mSkill.getField(`logic`,`templateName`), `spawnObjects2`) || wzTemplates.hasField(this._mSkill.getField(`logic`,`templateName`), `spawnObjects3`) || wzTemplates.hasField(this._mSkill.getField(`logic`,`templateName`), `spawnObjects4`)){
            
            let spawnObjects = {},
                spawnObjects2 = {},
                spawnObjects3 = {},
                spawnObjects4 = {};
            
            this.forms.main_form = new WZ.Core.cForm({
                id: 'main_form',
                isWnd: this.wndId,
                isModule: this._mSkill,
                _tags: this._tagsSkills,
                onChange: {
                    //custom: `submitForm(this)`
                },
                items: {
                    'Pet - spawnObjects': {
                        'logic::spawnObjects': {
                            label: `spawnObjects`,
                            type: `listAreaWide`,
                            data: Object.assign({'':``},this._mUI.getSkillFiles(true)),
                            dataUseValue: true,
                            dataPath: this._mUI.getLogicPath()
                        },
                        'logic::spawnObjects2': {
                            label: `spawnObjects2`,
                            type: `listAreaWide`,
                            data: Object.assign({'':``},this._mUI.getSkillFiles(true)),
                            dataUseValue: true,
                            dataPath: this._mUI.getLogicPath()
                        },
                        'logic::spawnObjects3': {
                            label: `spawnObjects3`,
                            type: `listAreaWide`,
                            data: Object.assign({'':``},this._mUI.getSkillFiles(true)),
                            dataUseValue: true,
                            dataPath: this._mUI.getLogicPath()
                        },
                        'logic::spawnObjects4': {
                            label: `spawnObjects4`,
                            type: `listAreaWide`,
                            data: Object.assign({'':``},this._mUI.getSkillFiles(true)),
                            dataUseValue: true,
                            dataPath: this._mUI.getLogicPath()
                        }
                    }
                }
            });
            out_ += `<span class="formBTN" title="dbr file name must contain exactly one 01; Continues the counter /pets/mypet_01.dbr adds /mypet_02.dbr to the array up to the Ultimate Skill Rank - for all spawnObjects" onclick="wzWND('${this.wndId}').__getContent().FillRemainingObjects();">Fill Remaining Objects</span>${this.forms.main_form.create()}`;
        }
        
        if(this._mSkill.aSkills.logic && ( (this._mSkill.getField(`logic`,`templateName`) === `database/templates/skill_modifier.tpl` ) || (this._mSkill.getField(`logic`,`templateName`) === `database/templates/skill_projectilemodifier.tpl` ) ||
            ( this._mSkill.aSkills.buff && (wzStorageGD.__get(this._mSkill.aSkills.buff[0]).__getField(`templateName`).includes(`pet`))) ) ){
            let ConfigKey = `linkedSkills.${this._mSkill.getSkillPaths().filePathModifierConfig}`,
                LinkedSkills = this.skillConfig.get(ConfigKey),
                LinkToSkill_ = ``, TempSkillClass,
                LinkToSkillItems_ = ``, mIgnoreTemplatesForLinking = {
                    'database/templates/skill_modifier.tpl': true,
                    'database/templates/skill_projectilemodifier.tpl': true,
                    'database/templates/skill_transmuter.tpl': true,
                    'database/templates/skill_projectiletransmuter.tpl': true,
                    'database/templates/skill_passive.tpl': true
                },
                tplFrame = `<fieldset><legend>Link to Skill</legend>{ITEMS}</fieldset>`,
                tplItem = `<label><input type="checkbox" value="{VALUE}" onchange="wzWND('${this.wndId}').__getContent().OnChangeSkillLinkCheckBox(this);" {STATE} /><span>{TEXT}</span></label>`;
    
            //console.log(this._mUI.aSkills);
            // todo finish checkbox default output
            for(let iId in this._mUI.aSkills){
                TempSkillClass = this._mUI.aSkills[iId];
                if(!mIgnoreTemplatesForLinking[TempSkillClass.getField(`logic`,`templateName`)]){
                    //console.log(TempSkillClass);
                    LinkToSkillItems_ += tplItem.wzReplace({
                        STATE: ( LinkedSkills && LinkedSkills[ TempSkillClass.getSkillPaths().filePathModifierConfig ] ) ? ` checked` : ``,
                        VALUE: TempSkillClass.getSkillPaths().filePathModifierConfig,
                        TEXT: `${TempSkillClass.getSkillName()}`
                    });
                }
            }
            
            LinkToSkill_ = tplFrame.wzReplace({
                ITEMS: LinkToSkillItems_
            });
            
            out_ += `<div class="wndMasterySkillEdit">${LinkToSkill_}</div>`;
        }
        
        //out_ = ``;
        
        return out_;
    }
    
};
